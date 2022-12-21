export function exclude<U, Key extends keyof U>(
  entity: U,
  keys: Key[]
): Omit<U, Key> {
  for (let key of keys) {
    delete entity[key];
  }
  return entity;
}
