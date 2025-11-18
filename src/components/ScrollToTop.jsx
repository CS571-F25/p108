import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // for HashRouter, scroll on key change is safest
    window.scrollTo(0, 0);
  }, [key]);

  return null;
}
