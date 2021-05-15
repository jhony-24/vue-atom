<template>
  <div>
    {{ store }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atomic, useAtom } from "./vue-atom/indexV2";

const counter = atomic({
  counterA: 0,
  counterB: 10,
});

export default defineComponent({
  setup() {
    const store = useAtom({ counter });
    store.counter;

    return {
      store,
    };
  },
});
</script>
