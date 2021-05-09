# vue-atom

### Creating stores

```javascript
import { atom } from "vue-atom";

const username = atom("jhon");
const posts = atom([]);

```

### Updating the stores

```javascript
import { atom  } from "vue-atom";

const changeUsername = atom((set, _get, payload) => {
  set(username, payload);
});

const addPosts = atom((set, get, payload) => {
  set(posts, [...get(posts), payload]);
});
```