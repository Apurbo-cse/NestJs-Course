export function AllowAnonymous(): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    console.log('The allow anonymous decorator is called! ' + String(propertyKey));
    Reflect.defineMetadata('allowAnonymous', true, descriptor.value);
  };
}
