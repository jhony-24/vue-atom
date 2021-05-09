<template>
  <div>
    {{ store.counter }} - {{ store.doubleCounter }}
    <button @click="actions.increment">change counter with inc</button>
    <button @click="actions.decrement">change counter with dec</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atom, useAtom, useActions, selector } from "./vue-atom";

const counter = atom(1);
const doubleCounter = selector((get) => get(counter) + get(counter));

const increment = atom((set, get) => {
  set(counter, get(counter) + 1);
});

const decrement = atom((set, get) => {
  set(counter, get(counter) + -1);
});

export default defineComponent({
  setup() {
    const store = useAtom({ counter, doubleCounter });

    const actions = useActions({ increment, decrement });

    return {
      store,
      actions,
    };
  },
});
</script>
