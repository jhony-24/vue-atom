<template>
  <div>
    {{ store.username }} - {{ store.usernameUppercase }}
    <button @click="actions.updateUsername('als')">Update username</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atom, useAtom, useActions, selector } from "./vue-atom";

const username = atom("");
const usernameUppercase = selector((get) => get(username).toUpperCase());

const updateUsername = atom((set, _get, payload) => {
  set(username, payload);
});

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
