const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
require('dotenv/config');

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function run() {
  await prisma.tag.upsert({ where: { slug: 'test1' }, update: {}, create: { name: 'test1', slug: 'test1' }});
  console.log('first done');
  await prisma.tag.upsert({ where: { slug: 'test2' }, update: {}, create: { name: 'test2', slug: 'test2' }});
  console.log('second done');
}

run().catch(console.error).finally(() => prisma.$disconnect());
