# vue-atom

State management based in atoms to **Vue 3**.

### Creating stores

```javascript
import { atom } from "vue-atom";

const usernameAtom = atom("jhon");
const postsAtom = atom([]);
```

### Writing getters

```javascript
import { selector } from "vue-atom";

const usernameModified = selector(get => get(usernameAtom).toUpperCase());
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
To use a store o selector use **useAtoms()**, for actions use **useActions()**.

```vue
<template>
  <section>
    <h1>{{ username }} - {{ usernameUppercase }}</h1>
    <button @click="actions.changeUsername('marcos')">
      Change username
    </button>
  </section>
</template>

<script>
import { useAtoms, useActions } from "vue-atom";

export default {
  setup() {
    const usernaame = useAtoms(usernameAtom);
    const usernameUppercase = useAtoms(usernameModified);
    const actions = useActions({ changeUsername });

    return {
      username,
      usernameUppercase,
      actions,
    };
  },
};
</script>
```

If you want to use multiple stores or selectors with a one useAtoms hooks you can pass how object

```vue
<template>
  <section>
    <h1>{{ state.username }} - {{ state.uppercase }}</h1>
    <button @click="actions.changeUsername('marcos')">
      Change username
    </button>
  </section>
</template>

<script>
import { useAtoms, useActions } from "vue-atom";

export default {
  setup() {
    const state = useAtoms({ 
      username : usernameAtom, 
      uppercase : usernameModified 
    });
    const actions = useActions({ changeUsername });

    return {
      state,
      actions,
    };
  },
};
</script>
```