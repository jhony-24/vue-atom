import { computed, readonly, Ref, ref } from "vue";

type SetCallback<SetValue extends Ref, GetValue> = (set: SetValue, get: GetValue) => void;

type GetCallback<SetRefValue extends Ref, GetValue> = (atom: SetRefValue) => GetValue;

type SetCallbackConstructor<PayloadValue, Set extends Ref,Get extends Ref> = (
  set: SetCallback<Set, Set["value"]>,
  get: GetCallback<Get, Get["value"]>,
  payload: PayloadValue
) => void;

type RefAtom<T> = Ref<T>;
type RefListObject<T> = { [key in keyof T] : T[key] }
type RefAtomAction<Payload> = () => (payload: Payload) => void;

export function useAtom<T extends any>(atom: T) {
  if (Object.keys(atom as object).includes("value")) {
    return computed(() => (atom as RefAtom<T>).value);
  } else {
    return computed(() => readonly<RefListObject<T>>(atom));
  }
}

export function selector<AtomValue>(callback: () => AtomValue) {
  return computed<AtomValue>(() => callback());
}

export function atom<AtomValue, RefAtom extends Ref = any>(
  value: SetCallbackConstructor<AtomValue, RefAtom,RefAtom["value"]> | AtomValue
) : any {
  if (typeof value === "function") {
    const atomConstructor = () => {
      const setCallback: SetCallback<RefAtom,RefAtom["value"]> = (setValue, getValue) => {
        if (typeof getValue === "function") {
          setValue.value = getValue(setValue.value);
        } else {
          setValue.value = getValue;
        }
      };

      const getCallback = (atom: RefAtom) => {
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

export function useActions<T, K extends keyof T>(atomActions: Record<K, () => T[K]>) {
  const makeAtoms : any = {};
  for (const i in atomActions) {
    makeAtoms[i] = atomActions[i]();
  }
  return makeAtoms;
}
