// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (object: any, properties: string[] = []) => {
  if (!object) return;

  properties.forEach(property => delete object[property as keyof typeof object]);

  return object;
};
