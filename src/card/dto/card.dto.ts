import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IsAllowedDomain } from '../../decorator/email.decorator';
import { ExpirationYear } from '../../decorator/expirationYear.decorator';
import { ExpirationMonth } from '../../decorator/expirationMonth.decorator';

export class CardDto {
  @IsNotEmpty()
  @IsEmail()
  @IsAllowedDomain(['gmail.com', 'hotmail.com', 'yahoo.es'])
  email: string;

  @Length(13, 16)
  @IsString()
  card_number: string;

  @Length(3, 4)
  @IsString()
  cvv: string;

  @Length(4, 4)
  @ExpirationYear()
  @IsString()
  expiration_year: string;

  @Length(1, 2)
  @ExpirationMonth()
  expiration_month: string;
}
