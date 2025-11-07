"use client";

import { useState } from "react";
import Link from "next/link";
import { Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
	const socialLinks = [
		{
			name: "Twitter",
			url: "https://www.twitter.com",
			icon: <Twitter size={20} />,
		},
		{
			name: "Instagram",
			url: "https://www.instagram.com",
			icon: <Instagram size={20} />,
		},
		{
			name: "LinkedIn",
			url: "https://www.linkedin.com",
			icon: <Linkedin size={20} />,
		},
	];

	const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
	const [showBlobs, setShowBlobs] = useState(false);

	const handleMouseMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const relativeY = e.clientY - rect.top;
		setMousePos({ x: e.clientX - rect.left, y: relativeY });
		const threshold = rect.height * 0.35;
		setShowBlobs(relativeY > threshold);
	};

	return (
		<div
			className="relative w-full overflow-hidden border-t bg-black p-4 pt-8 text-white sm:pt-10"
			onMouseMove={handleMouseMove}
			onMouseLeave={() => setShowBlobs(false)}
		>
			{showBlobs && (
				<>
					<div
						className="bg-accent pointer-events-none absolute h-32 w-32 rounded-full opacity-30 blur-3xl transition-transform duration-300 sm:h-40 sm:w-40"
						style={{
							top: mousePos.y - (window.innerWidth < 640 ? 64 : 80),
							left: mousePos.x - (window.innerWidth < 640 ? 64 : 80),
							zIndex: 20,
						}}
					></div>
					<div
						className="bg-accent pointer-events-none absolute h-24 w-24 rounded-full opacity-20 blur-2xl transition-transform duration-300 sm:h-32 sm:w-32"
						style={{
							top: mousePos.y - (window.innerWidth < 640 ? 48 : 60),
							left: mousePos.x - (window.innerWidth < 640 ? 48 : 60),
							zIndex: 20,
						}}
					></div>
					<div
						className="bg-accent pointer-events-none absolute h-20 w-20 rounded-full opacity-30 blur-2xl transition-transform duration-300 sm:h-24 sm:w-24"
						style={{
							top: mousePos.y - (window.innerWidth < 640 ? 40 : 40),
							left: mousePos.x - (window.innerWidth < 640 ? 40 : 40),
							zIndex: 20,
						}}
					></div>
				</>
			)}

			<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between sm:flex-row">
				<div className="text-md mb-4 text-center sm:text-base">
					Made with ❤️ by Devsoc Team
				</div>
				<div className="mb-4 flex items-center justify-center gap-2 sm:justify-start sm:gap-3">
					<h1>Follow us on</h1>
					{socialLinks.map((link) => (
						<a
							key={link.name}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:border-accent hover:text-accent rounded-full border border-transparent bg-neutral-800/80 p-3 text-xl transition-all duration-300 hover:-translate-y-1"
						>
							{link.icon}
						</a>
					))}
				</div>
			</div>

			<div className="sm:space-x-auto mt-10 bg-linear-to-b from-white/50 via-[#1c1c1c] to-[#000000b9] bg-clip-text text-center text-[5rem] leading-none font-bold text-transparent font-stretch-50% select-none md:px-4 sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[18rem]">
				DEVSOC
			</div>
			<h2 className="text-center text-sm text-gray-400 sm:text-[15px]">
				© {new Date().getFullYear()} DevSoc. All rights reserved.
			</h2>
		</div>
	);
};

export default Footer;
