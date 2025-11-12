import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CanvasErrorBoundary, LoadingPlaceholder } from "./ErrorBoundary";
import { AstronautModel } from "./AstronautModel";

export function AstronautCanvas({
	mouse,
	isAstronautVisible,
	onCanvasError,
	onModelLoaded,
}) {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				visibility: isAstronautVisible ? "visible" : "hidden",
				pointerEvents: isAstronautVisible ? "auto" : "none",
			}}
		>
			<CanvasErrorBoundary onError={onCanvasError}>
				<Canvas
					camera={{ position: [0, 0.5, 5], fov: 50 }}
					style={{ width: "100%", height: "100%" }}
					dpr={[1, 2]}
					performance={{ min: 0.5 }}
					frameloop={isAstronautVisible ? "always" : "never"}
					gl={{
						powerPreference: "high-performance",
						antialias: true,
						stencil: false,
						depth: true,
						failIfMajorPerformanceCaveat: false,
					}}
					onCreated={(state) => {
						if (!state.gl.getContext()) {
							onCanvasError();
						}
					}}
					onError={onCanvasError}
				>
					<ambientLight intensity={0.6} />
					<directionalLight
						position={[3, 5, 5]}
						intensity={1.5}
						castShadow={false}
					/>
					<Environment preset="city" />
					<Suspense fallback={<LoadingPlaceholder />}>
						<AstronautModel
							mouse={mouse}
							isAstronautVisible={isAstronautVisible}
							onModelLoaded={onModelLoaded}
						/>
					</Suspense>
				</Canvas>
			</CanvasErrorBoundary>
		</div>
	);
}
