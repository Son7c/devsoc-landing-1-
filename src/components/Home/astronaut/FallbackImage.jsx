import Image from "next/image";

export function FallbackImage() {
	return (
		<div className="flex h-full w-full items-end justify-center">
			<div className="relative h-full w-full max-w-[500px]">
				<Image
					src="/DevsocHero.png"
					alt="DevSoc Astronaut"
					fill
					className="object-contain object-bottom"
					priority
				/>
			</div>
		</div>
	);
}
