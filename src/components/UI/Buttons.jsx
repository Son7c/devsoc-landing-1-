import { ArrowRight } from "lucide-react";

export const ViewMoreBtn = () => {
	return (
		<button className="mx-auto flex items-center justify-center gap-1 rounded-lg px-4 py-2 text-xl text-black transition-all duration-300 hover:cursor-pointer hover:gap-4 hover:bg-neutral-200">
			View More
			<ArrowRight className="" />{" "}
		</button>
	);
};
