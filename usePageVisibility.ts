import { useState, useEffect } from 'react';

const usePageVisibility = () => {
  const [isPageActive, setIsPageActive] = useState<boolean>(true);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const handleVisibilityChange = () => {
      setIsPageActive(!document.hidden);
    };

    // const handleFocus = () => setIsPageActive(true);
    // const handleBlur = () => setIsPageActive(false);

    if ("visibilityState" in document) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      // document.addEventListener('focus', handleFocus);
      // document.addEventListener('blur', handleBlur);
    }

    return () => {
      if ("visibilityState" in document) {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        // document.addEventListener('focus', handleFocus);
        // document.addEventListener('blur', handleBlur);
      }
    };
  }, []);

  return isPageActive;
};

export default usePageVisibility;
