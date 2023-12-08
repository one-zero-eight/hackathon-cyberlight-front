import { useEffect, useRef, useState } from "react";
import { useIsClient } from "usehooks-ts";

export function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const element = ref.current;
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setWidth(width);
    });

    if (element) {
      observer.observe(element);
      return () => {
        observer.unobserve(element);
      };
    }
  }, [isClient]);

  return {
    ref,
    width,
  };
}
