import { newsletterItems } from "@/constant/newsletter";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
	return (
		<div className="flex w-full flex-col items-start justify-center gap-8 bg-black p-4 py-8 text-white sm:px-8 z-10">
			<h1 className="font-iceland mx-auto w-full max-w-6xl text-6xl">
				Newsletter
			</h1>
			<div className="mx-auto flex max-w-6xl flex-col gap-8">
				{newsletterItems.map((item, index) => {
					return (
						<div
							key={index}
							className="grid grid-cols-1 rounded-lg bg-neutral-800/70 transition-all duration-300 hover:cursor-pointer hover:bg-neutral-800 sm:grid-cols-3 sm:gap-4"
						>
							<Image
								src={item.image}
								alt={item.title}
								width={500}
								height={800}
								className="h-45 w-full rounded-t-lg object-cover sm:w-100 sm:rounded-t-none sm:rounded-l-lg"
							/>
							<div className="col-span-2 flex flex-col justify-center gap-2 p-4">
								<h2 className="text-lg font-bold sm:text-2xl">{item.title}</h2>
								<div className="flex justify-between text-sm text-neutral-300 sm:text-lg">
									<p>By {item.author}</p>
									<p>{item.date}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<button className="mx-auto flex items-center justify-center gap-1 rounded-lg bg-white px-4 py-2 text-xl text-black transition-all duration-300 hover:cursor-pointer hover:gap-4 hover:bg-neutral-200">
				View More
				<ArrowRight className="" />{" "}
			</button>
		</div>
	);
}
