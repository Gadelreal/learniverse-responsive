
import { useEffect } from "react";

/**
 * Hook to handle scroll animations
 * @param options Configuration options for the intersection observer
 * @returns void
 */
export const useScrollAnimation = (options = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
}) => {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);
};

export default useScrollAnimation;
