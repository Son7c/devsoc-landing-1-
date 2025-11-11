import { useState, useEffect, useRef } from "react";
import { isMobileDevice, isLikelyFirstVisit, isWebGLAvailable } from "./utils";

export function useAstronautLoader(onModelLoaded) {
	const [hasWebGLError, setHasWebGLError] = useState(false);
	const [modelLoadTimeout, setModelLoadTimeout] = useState(false);
	const [webglSupported, setWebglSupported] = useState(true);
	const [showFallback, setShowFallback] = useState(false);
	const [modelLoaded, setModelLoaded] = useState(false);
	const [skipCanvas, setSkipCanvas] = useState(false);
	const loadTimeoutRef = useRef(null);
	const safetyTimeoutRef = useRef(null);
	const mountTimeRef = useRef(Date.now());

	// Early detection: Skip Canvas on mobile devices on first visit
	useEffect(() => {
		if (typeof window !== "undefined") {
			const isMobile = isMobileDevice();
			const isFirstVisit = isLikelyFirstVisit();

			if (isMobile && isFirstVisit) {
				setSkipCanvas(true);
				setWebglSupported(false);
				setTimeout(() => {
					setShowFallback(true);
					onModelLoaded?.();
				}, 1500);
				return;
			}

			const supported = isWebGLAvailable();
			if (!supported) {
				setWebglSupported(false);
				setTimeout(() => {
					setShowFallback(true);
					onModelLoaded?.();
				}, 1500);
			}
		}
	}, [onModelLoaded]);

	// Set a timeout for model loading
	useEffect(() => {
		if (skipCanvas) return;

		const isMobile = isMobileDevice();
		const timeout = isMobile ? 2500 : 5000;

		if (webglSupported && !modelLoaded && !modelLoadTimeout) {
			loadTimeoutRef.current = setTimeout(() => {
				if (!modelLoaded) {
					setModelLoadTimeout(true);
					setShowFallback(true);
					onModelLoaded?.();
				}
			}, timeout);
		}

		const safetyTimeout = isMobile ? 4000 : 7000;
		safetyTimeoutRef.current = setTimeout(() => {
			if (!modelLoaded && !showFallback) {
				setModelLoadTimeout(true);
				setShowFallback(true);
				onModelLoaded?.();
			}
		}, safetyTimeout);

		return () => {
			if (loadTimeoutRef.current) {
				clearTimeout(loadTimeoutRef.current);
			}
			if (safetyTimeoutRef.current) {
				clearTimeout(safetyTimeoutRef.current);
			}
		};
	}, [
		webglSupported,
		modelLoaded,
		showFallback,
		skipCanvas,
		onModelLoaded,
		modelLoadTimeout,
	]);

	const handleCanvasError = (error) => {
		setHasWebGLError(true);
		if (loadTimeoutRef.current) {
			clearTimeout(loadTimeoutRef.current);
		}
		if (safetyTimeoutRef.current) {
			clearTimeout(safetyTimeoutRef.current);
		}

		const elapsedTime = Date.now() - mountTimeRef.current;
		const minLoadingTime = 1500;
		const waitTime = Math.max(0, minLoadingTime - elapsedTime);

		setTimeout(() => {
			setShowFallback(true);
			onModelLoaded?.();
		}, waitTime);
	};

	const handleModelLoaded = () => {
		setModelLoaded(true);
		if (loadTimeoutRef.current) {
			clearTimeout(loadTimeoutRef.current);
		}
		if (safetyTimeoutRef.current) {
			clearTimeout(safetyTimeoutRef.current);
		}
		onModelLoaded?.();
	};

	return {
		hasWebGLError,
		modelLoadTimeout,
		webglSupported,
		showFallback,
		modelLoaded,
		skipCanvas,
		handleCanvasError,
		handleModelLoaded,
	};
}
