<template>
  <div>
    <h1>normal {{ counter }}</h1>
    <h1>duplicate {{ duplicate }}</h1>
    <button @click="update">increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { atom, useAtom, useAction, selector } from "./vue-atom";

function defineCounterModel() {
  const counter = atom(1);
  const duplicate = selector((get) => get(counter) + get(counter));

  const updateCounterA = atom((set, get) => {
    set(counter, get(counter) + get(counter));
  });

  return () => {
    const store = useAtom({ counter, duplicate });
    const update = useAction(updateCounterA);

    return {
      counter: store.counter,
      duplicate: store.duplicate,
      update,
    };
  };
}

const counterModel = defineCounterModel();

export default defineComponent({
  setup() {
    const { counter, duplicate, update } = counterModel();
    return {
      counter,
      duplicate,
      update,
    };
  },
});
</script>
