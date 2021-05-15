<template>
  <div>
    {{ counter }}
    <button @click="update">increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atom, useAtom, useAction } from "./vue-atom";

const counterAtom = atom(1);
const updateCounterA = atom((set, get) => {
  set(counterAtom, get(counterAtom) + get(counterAtom));
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
