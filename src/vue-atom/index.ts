import { computed, readonly, Ref, ref } from "vue";

export function atom<T>(value: T) {
  return ref<T>(value);
}

export function useAtom<T extends any>(atom: T) {
  if (Object.keys(atom as Record<string,any>).includes("value")) {
    return computed(() => (atom as Ref<T>).value);
  } else {
    return computed(() => readonly(atom as Record<string,any>));
  }
}

type SetCallback<A, B> = (set: A, get: B) => void;
type GetCallback<A,B> = (atom: A) => B;

export function updateAtom<C extends any = any,A = {},B = {}>(
  setCallbackResult:(
    set: SetCallback<Ref<A>, B>,
    get: GetCallback<Ref<B>,any>,
    payload: C
  ) => void
) {
  return (payload: C) => {
    const setCallback: SetCallback<Ref<A>, any> = (setValue, getValue) => {
      if (typeof getValue === "function") {
        setValue.value = getValue(setValue.value);
      } else {
        setValue.value = getValue;
      }
    };

    const getCallback = (atom: any) => {
      return atom.value;
    };

    setCallbackResult(setCallback, getCallback, payload);
  };
}
