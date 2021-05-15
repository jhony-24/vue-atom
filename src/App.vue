<template>
  <div>
    {{ counter }}
    <button @click="actions.updateCounterA">increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atomic, useAtom, useActions } from "./vue-atom/indexV2";
import { useTitle } from "@vueuse/core";

const counterAtom = atomic(0);

const updateCounterA = atomic(() => {
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
