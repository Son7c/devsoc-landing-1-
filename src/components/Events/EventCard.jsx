"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { DirectionAwareHover } from "@/components/UI/directionAwareHover";

// Animation variants for the card
const cardVariants = {
	hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.4,
			ease: "easeOut",
		},
	},
};

export default function EventCard({ event }) {
	return (
		<motion.div
			variants={cardVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			className="relative flex h-[400px] items-center justify-center"
		>
			<Link href={`/events/${event.id}`} className="h-full w-full">
				<DirectionAwareHover imageUrl={event.image} className="h-full w-full">
					<p className="text-xl font-bold">{event.title}</p>
					<p className="text-sm font-normal">{event.date}</p>
				</DirectionAwareHover>
			</Link>
		</motion.div>
	);
}
