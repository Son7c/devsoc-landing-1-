"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { eventsData } from "@/constant/events";

function useMediaQuery(query) {
	const [matches, setMatches] = useState(false);
	useEffect(() => {
		const media = window.matchMedia(query);
		setMatches(media.matches);
		const listener = () => setMatches(media.matches);
		window.addEventListener("resize", listener);
		return () => window.removeEventListener("resize", listener);
	}, [query]);
	return matches;
}

export default function Events() {
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const ref = useRef(null);
	const isMobile = useMediaQuery("(max-width: 768px)");

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const globalScale = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		[0.98, 1, 0.98],
	);

	return (
		<section
			ref={ref}
			className="mx-auto flex w-full flex-col items-start py-16 md:py-24"
		>
			<div className="w-full px-4">
				<motion.h2
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="font-iceland mx-auto mb-12 w-full max-w-6xl text-3xl font-bold md:text-6xl"
				>
					Events
				</motion.h2>

				{/* Responsive layout switch */}
				{isMobile ? (
					<MobileDraggableStack eventsData={eventsData} />
				) : (
					<FannedLayout
						eventsData={eventsData}
						globalScale={globalScale}
						hoveredIndex={hoveredIndex}
						setHoveredIndex={setHoveredIndex}
					/>
				)}

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					viewport={{ once: true }}
					className="flex justify-center"
				>
					<Link href="/events">
						<button className="mx-auto flex items-center justify-center gap-1 rounded-lg bg-neutral-950 px-4 py-2 text-xl text-white transition-all duration-300 hover:cursor-pointer hover:gap-4 hover:bg-neutral-800">
							View More
							<ArrowRight className="" />{" "}
						</button>
					</Link>
				</motion.div>
			</div>
		</section>
	);
}

function FannedLayout({
	eventsData,
	globalScale,
	hoveredIndex,
	setHoveredIndex,
}) {
	return (
		<div className="relative mb-12 flex h-80 items-center justify-center md:h-96">
			<div className="relative flex h-full w-full max-w-[850px] items-center justify-center">
				{eventsData.map((event, index) => {
					const centerIndex = (eventsData.length - 1) / 2;
					const baseTranslateX = (index - centerIndex) * 160;

					const isHovered = hoveredIndex === index;
					const isLeft = hoveredIndex !== null && index < hoveredIndex;
					const isRight = hoveredIndex !== null && index > hoveredIndex;

					let xOffset = baseTranslateX;
					if (isLeft) xOffset -= 60;
					if (isRight) xOffset += 60;

					const zIndex = isHovered ? 50 : 10 - index;
					const hoverScale = isHovered ? 1.1 : 1;
					// const hoverBlur = isHovered ? 0 : 10;

					return (
						<motion.div
							key={event.id}
							className="absolute top-1/2 left-1/2 w-40 origin-center sm:w-48 lg:w-60"
							style={{
								translate: "-50% -50%",
								zIndex,
								scale: globalScale,
								filer: "blur(0px)",
							}}
							whileInView={{
								x: xOffset,
								rotate: isHovered ? 0 : -6 + index * 3,
								transition: {
									x: { type: "spring", stiffness: 160, damping: 18 },
									rotate: {
										type: "spring",
										stiffness: 80,
										damping: 14,
										duration: 0.5,
									},
								},
								filter: "blur(0px)",
							}}
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							<Link href={`/events/${event.id}`} scroll>
								<motion.div
									whileHover={{ y: -10, scale: hoverScale }}
									transition={{ type: "tween", duration: 0.25 }}
									className={`group relative cursor-pointer bg-neutral-600 transition-all duration-300 ease-out rounded-lg`}
									style={{
										filter: isHovered
											? "drop-shadow(12px 12px 12px rgba(0,0,0,0.5))"
											: "drop-shadow(8px 8px 8px rgba(0,0,0,0.5))",
									}}
								>
									<img
										src={event.image || "/placeholder.svg"}
										alt={event.title}
										className="aspect-3/4 w-full rounded-lg object-cover transition-transform duration-300 ease-out"
									/>
									<div className="absolute inset-0 flex items-end rounded-lg bg-linear-to-b from-transparent to-black p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										<div>
											<h3 className="text-lg font-bold text-white">
												{event.title}
											</h3>
											<p className="text-sm text-gray-200">{event.date}</p>
										</div>
									</div>
								</motion.div>
							</Link>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}

function MobileDraggableStack({ eventsData }) {
	return (
		<div className="relative mb-12 flex flex-col items-center">
			{eventsData.map((event, index) => {
				const overlap = -100;
				const rotate = -3 + index * 2;

				return (
					<motion.div
						key={event.id}
						drag
						dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
						dragElastic={0.35}
						className={`relative w-64 sm:w-72 ${
							index === 0 ? "" : `-mt-[100px]`
						}`}
						style={{
							rotate,
							zIndex: eventsData.length - index,
							filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.4))",
						}}
						whileHover={{
							scale: 1.05,
							y: -10,
							rotate: 0,
							transition: { type: "spring", stiffness: 140, damping: 12 },
						}}
						whileTap={{
							scale: 0.97,
						}}
					>
						<Link href={`/events/${event.id}`} scroll>
							<motion.div className="group relative overflow-hidden rounded-xl bg-white shadow-xl">
								<img
									src={event.image || "/placeholder.svg"}
									alt={event.title}
									className="aspect-3/4 w-full rounded-xl object-cover"
								/>

								<div className="absolute inset-0 flex items-end bg-linear-to-b from-transparent to-black/70 p-4">
									<div>
										<h3 className="text-lg font-bold text-white">
											{event.title}
										</h3>
										<p className="text-sm text-gray-200">{event.date}</p>
									</div>
								</div>
							</motion.div>
						</Link>
					</motion.div>
				);
			})}
		</div>
	);
}
