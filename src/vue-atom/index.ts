import { computed, readonly, Ref, ref } from "vue";

export function atom<T>(value : T) {
  return ref<T>(value);
}


export function useAtom<T extends any>(atom : T ) {
    if (Object.keys(atom as object).includes("value")) {
      return computed(() =>  (atom as Ref<T>).value);
      } else {
      return computed(() => readonly(atom as object));
    }
}


type SetCallback<A> = ( set : Ref<A>, get : A ) => void
type GetCallback<T> = (atom : Ref<T>) => void

export function updateAtom<T,A,C>(callbackSet : ( set : SetCallback<A>, get : GetCallback<C>, payload : T ) => void) {
  return (payload : T) => {
    
    const setCallback: SetCallback<A> =  (setValue,getValue) => {
      if (typeof getValue === "function") {
        setValue.value = getValue(setValue.value);
      } else {
        setValue.value = getValue;
      }
    }

    const getCallback = (atom : Ref<C>) => {
      return atom.value;
    }

    callbackSet(setCallback,getCallback, payload);
  };
}