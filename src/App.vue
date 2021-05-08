<template>
  <div>
    {{ store.counter }}
    <button @click="updateCounter(20)">update</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atom, updateAtom, useAtom } from "./vue-atom";

const counter = atom(2);
const updateCounter = updateAtom((set,get,payload) => {
  set(counter,get(counter) * get(counter));
})


export default defineComponent({
  setup() {
    const store = useAtom({ counter });

    return {
      store,
      updateCounter,
    };
  },
});
</script>
