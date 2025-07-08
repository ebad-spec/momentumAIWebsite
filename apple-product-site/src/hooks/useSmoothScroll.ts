import Lenis from 'lenis';
import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Initialize Lenis with premium smooth scrolling settings
    const lenis = new Lenis({
      duration: 1.2, // Smooth duration for that buttery feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for inertia
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: true, // Let Lenis handle the animation frame automatically
    });

    // Listen for scroll events (optional, for debugging)
    lenis.on('scroll', (e) => {
      // You can add scroll event listeners here if needed
    });

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, []);
}; 