// custom-validator.decorator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'ExpirationMonth', async: false })
export class CustomValidationConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string, _: ValidationArguments) {
    return Number(value) >= 1 && Number(value) <= 12;
  }

  defaultMessage(_: ValidationArguments) {
    return 'Not a correct expiration month';
  }
}

export function ExpirationMonth(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomValidationConstraint,
    });
  };
}
