<template>
  <div>
    {{ counter }}
    <button @click="actions.updateCounterA">increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atom, useAtom, useActions } from "./vue-atom";
import { useTitle } from "@vueuse/core";

const counterAtom = atom(0);
const updateCounterA = atom(() => {
  const title = useTitle();
  title.value = "jhony";
  counterAtom.atom.value = 27;
});

export default defineComponent({
  setup() {
    const { counter } = useAtom({ counter: counterAtom });
    const actions = useActions({ updateCounterA });

    return {
      counter,
      actions,
    };
  },
});
</script>
