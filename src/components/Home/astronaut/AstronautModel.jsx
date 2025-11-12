import { useRef, useEffect, useState, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function AstronautModel({ mouse, isAstronautVisible, onModelLoaded }) {
	const [scale, setScale] = useState(4.5);

	// Load the model
	const { scene, animations } = useGLTF("/astronaut.glb", true);

	const modelGroup = useRef();
	const headRef = useRef();
	const { actions } = useAnimations(animations, scene);
	const [hasNotifiedLoad, setHasNotifiedLoad] = useState(false);

	// Notify when model is loaded and ready
	useEffect(() => {
		if (scene && !hasNotifiedLoad) {
			// Use requestAnimationFrame to ensure the scene is actually rendered
			requestAnimationFrame(() => {
				setHasNotifiedLoad(true);
				onModelLoaded?.();
			});
		}
	}, [scene, hasNotifiedLoad, onModelLoaded]);

	useEffect(() => {
		// Play first animation if available
		if (actions && Object.keys(actions).length > 0) {
			const firstAction = Object.values(actions)[0];
			firstAction.reset().fadeIn(0.5).play();
		}

		// Find the head bone
		scene.traverse((child) => {
			const name = child.name.toLowerCase();
			if (
				!headRef.current &&
				(name.includes("head") ||
					name.includes("Bone-head") ||
					(name.includes("mixamorig") && name.includes("head")))
			) {
				headRef.current = child;
			}
		});
	}, [scene, actions]);

	// Animate head tracking with mouse
	useFrame(() => {
		if (headRef.current && mouse.current && isAstronautVisible) {
			const targetX = (mouse.current.x / window.innerWidth) * 2 - 1;
			const targetZ = (mouse.current.y / window.innerHeight) * 2 - 1;

			headRef.current.rotation.y = THREE.MathUtils.lerp(
				headRef.current.rotation.y,
				targetX * 0.8,
				0.1,
			);
			headRef.current.rotation.z = THREE.MathUtils.lerp(
				headRef.current.rotation.z,
				-targetZ * 0.5,
				0.1,
			);
		}
	});

	const groupProps = useMemo(
		() => ({
			position: [0, -2.4, 0],
			rotation: [0, -Math.PI / 2, 0],
			scale: scale,
		}),
		[scale],
	);

	return (
		<group ref={modelGroup} {...groupProps}>
			<primitive object={scene} />
		</group>
	);
}
