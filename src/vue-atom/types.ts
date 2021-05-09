import { Ref } from "vue";

export type SetCallback<SetValue extends Ref, GetValue> = (set: SetValue, get: GetValue) => void;

export type GetCallback<SetRefValue extends Ref, GetValue> = (atom: SetRefValue) => GetValue;

export type SetCallbackConstructor<PayloadValue, Set extends Ref,Get extends Ref> = (
  set: SetCallback<Set, Set["value"]>,
  get: GetCallback<Get, Get["value"]>,
  payload: PayloadValue
) => void;

export type RefAtom<T> = Ref<T>;
export type RefListObject<T> = { [key in keyof T] : T[key] }
export type RefAtomAction<Payload> = () => (payload: Payload) => void;
