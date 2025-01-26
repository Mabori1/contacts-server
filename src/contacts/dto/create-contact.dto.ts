import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: 'Идентификатор контакта',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({
    description: 'ФИО контакта',
    example: 'Андрей Витальевич Быстров',
    required: true,
  })
  @IsString()
  @MinLength(10)
  name: string;

  @ApiProperty({
    description: 'URL аватара',
    example: 'https://example.com/avatar.jpg',
  })
  @IsUrl()
  avatarUrl?: string;

  @ApiProperty({
    description: 'Почта контакта',
    example: 'myemail@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Телефон контакта',
    example: '+7(999) 999-99-99',
    required: true,
  })
  @IsString()
  @Length(17)
  phone: string;

  @ApiProperty({
    description: 'Дата рождения контакта',
    example: '1998-01-26T12:46:29.057Z',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  birthday: Date;
}
