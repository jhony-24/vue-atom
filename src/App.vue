<template>
  <div>
    {{ store.username }} - {{ store.usernameUppercase }}
    <button @click="actions.updateUsername(Math.random())">
      Update username
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atom, useAtom, useActions, selector } from "./vue-atom";
import { atomic } from "./vue-atom/indexV2";

const username = atom("");
const usernameUppercase = selector((get) => get(username));

const updateUsername = atom((set, _get, payload) => {
  set(username, payload);
});

const counter = atomic({
  counterA: 0,
  counterB: 10,
});
counter.subscribe((value) => {
  console.log(value.counterA);
});
const updateCounter = atomic<number>(() => {
  counter.atom.value.counterA = Math.random();
});
setInterval(() => {
  updateCounter.handler();
}, 1000);

export default defineComponent({
  setup() {
    const store = useAtom({ username, usernameUppercase });
    const actions = useActions({ updateUsername });

    return {
      store,
      actions,
    };
  },
});
</script>
