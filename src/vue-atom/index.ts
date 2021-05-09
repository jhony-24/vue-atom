import {
  SetCallback,
  SetCallbackConstructor,
  RefAtom,
  RefListObject,
  RefAtomAction,
  CallbackSelector,
} from "./types";
import { computed, readonly, Ref, ref } from "vue";

/**
 * Get a only atom or a list atoms as object
 */
export function useAtom<T extends any>(atom: T) {
  if (Object.keys(atom as object).includes("value")) {
    return computed(() => (atom as RefAtom<T>).value);
  } else {
    return computed(() => readonly<RefListObject<T>>(atom));
  }
}

/**
 * Return a selector of multiple atoms
 */
export function selector<
  AtomValue,
  GetValue = any,
  GetAtom = any
>(callback: CallbackSelector<GetAtom, GetValue, AtomValue>) {
  return computed<AtomValue>(() =>
    callback((argsAtom: RefAtom<any>) => argsAtom.value)
  );
}

/**
 * Create an atom or action
 */
export function atom<
  AtomValue,
  SetAtom extends Ref = any,
  GetAtom extends Ref = any
>(value: SetCallbackConstructor<AtomValue, SetAtom, GetAtom> | AtomValue): any {
  if (typeof value === "function") {
    const atomConstructor = () => {
      const setCallback: SetCallback<SetAtom, GetAtom["value"]> = (
        setValue,
        getValue
      ) => {
        if (typeof getValue === "function") {
          setValue.value = getValue(setValue.value);
        } else {
          setValue.value = getValue;
        }
      };

      const getCallback = (atom: GetAtom["value"]) => {
        return atom.value;
      };

      return (getPayload: AtomValue) => {
        (value as any)(setCallback, getCallback, getPayload);
      };
    };
    return atomConstructor as RefAtomAction<AtomValue>;
  }
  return ref<AtomValue>(value);
}

/**
 * Get actions created with the atom utility
 */
export function useActions<T, K extends keyof T>(
  atomActions: Record<K, () => T[K]>
) {
  const makeAtoms: Record<K, any> = Object.create({});
  for (const i in atomActions) {
    makeAtoms[i] = atomActions[i]();
  }
  return makeAtoms;
}
