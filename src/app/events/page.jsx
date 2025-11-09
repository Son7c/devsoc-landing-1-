"use client";

import EventCard from "@/components/Events/EventCard";
import { eventsData } from "@/constant/events";
import { motion, stagger } from "motion/react";

const headerVariants = {
	hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

export default function Page() {
	return (
		<div className="min-h-screen w-full bg-black text-neutral-300">
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-8 sm:px-6 md:py-24 lg:px-8">
				<div className="mb-12 w-full text-center">
					<motion.h1
						className="font-iceland mb-4 text-6xl font-bold"
						variants={headerVariants}
						initial="hidden"
						animate="visible"
					>
						Events
					</motion.h1>
					<motion.p
						className="text-xl text-neutral-200"
						variants={headerVariants}
						initial="hidden"
						animate="visible"
					>
						Where Technology Meets Creativity and Collaboration
					</motion.p>
				</div>

				<div className="grid w-full grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:px-0 lg:grid-cols-3 xl:grid-cols-4">
					{eventsData.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
			</div>
		</div>
	);
}
