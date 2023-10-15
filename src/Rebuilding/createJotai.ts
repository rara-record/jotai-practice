import { useSyncExternalStore } from "react";

interface Atom<AtomType> {
  get: () => AtomType;
  set: (newValue: AtomType) => void;
  subscribe: (callback: (newValue: AtomType) => void) => () => void;
}

type AtomGetter<AtomType> = (
  get: <Target>(a: Atom<Target>) => Target
) => AtomType;

export const atom = <AtomType>(
  initialValue: AtomType | AtomGetter<AtomType>
): Atom<AtomType> => {
  let value: AtomType =
    typeof initialValue === "function" ? (null as AtomType) : initialValue;
  const subscribers = new Set<(newValue: AtomType) => void>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscribed = new Set<Atom<any>>();

  function get<Target>(atom: Atom<Target>) {
    let currentValue = atom.get();

    if (!subscribed.has(atom)) {
      subscribed.add(atom);
      atom.subscribe(function (newValue) {
        if (currentValue === newValue) return;
        currentValue = newValue;
        computeValue();
      });
    }

    return currentValue;
  }

  async function computeValue() {
    const newValue =
      typeof initialValue === "function"
        ? (initialValue as AtomGetter<AtomType>)(get)
        : value;
    value = null as AtomType;
    value = await newValue;
    subscribers.forEach((callback) => callback(value));
  }

  computeValue();

  return {
    get: () => value,
    set: (newValue) => {
      value = newValue;
      // set 메서드를 호출할 때 구독자들에게 새로운 값을 알립니다.
      subscribers.forEach((callback) => callback(newValue));
    },
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    },
  };
};

export const useAtom = <AtomType>(atom: Atom<AtomType>) => {
  return [useSyncExternalStore(atom.subscribe, atom.get), atom.set] as const;
};

export function useAtomValue<AtomType>(atom: Atom<AtomType>) {
  return useSyncExternalStore(atom.subscribe, atom.get);
}
