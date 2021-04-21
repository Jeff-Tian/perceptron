export default class Cloneable {
  public static deepCopy<T>(source: T): T {
    return Array.isArray(source)
      ? source.map(item => this.deepCopy(item))
      : source instanceof Date
        ? new Date(source.getTime())
        : source && typeof source === 'object'
          ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
            const v = Object.getOwnPropertyDescriptor(source, prop);
            v && Object.defineProperty(o, prop, v);
            o[prop] = this.deepCopy(source[prop]);
            return o;
          }, Object.create(Object.getPrototypeOf(source)))
          : source as T;
  }
}