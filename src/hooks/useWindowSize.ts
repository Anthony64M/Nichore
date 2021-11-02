import { useState, useEffect } from "react";

export function useWindowSize(
  desktopOn?: number,
  cb?: (height: number, width: number) => void
) {
  const [dimensions, setDimensions] = useState<{
    height: number | undefined;
    width: number | undefined;
    desktop: boolean | null;
  }>({
    height: undefined,
    width: undefined,
    desktop: null,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        desktop: desktopOn === null ? null : window.innerWidth >= desktopOn,
      });
      cb && cb(window.innerHeight, window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
}
