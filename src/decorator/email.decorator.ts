// allowed-domain.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAllowedDomain', async: false })
export class IsAllowedDomainConstraint implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    const allowedDomains = args.constraints[0];
    const [, domain] = email.split('@');
    return allowedDomains.includes(domain);
  }

  defaultMessage(args: ValidationArguments) {
    const allowedDomains = args.constraints[0];
    return `The email domain must be one of: ${allowedDomains.join(
      ', ',
    )}`;
  }
}

export function IsAllowedDomain(
  allowedDomains: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [allowedDomains],
      validator: IsAllowedDomainConstraint,
    });
  };
}
