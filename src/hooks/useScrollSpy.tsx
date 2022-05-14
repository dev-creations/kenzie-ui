import { useEffect, useState } from "react";

const useScrollSpy = ({ itemSelector }: { itemSelector: string }) => {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(function(entries) {
      if(entries[0].isIntersecting) {
        setActiveElement(entries[0].target.id)
      }
    }, { threshold: [1], rootMargin: "0px 0px -50% 0px" });
    
    document.querySelectorAll(itemSelector).forEach(element => {
      observer.observe(element);
    })

    return () => {
      observer?.disconnect();
    }
  }, [itemSelector])

  return {
    activeElement,
  };
}

export default useScrollSpy;