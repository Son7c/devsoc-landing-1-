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

// Detect if we're on a small viewport (mobile layout)
export function isSmallViewport() {
	if (typeof window === "undefined") return false;
	return window.innerWidth < 768;
}

// Detect if we're on a mobile device (hardware detection, not viewport)
// This checks the actual device type regardless of viewport size
export function isMobileDevice() {
	if (typeof window === "undefined") return false;

	// Check user agent for mobile devices
	const mobileUserAgent =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);

	// Check for touch support (tablets and touch devices)
	const hasTouchSupport =
		navigator.maxTouchPoints && navigator.maxTouchPoints > 2;

	// Check for iPad with keyboard (reports as MacIntel but has touch)
	const isIPadWithKeyboard =
		navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent);

	return mobileUserAgent || hasTouchSupport || isIPadWithKeyboard;
}
