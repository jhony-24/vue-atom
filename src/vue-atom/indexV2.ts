import { reactive, watch } from "vue";

export function atomic<T>(value: T | ((args: T) => void)) {
    const atomValue = reactive({
        value
    });

    return {
      atom: atomValue as { value : T },
      subscribe(callback: (args: T) => void, immediate = false) {
        watch(() => this.atom.value, (e) => callback(e as T), {
          immediate,
          deep : true,
        });
      },
      handler: (payload?: T) => {
        typeof value === "function" && (value as any)(payload);
      },
    };
  }