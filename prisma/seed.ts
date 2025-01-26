import { fakerRU as faker } from '@faker-js/faker';
import { Contact, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DATA_COUNT = 100;

const dataMock: Contact[] = [];
for (let i = 0; i < DATA_COUNT; i++) {
  const sex: 'male' | 'female' = faker.helpers.arrayElement(['male', 'female']);

  dataMock[i] = {
    id: i + 1,
    name: faker.person.fullName({ sex }),
    avatarUrl: `https://xsgames.co/randomusers/avatar.php?g=${sex}`,
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone
      .number({ style: 'national' })
      .toString()
      .replace(/^8/, '+7'),
    birthday: new Date(faker.date.birthdate()),
  };

  dataMock.push();
}

async function main() {
  console.log(`Start seeding ...`);
  for (const data of dataMock) {
    await prisma.contact.create({
      data,
    });
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
