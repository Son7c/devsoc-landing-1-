"use client";

import { useEffect } from "react";

// Helper to detect mobile devices
function isMobileDevice() {
	if (typeof window === "undefined") return false;

	const mobileUserAgent =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);
	const hasTouchSupport =
		navigator.maxTouchPoints && navigator.maxTouchPoints > 2;
	const isIPadWithKeyboard =
		navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent);

	return mobileUserAgent || hasTouchSupport || isIPadWithKeyboard;
}

export default function ModelPreloader() {
	useEffect(() => {
		// Only preload on desktop devices (not mobile hardware)
		if (typeof window !== "undefined") {
			const isMobile = isMobileDevice();
			const isLargeViewport = window.innerWidth >= 768;

			// Only preload if it's a desktop device with large viewport
			if (!isMobile && isLargeViewport) {
				// Start fetching the model immediately for desktop
				fetch("/astronaut.glb", {
					method: "GET",
					cache: "force-cache",
				}).catch(() => {
					// Silently fail - model will be loaded later if needed
				});
			}
		}
	}, []);

	return null;
}
