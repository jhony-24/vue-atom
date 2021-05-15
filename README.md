# vue-atom

State management based in atoms to **Vue 3**.

### Using store atoms

#### Creating stores

```javascript
import { atom } from "vue-atom";

const usernameAtom = atom("jhon");
const postsAtom = atom([]);
```

#### Writing getters

```javascript
import { selector } from "vue-atom";

const usernameModified = selector(get => get(usernameAtom).toUpperCase());
```

#### Updating the stores
To update an atom we use a callback method instead of a value

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

#### Listening when the atom is updated
You can use the `.subscribe` method of atom to listen all changes
```javascript
usernameAtom.subscribe(value => {
  console.log(value)
})
```

#### Using in vue components
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
import { useAtom, useAction } from "vue-atom";

export default {
  setup() {
    const usernaame = useAtom(usernameAtom);
    const usernameUppercase = useAtom(usernameModified);
    const actions = useAction({ changeUsername });

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
import { useAtom, useAction } from "vue-atom";

export default {
  setup() {
    const state = useAtom({ 
      username : usernameAtom, 
      uppercase : usernameModified 
    });
    const actions = useAction({ changeUsername });

    return {
      state,
      actions,
    };
  },
};
</script>
```


### API

#### `atom()`

Initialize a store with value or create an action. 

#### `selector()`

Get a new value of atoms.

#### `useAtom()`

Get a object of atoms.


#### `useAction()`

Get multiple actions or one action.