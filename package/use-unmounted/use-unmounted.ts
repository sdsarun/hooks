"use client"

import { useEffect } from "react";

const useUnMounted = (callback: React.EffectCallback, deps?: React.DependencyList) => {
  useEffect(() => {
    return () => {
      callback();
    };
  }, deps);
};

export default useUnMounted;
