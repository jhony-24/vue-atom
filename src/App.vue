<template>
  <div>
    {{ store.counter }}
    <button @click="actions.increment(5)">change counter with inc</button>
    <button @click="actions.decrement">change counter with dec</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atom, useAtom, useActions } from "./vue-atom";

const counter = atom(1);

const increment = atom((set, get, payload) => {
  set(counter, get(counter) + payload);
});

const decrement = atom((set, get) => {
  set(counter, get(counter) + -1);
});

export default defineComponent({
  setup() {
    const store = useAtom({ counter });

    const actions = useActions({ increment, decrement });

    return {
      store,
      actions,
    };
  },
});
</script>
