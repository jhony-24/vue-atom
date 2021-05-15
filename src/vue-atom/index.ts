import { computed, reactive, watch, toRefs, Ref, toRef } from "vue";
import {
  AtomHandlerAction,
  AtomReturn,
  AtomValue,
  GetAtomValue,
  GetHandlerValue,
  ListAtomValues,
  ListHandlerValues,
} from "./types";
import { haveProperty } from "./utils";

export function atom<T>(value: T | ((args: T) => void)): AtomReturn<T> {
  const atomValue = reactive({
    value,
  });

  return {
    atom: atomValue as AtomValue<T>,
    subscribe(callback: (args: T) => void, immediate = false) {
      watch(
        () => this.atom.value,
        (e) => callback(e as T),
        {
          immediate,
          deep: true,
        }
      );
    },
    handler: (payload?: T) => {
      typeof value === "function" && (value as AtomHandlerAction<T>)(payload);
    },
  };
}

export function useAtom<T extends any>(stores: T) {
  const makeAtoms: Record<any, any> = Object.create({});
  for (const key in stores) {
    const atom = (stores[key] as GetAtomValue<any>).atom;
    makeAtoms[key] =
      typeof atom.value === "object" ? atom.value : toRefs(atom).value;
  }
  return makeAtoms as ListAtomValues<T>;
}

export function useAction<T>(actions: T) {
  if (haveProperty(actions,"handler")) {
    return (actions as GetHandlerValue<any>).handler;
  } else {
    const makeAtoms: Record<any, any> = Object.create({});
    for (const key in actions) {
      makeAtoms[key] = (actions[key] as GetHandlerValue<any>).handler;
    }
    return makeAtoms as ListHandlerValues<T>;
  }
}
