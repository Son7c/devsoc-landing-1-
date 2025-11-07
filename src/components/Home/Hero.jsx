"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function Hero() {
	const variants = {
		hidden: {
			opacity: 0,
			y: 100,
			filter: "blur(10px)",
		},
		visible: {
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
		},
	};
	return (
		<div className="from-accent/50 flex w-full flex-col items-center gap-12 bg-linear-to-t to-transparent px-4 pt-4 relative">
			<div className="flex h-70 w-full flex-col items-center justify-end text-center">
				<motion.h1
					variants={variants}
					initial="hidden"
					whileInView="visible"
					className="text-4xl font-bold sm:text-6xl"
				>
					Welcome to Dev<span className="text-accent">Soc</span>
				</motion.h1>
				<motion.h2
					variants={variants}
					initial="hidden"
					whileInView="visible"
					className="text-lg sm:text-2xl"
				>
					Join our inclusive community
				</motion.h2>
			</div>
			<motion.div variants={variants} initial="hidden" whileInView="visible">
				<Image
					src="/DevsocHero.png"
					alt="DevSoc Hero Image"
					width={505}
					height={419}
					className="w-md"
				/>
			</motion.div>
			<div className="absolute bottom-0 w-full h-10 bg-black z-2"></div>
		</div>
	);
}
