export type AtomValue<T> = {
  value: T;
};

export type AtomSubscriber<T> = (
  callback: (args: T) => void,
  immediate?: boolean
) => void;

export type SetAtom<T extends AtomReturn<any>,V> = (value: T, payload : V) => void;
export type GetAtom<T extends AtomReturn<any>> = (value: T) => void;

export type AtomHandlerAction<T> = (payload?: T) => void;

export type AtomCoreHandlerAction<T> = (set : SetAtom<any,T>,get: GetAtom<any>,payload?: T) => void;


export interface AtomReturn<T> {
  atom: AtomValue<T>;
  subscribe: AtomSubscriber<T>;
  handler: AtomHandlerAction<T>;
}

export type GetAtomValue<T extends AtomReturn<any>> = T["atom"]["value"];

export type GetHandlerValue<T extends AtomReturn<any>> = T["handler"];

export type ListAtomValues<
  T extends { [key in keyof T]: T[key] },
> = { [key in keyof T]: GetAtomValue<T[key]> };

export type ListHandlerValues<
  T extends { [key in keyof T]: T[key] }
> = { [key in keyof T]: GetHandlerValue<T[key]> };
