// Check if WebGL is supported
export function isWebGLAvailable() {
	try {
		const canvas = document.createElement("canvas");
		const gl =
			canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		return !!gl;
	} catch (e) {
		return false;
	}
}

// Detect if we're on a mobile device
export function isMobileDevice() {
	if (typeof window === "undefined") return false;
	return (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		) ||
		(navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
	);
}

// Check if this is likely the first visit (no cached resources)
export function isLikelyFirstVisit() {
	if (typeof window === "undefined") return false;
	const perfEntries = performance.getEntriesByType("navigation");
	if (perfEntries.length > 0) {
		const navEntry = perfEntries[0];
		return navEntry.type === "navigate";
	}
	return true;
}
