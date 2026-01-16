const SUBSCRIBER_METHOD = Symbol("proxy.subscriber.method");

export const proxy = <T extends object>(initialState: T) => {
  type Callback = (value: T) => void;

  const subscribers = new Set<Callback>();

  const proxy = new Proxy(initialState, {
    get: (target, property) => {
      if (property === SUBSCRIBER_METHOD) {
        return subscribers;
      }

      return target[property as keyof typeof initialState];
    },
    set: (target, property, value) => {
      target[property as keyof typeof initialState] = value;
      subscribers.forEach((subscriber) => subscriber(target as T));

      return true;
    },
  });

  return proxy;
};

export const subscribe = <T extends object>(
  proxyObj: T,
  cb: (value: T) => void,
) => {
  (
    proxyObj[SUBSCRIBER_METHOD as keyof typeof proxyObj] as unknown as Set<
      typeof cb
    >
  ).add(cb);

  return () => {
    (
      proxyObj[SUBSCRIBER_METHOD as keyof typeof proxyObj] as unknown as Set<
        typeof cb
      >
    ).delete(cb);
  };
};
