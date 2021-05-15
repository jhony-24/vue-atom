<template>
  <div>
    {{ counter }}
    <button @click="actions.updateCounterA(Math.random())">increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atom, useAtoms, useActions } from "./vue-atom";

const counterAtom = atom(0);
const updateCounterA = atom<number>((payload) => {
  counterAtom.atom.value = payload;
});

counterAtom.subscribe((value) => {
  console.log(value);
});

export default defineComponent({
  setup() {
    const { counter } = useAtoms({ counter: counterAtom });
    const actions = useActions({ updateCounterA });

    return {
      counter,
      actions,
    };
  },
});
</script>
