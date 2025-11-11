"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fadeInBlurFast } from "@/lib/motionVariants";

export default function BackButton({ href, label }) {
	return (
		<motion.div
			className="absolute -top-10 left-0 sm:-top-14"
			variants={fadeInBlurFast}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
		>
			<Link
				href={href}
				className="flex items-center gap-2 rounded-3xl bg-neutral-800 px-4 py-2 text-neutral-200 transition-colors hover:bg-neutral-700 hover:text-white"
			>
				<ArrowLeft size={18} />
				{label}
			</Link>
		</motion.div>
	);
}
