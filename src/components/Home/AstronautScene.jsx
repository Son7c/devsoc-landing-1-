import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import { FallbackImage } from "./astronaut/FallbackImage";
import { AstronautCanvas } from "./astronaut/AstronautCanvas";
import { useAstronautLoader } from "./astronaut/useAstronautLoader";

export default function AstronautScene({ onModelLoaded }) {
	const mouse = useRef({ x: 0, y: 0 });
	const { ref: containerRef, inView: isAstronautVisible } = useInView({
		threshold: 0.1,
		triggerOnce: false,
		initialInView: true,
	});

	const {
		hasWebGLError,
		modelLoadTimeout,
		webglSupported,
		showFallback,
		skipCanvas,
		handleCanvasError,
		handleModelLoaded,
	} = useAstronautLoader(onModelLoaded);

	useEffect(() => {
		mouse.current = {
			x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
			y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
		};

		const handleMouseMove = (event) => {
			mouse.current = { x: event.clientX, y: event.clientY };
		};

		if (typeof window !== "undefined") {
			window.addEventListener("mousemove", handleMouseMove);
			return () => window.removeEventListener("mousemove", handleMouseMove);
		}
	}, []);

	if (showFallback && (!webglSupported || hasWebGLError || modelLoadTimeout)) {
		return <FallbackImage />;
	}

	if (!webglSupported && !showFallback) {
		return null;
	}

	if (skipCanvas) {
		return showFallback ? <FallbackImage /> : null;
	}

	try {
		return (
			<div ref={containerRef} style={{ width: "100%", height: "100%" }}>
				<AstronautCanvas
					mouse={mouse}
					isAstronautVisible={isAstronautVisible}
					onCanvasError={handleCanvasError}
					onModelLoaded={handleModelLoaded}
				/>
			</div>
		);
	} catch (error) {
		if (!hasWebGLError) {
			handleCanvasError(error);
		}
		return <FallbackImage />;
	}
}

if (typeof window !== "undefined") {
	useGLTF.preload("/astronaut.glb");
}
