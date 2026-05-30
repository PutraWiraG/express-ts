import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding users, book...');

  await prisma.user.createMany({
    data: [
      {
        name: 'Putra Wira',
        email: 'putra@mail.com',
      },
      {
        name: 'Budi Santoso',
        email: 'budi@mail.com',
      },
      {
        name: 'Siti Aminah',
        email: 'siti@mail.com',
      },
    ],
    skipDuplicates: true, // biar tidak error kalau email sama
  });

  await prisma.book.createMany({
    data: [
      {
        title: 'Buku 1',
        writer: 'Penulis 1',
        stock: 20
      },
      {
        title: 'Buku 2',
        writer: 'Penulis 2',
        stock: 20
      },
      {
        title: 'Buku 3',
        writer: 'Penulis 3',
        stock: 20
      },
    ]
  })

  console.log('✅ Seeding selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });