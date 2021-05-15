import { computed } from "@vue/runtime-core";
import { AtomReturn, GetAtomValue } from "./types";

export function haveProperty<ObjectVal,PropVal>(obj : ObjectVal, prop : PropVal) : boolean {
    return (obj as any).hasOwnProperty(prop);
}

export const setAtom  = <T extends AtomReturn<any>,P>(value : T, payload ?: P )=>  {
    value.atom.value = payload;
} 

export const getAtom =  <T extends AtomReturn<any>>(value : T) : GetAtomValue<T> => {
    return computed(() => value.atom.value).value;
} 
  