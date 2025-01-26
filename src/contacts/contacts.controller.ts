import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Contact } from '@prisma/client';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiResponse({
    type: CreateContactDto,
    status: HttpStatus.OK,
    description: 'Контакт успешно создан',
  })
  @Post()
  async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return await this.contactsService.create(createContactDto);
  }

  @ApiResponse({
    type: CreateContactDto,
    status: HttpStatus.OK,
    description: 'Контакты успешно получены',
  })
  @Get()
  async findAll(): Promise<Contact[]> {
    return await this.contactsService.findAll();
  }

  @ApiResponse({
    type: CreateContactDto,
    status: HttpStatus.OK,
    description: 'Контакт успешно получен',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contact> {
    return await this.contactsService.findOne(+id);
  }

  @ApiResponse({
    type: CreateContactDto,
    status: HttpStatus.OK,
    description: 'Контакт успешно изменён',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    return await this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.contactsService.remove(+id);
  }
}
