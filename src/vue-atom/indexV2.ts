import { computed, reactive, readonly, watch } from "vue";

export interface AtomicReturn<T> {
  atom: { value: T };
  subscribe: (callback: (args: T) => void, immediate?: boolean) => void;
  handler: (payload?: T) => void;
}

export function atomic<T>(value: T | ((args: T) => void)): AtomicReturn<T> {
  const atomValue = reactive({
    value,
  });

  return {
    atom: atomValue as { value: T },
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
      typeof value === "function" && (value as any)(payload);
    },
  };
}

export type OnlyAtomicValue<T extends AtomicReturn<any>> = T["atom"]["value"];
export type OnlyHandlerValue<T extends AtomicReturn<any>> = T["handler"];

export function useAtom<
  T extends { [key in keyof T]: T[K] },
  K extends keyof T
>(stores: T) {
  const makeAtoms: Record<any, any> = Object.create({});
  for (const key in stores) {
    const atom = (stores[key] as OnlyAtomicValue<any>).atom;
    makeAtoms[key] = typeof atom.value === "object" ? atom.value : computed(() => atom.value);
  }
  return makeAtoms as { [key in K]: OnlyAtomicValue<T[key]> };
}

export function useActions<
  T extends { [key in keyof T]: T[K] },
  K extends keyof T
>(actions: T) {

  const makeAtoms: Record<any, any> = Object.create({});
  for (const key in actions) {
    makeAtoms[key] = (actions[key] as OnlyHandlerValue<any>).handler;
  }

  return makeAtoms as { [key in K]: OnlyHandlerValue<T[key]> };

}
