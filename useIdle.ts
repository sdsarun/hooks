import { useEffect, useMemo, useState } from "react";
import usePageVisibility from "./usePageVisibility";

export type UseIdleResult = {
  isIdle: boolean;
};

export type UseIdleOptions = {
  delayToIdleInMS?: number;
  startDetectInMS?: number;
};

const useIdle = (options?: UseIdleOptions): UseIdleResult => {
  const isPageVisibility = usePageVisibility();

  const [isIdle, setIsActive] = useState<boolean>(true);

  const delayToIdleInMS = useMemo(() => options?.delayToIdleInMS ?? 3000, [options?.delayToIdleInMS]);
  const startDetectIdleInMS = useMemo(() => options?.startDetectInMS ?? 5000, [options?.startDetectInMS]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    let startDelayTimeout: NodeJS.Timeout;
    let detectUserInActiveTimeout: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(detectUserInActiveTimeout);

      setIsActive(true);

      detectUserInActiveTimeout = setTimeout(() => {
        setIsActive(false);
      }, delayToIdleInMS);
    };

    const startDetectingUserAction = () => {
      document.addEventListener("click", resetInactivityTimer);
      document.addEventListener("mousemove", resetInactivityTimer);
      document.addEventListener("keydown", resetInactivityTimer);
      document.addEventListener("touchstart", resetInactivityTimer);
      document.addEventListener("contextmenu", resetInactivityTimer);
    };

    const stopDetectingUserAction = () => {
      clearTimeout(detectUserInActiveTimeout);

      document.removeEventListener("click", resetInactivityTimer);
      document.removeEventListener("mousemove", resetInactivityTimer);
      document.removeEventListener("keydown", resetInactivityTimer);
      document.removeEventListener("touchstart", resetInactivityTimer);
      document.removeEventListener("contextmenu", resetInactivityTimer);
    };

    if (isPageVisibility) {
      if (startDetectIdleInMS <= 0) {
        startDetectingUserAction();
      } else {
        startDelayTimeout = setTimeout(() => {
          startDetectingUserAction();
        }, startDetectIdleInMS)
      }
    } else {
      stopDetectingUserAction();
      setIsActive(false);
    }

    return () => {
      clearTimeout(startDelayTimeout);
      stopDetectingUserAction();
    };
  }, [delayToIdleInMS, isPageVisibility, startDetectIdleInMS]);

  const memoize = useMemo<UseIdleResult>(
    () => ({
      isIdle
    }),
    [isIdle]
  );

  return memoize;
};

export default useIdle;
