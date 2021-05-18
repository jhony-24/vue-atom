import { reactive, watch, toRefs, computed } from "vue";
import {
  AtomCoreHandlerAction,
  AtomGetter,
  AtomReturn,
  AtomValue,
  GetAtomValue,
  GetHandlerValue,
  ListAtomValues,
  ListHandlerValues,
} from "./types";
import { getAtom, haveProperty, setAtom } from "./utils";

export function atom<T extends any>(
  value: T | AtomCoreHandlerAction<T>
): AtomReturn<T> {
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
    handler(payload?: T) {
      if(typeof value === "function") {
        const callback = (value as any)(setAtom, getAtom, payload);
        if(!!callback && typeof callback.then === "function") {
          const asyncHandler = async () => {
            const response = await callback;
            atomValue.value = response;
          }
          asyncHandler();
        }
      }
    },
  };
}

export function selector<T>(get: AtomGetter<T>) {
  const selectorAtom = {
    atom: {
      value: computed(() => get((e) => e.atom.value)),
    },
  };
  return selectorAtom;
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
  if (haveProperty(actions, "handler")) {
    return (actions as GetHandlerValue<any>).handler;
  } else {
    const makeAtoms: Record<any, any> = Object.create({});
    for (const key in actions) {
      makeAtoms[key] = (actions[key] as GetHandlerValue<any>).handler;
    }
    return makeAtoms as ListHandlerValues<T>;
  }
}
