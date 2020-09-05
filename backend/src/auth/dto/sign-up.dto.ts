import {IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength} from 'class-validator'

export class SignUpDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  login: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  name: string

  @IsString()
  @IsNotEmpty()
  @Length(60, 60)
  password: string
}
