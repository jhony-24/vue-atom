<template>
  <div>
    {{ store.username }} - {{ store.usernameUppercase }}
    <button @click="actions.updateUsername('als')">Update username</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atom, useAtom, useActions, selector } from "./vue-atom";

// define initial stores and getterrs
const username = atom("");
const usernameUppercase = selector((get) => get(username).toUpperCase());

// creating actions
const updateUsername = atom((set, _get, payload) => {
  set(username, payload);
});

// using store and actions

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
