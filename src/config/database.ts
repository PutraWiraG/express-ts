import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],
});

export const checkConnection = async () => {
  try {
    await prisma.$connect();
    console.log('[Database]: Berhasil terhubung ke PostgreSQL via Prisma.');
  } catch (error) {
    console.error('[Database]: Gagal terhubung ke database:', error);
    process.exit(1);
  }
};

export default prisma;