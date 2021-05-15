import { computed } from "@vue/runtime-core";
import { AtomReturn } from "./types";

export function haveProperty<ObjectVal,PropVal>(obj : ObjectVal, prop : PropVal) : boolean {
    return (obj as any).hasOwnProperty("handler");
}

export function setAtom<T extends AtomReturn<any>,V>(value : T, payload : V) {
    value.atom.value = payload;
} 

export function getAtom<T extends AtomReturn<any>>(value : T) {
    return computed(() => value.atom.value).value;
} 