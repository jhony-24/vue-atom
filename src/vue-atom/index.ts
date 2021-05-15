import { computed, reactive, watch } from "vue";
import {
  AtomHandlerAction,
  AtomReturn,
  AtomValue,
  GetAtomValue,
  GetHandlerValue,
  ListAtomValues,
  ListHandlerValues,
} from "./types";

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

export function useAtoms<T extends { [key in keyof T]: T[key] }>(stores: T) {
  const makeAtoms: Record<any, any> = Object.create({});
  for (const key in stores) {
    const atom = (stores[key] as GetAtomValue<any>).atom;
    makeAtoms[key] =
      typeof atom.value === "object" ? atom.value : computed(() => atom.value);
  }
  return makeAtoms as ListAtomValues<T>;
}

export function useActions<T extends { [key in keyof T]: T[key] }>(actions: T) {
  const makeAtoms: Record<any, any> = Object.create({});
  for (const key in actions) {
    makeAtoms[key] = (actions[key] as GetHandlerValue<any>).handler;
  }

  return makeAtoms as ListHandlerValues<T>;
}
