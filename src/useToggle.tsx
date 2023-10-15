import { atom, useAtom, PrimitiveAtom } from "jotai";
import { useMemo } from "react";

function useToggleAtom(targetAtom: PrimitiveAtom<boolean>) {
  const toggleAtom = useMemo(() => {
    return atom(
      (get) => get(targetAtom),
      (get, set) => {
        const status = get(targetAtom);
        set(targetAtom, !status);
      }
    );
  }, [targetAtom]);

  return useAtom(toggleAtom);
}

export default useToggleAtom;
