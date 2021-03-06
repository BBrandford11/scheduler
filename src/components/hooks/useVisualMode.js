import { React, useState } from "react";

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

   // transition to a new mode
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }

    setMode(newMode);
  }

   // transition back to the previous mode
  function back() {
    setHistory((prev) => {
      if (prev.length === 1) {
        return [...prev];
      }

      const reducedMode = [...prev.slice(0, -1)];
      setMode(reducedMode[reducedMode.length - 1]);

      return reducedMode;
    });
  }

  return { mode, transition, back };
}

export default useVisualMode;
