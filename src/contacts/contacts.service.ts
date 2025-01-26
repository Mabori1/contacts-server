import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Contact, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ContactsService {
  logger = new Logger(ContactsService.name);
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ContactCreateInput): Promise<Contact> {
    const existContact = await this.prisma.contact
      .findUnique({ where: { email: data.email } })
      .catch((err) => this.logger.error(err));

    if (existContact)
      throw new ConflictException('Контакт c такой почтой уже создан');

    const contact = await this.prisma.contact
      .create({
        data,
      })
      .catch((err) => this.logger.error(err.message));

    if (!contact) throw new ConflictException('Контакт не создан');
    return contact;
  }

  async findAll(): Promise<Contact[]> {
    const contacts = await this.prisma.contact
      .findMany()
      .catch((err) => this.logger.error(err));

    if (!contacts) {
      throw new NotFoundException('Контакты не найдены');
    }
    return contacts;
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.prisma.contact
      .findUnique({ where: { id } })
      .catch((err) => {
        this.logger.error(err);
      });

    if (!contact) throw new NotFoundException('Контакт не найден');
    return contact;
  }

  async update(id: number, data: Prisma.ContactUpdateInput): Promise<Contact> {
    const contact = await this.prisma.contact
      .update({
        where: { id },
        data,
      })
      .catch((err) => this.logger.error(err));

    if (!contact) throw new ForbiddenException('Контакт не обновлён');
    return contact;
  }

  async remove(id: number) {
    await this.prisma.contact.delete({ where: { id } });
    return `Контакт с идентификтором ${id} успешно удалён`;
  }
}
