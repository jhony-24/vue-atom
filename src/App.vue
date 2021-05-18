<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atom } from "./vue-atom";

const user = atom(async () => {
  return "user data";
});

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
