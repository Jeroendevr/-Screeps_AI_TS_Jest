# Extending creep memory

```TS
declare global {
  interface Memory {
    positions: Record<string, string>;
  }
}
```

(see)[https://gitlab.com/Jomik/screeps-ai/-/blob/main/packages/bot/src/library/memory.ts]

```TS
declare global {
  interface Memory extends Record<string, unknown> {}
}

export const getMemoryRef = <T>(
  key: string,
  defaultValue: T
): { get(): T; set(value: T): void } => {
  if (!(key in Memory)) {
    Memory[key] = defaultValue;
  }

  return {
    get() {
      return Memory[key] as never;
    },
    set(value) {
      Memory[key] = value;
    },
  };
};
```

### Heap

Heap memory lives between ticks but is reset when a global reset is happening

For a variable to keep on the heap is to use it outside the loop this can be in a seperate variable or in a class so a method can be added to update or retrieve the value.
