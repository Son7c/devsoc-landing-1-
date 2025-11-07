"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "About",
			url: "/about",
		},
		{
			name: "Newletter",
			url: "/newsletter",
		},
		{
			name: "Events",
			url: "/events",
		},
	];

	return (
		<div
			className={`bg-accent/30 ease fixed inset-0 z-50 mx-auto flex h-fit w-full items-center justify-between px-4 py-2 backdrop-blur-lg transition-all duration-300 ${scrolled ? "rounded-b-3xl" : "mt-4 max-w-6xl rounded-full"} `}
		>
			<div className="flex items-center gap-2">
				<Image
					src="/DevSocLogo.png"
					alt="logo"
					width={50}
					height={50}
					className=""
				/>
				<h1 className="text-2xl font-bold">
					DEV<span className="text-orange-300">SOC</span>
				</h1>
			</div>
			<div className="z-60 flex justify-between gap-8 rounded-full">
				{navItems.map((item, index) => {
					return (
						<Link
							key={index}
							href={item.url}
							className="mx-2 hover:cursor-pointer"
						>
							{item.name}
						</Link>
					);
				})}
			</div>
		</div>
	);
}
