import { computed } from "@vue/runtime-core";
import { GetAtom, SetAtom } from "./types";

export function haveProperty<ObjectVal,PropVal>(obj : ObjectVal, prop : PropVal) : boolean {
    return (obj as any).hasOwnProperty(prop);
}

export const setAtom : SetAtom<any,any> = (value, payload )=>  {
    value.atom.value = payload;
} 

export const getAtom: GetAtom<any> = (value) => {
    return computed(() => value.atom.value).value;
} 