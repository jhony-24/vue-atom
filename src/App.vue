<template>
  <div>
    {{ counter }}
    <button @click="update(Math.random())">increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atom, useAtom, useAction } from "./vue-atom";

const counterAtom = atom(0);
const updateCounterA = atom<number>((set, payload) => {
  set(counterAtom, payload);
});

export default defineComponent({
  setup() {
    const { counter } = useAtom({ counter: counterAtom });
    const update = useAction(updateCounterA);

    return {
      counter,
      update,
    };
  },
});
</script>
