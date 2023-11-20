// custom-validator.decorator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'ExpirationYear', async: false })
export class CustomValidationConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string, _: ValidationArguments) {
    const currentYear = new Date().getFullYear() + 5;
    return Number(value) <= currentYear;
  }

  defaultMessage(_: ValidationArguments) {
    return (
      'The expiration date should not be older than the year ' +
      (new Date().getFullYear() + 5)
    );
  }
}

export function ExpirationYear(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomValidationConstraint,
    });
  };
}
