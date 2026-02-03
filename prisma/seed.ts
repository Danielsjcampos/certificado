import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined')
}

// In Prisma 7, PrismaClient should pick up config from prisma.config.ts
// but we'll explicitly pass the datasource URL to be sure for this script
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
})

async function main() {
  console.log('Seeding database...')
  
  // Create Dev User
  const devUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      password: 'devpassword123',
      name: 'Dev Admin',
      role: 'admin',
    },
    create: {
      username: 'admin',
      password: 'devpassword123',
      name: 'Dev Admin',
      role: 'admin',
    },
  })

  console.log('Admin user status:', devUser.username)

  // Seed some leads
  const leadsCount = await prisma.lead.count()
  if (leadsCount === 0) {
    await prisma.lead.createMany({
      data: [
        {
          name: 'João Silva Tech ME',
          document: '12.345.678/0001-90',
          certificateType: 'A1',
          phone: '(11) 98888-7777',
          email: 'contato@joaosilva.com.br',
          origin: 'Google Ads',
          status: 'Aguardando Documentação',
          expirationDate: new Date('2025-05-20'),
        },
        {
          name: 'Maria Oliveira CPF',
          document: '123.456.789-00',
          certificateType: 'A3',
          phone: '(21) 97777-6666',
          email: 'maria.oliveira@gmail.com',
          origin: 'Indicação',
          status: 'Agendado',
          expirationDate: new Date('2025-10-15'),
        }
      ]
    })
    console.log('Added initial leads.')
  }

  console.log('Seed finished successfully.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Seed error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
