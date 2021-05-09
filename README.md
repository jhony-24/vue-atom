# vue-atom

State management based in atoms to **Vue 3**.

### Creating stores

```javascript
import { atom } from "vue-atom";

const usernameAtom = atom("jhon");
const postsAtom = atom([]);
```

### Updating the stores

```javascript
import { atom } from "vue-atom";

// Update the username
const changeUsername = atom((set, _get, payload) => {
  set(usernameAtom, payload);
});

// Update async store
const getPosts = atom(async (set) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const json = await response.json();
  set(postsStore,json);
});
```

### Using in vue components

```vue
<template>
  <section>
    <h1>{{ username }}</h1>
    <button @click="actions.changeUsername('marcos')">Change username</button>
  </section>
</template>

<script>
import { useAtoms, useActions } from "vue-atom";

export default {
  setup() {
    const usernaame = useAtoms(usernameAtom);
    const actions = useActions({ changeUsername });

    return {
      username,
      actions,
    };
  },
};
</script>
```
