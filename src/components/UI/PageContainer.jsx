"use client";

export default function PageContainer({ children, className = "" }) {
	return (
		<div className={`w-full bg-black text-white ${className}`}>
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-8 md:py-24">
				{children}
			</div>
		</div>
	);
}
