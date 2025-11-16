import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "convex/_generated/api";

// Initialize Convex client
const getConvexClient = () => {
	const url = process.env.NEXT_PUBLIC_CONVEX_URL;
	if (!url) {
		throw new Error("NEXT_PUBLIC_CONVEX_URL is not configured");
	}
	return new ConvexHttpClient(url);
};

const uploadAttempts = new Map<string, { count: number; resetTime: number }>();

const MAX_UPLOADS_PER_HOUR = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

function checkRateLimit(identifier: string): boolean {
	const now = Date.now();
	const userAttempts = uploadAttempts.get(identifier);

	if (!userAttempts || now > userAttempts.resetTime) {
		uploadAttempts.set(identifier, {
			count: 1,
			resetTime: now + RATE_LIMIT_WINDOW,
		});
		return true;
	}

	if (userAttempts.count >= MAX_UPLOADS_PER_HOUR) {
		return false;
	}

	userAttempts.count++;
	return true;
}

export async function POST(request: NextRequest) {
	try {
		const clientIp =
			request.headers.get("x-forwarded-for") ||
			request.headers.get("x-real-ip") ||
			"unknown";

		if (!checkRateLimit(clientIp)) {
			return NextResponse.json(
				{ error: "Too many registration attempts. Please try again later." },
				{ status: 429 },
			);
		}

		const formData = await request.formData();

		const name = formData.get("name") as string;
		const roll = formData.get("roll") as string;
		const phone = formData.get("phone") as string;
		const email = formData.get("email") as string;
		const department = formData.get("department") as string;
		const year = formData.get("year") as string;
		const questions = formData.get("questions") as string;
		const eventSlug = formData.get("eventSlug") as string;
		const eventTitle = formData.get("eventTitle") as string;
		const transactionId = formData.get("transactionId") as string;
		const amount = Number(formData.get("amount"));
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		if (!eventSlug) {
			return NextResponse.json(
				{ error: "Event slug is required" },
				{ status: 400 },
			);
		}

		if (!/^[a-z0-9-]+$/.test(eventSlug)) {
			return NextResponse.json(
				{ error: "Invalid event slug format" },
				{ status: 400 },
			);
		}

		const MAX_FILE_SIZE = 5 * 1024 * 1024;
		if (file.size > MAX_FILE_SIZE) {
			return NextResponse.json(
				{ error: "File size must be less than 5MB" },
				{ status: 400 },
			);
		}

		const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
		if (!allowedTypes.includes(file.type)) {
			return NextResponse.json(
				{ error: "Only JPEG, PNG, and WebP images are allowed" },
				{ status: 400 },
			);
		}

		const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");

		// Convert file to base64
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const base64Image = buffer.toString("base64");

		// console.log("Calling Convex action to register user...");

		// Call Convex action which handles the entire transactional flow
		const convex = getConvexClient();
		const result = await convex.action(api.actions.registerUserWithImage, {
			name,
			roll,
			phone,
			email,
			department,
			year,
			questions,
			eventSlug,
			eventTitle,
			transactionId,
			amount,
			imageBuffer: base64Image,
			fileName: sanitizedFileName,
		});

		// console.log("Registration completed successfully!");

		return NextResponse.json(result);
	} catch (error: any) {
		// console.error("Registration error:", error);

		return NextResponse.json(
			{
				error:
					error.message || "Failed to submit registration. Please try again.",
			},
			{ status: 500 },
		);
	}
}
