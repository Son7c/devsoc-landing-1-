import { Geist, Geist_Mono, Bricolage_Grotesque, Iceland } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
	variable: "--font-bg",
	subsets: ["latin"],
});

const iceland = Iceland({
	variable: "--font-iceland",
	subsets: ["latin"],
	weight: ["400"],
});

export const metadata = {
	title: "DevSoc",
	description: "Development Society of Asansol Engineering College",
	icons: {
		icon: "/DevSocLogo.png",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.className} ${iceland.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
