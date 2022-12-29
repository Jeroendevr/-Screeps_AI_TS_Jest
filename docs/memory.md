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
