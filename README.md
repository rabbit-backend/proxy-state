# Lightweight Reactive Proxy State

This module provides a **minimal reactive state management utility** built on top of JavaScript’s `Proxy`. It allows you to:

- Create a reactive state object
- Subscribe to state changes
- Automatically notify subscribers whenever the state mutates

The design is intentionally small, framework-agnostic, and dependency-free.

---

## ✨ Features

- 🔁 Reactive state using native `Proxy`
- 📡 Subscription mechanism for change notifications
- 🧼 Simple unsubscribe support
- 🧩 Works with any plain object
- ⚡ Zero external dependencies

---

## 📦 API Overview

### `proxy<T extends object>(initialState: T): T`

Creates a proxied version of the given object.  
Any mutation to the proxy triggers all registered subscribers.

---

### `subscribe<T extends object>(proxyObj: T, cb: (value: T) => void): () => void`

Registers a callback that is invoked whenever the proxied state changes.  
Returns an **unsubscribe function** to remove the listener.

---

## 🧠 How It Works

- A `Symbol` (`SUBSCRIBER_METHOD`) is used to store subscribers privately on the proxy.
- The `Proxy` intercepts:
  - **`get`**: returns the subscriber set when accessed with the internal symbol.
  - **`set`**: updates the state and notifies all subscribers with the latest state.
- Subscribers are stored in a `Set` to avoid duplicates.

This ensures:
- No name collisions
- Efficient subscription management
- Predictable update behavior

---

## 🛠 Usage Example

### Creating a reactive state

```ts
import { proxy, subscribe } from "./proxy";

const state = proxy({
  count: 0,
});
````

### Subscribe to state

```ts
import { subscribe } from "./proxy";

const unsubscribe = subscribe(state, (nextState) => {
  console.log("State updated:", nextState);
});
```
