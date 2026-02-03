import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function test() {
  console.log('Testing connection...')
  try {
    const result = await prisma.$queryRaw`SELECT 1 as result`
    console.log('Connection success:', result)
  } catch (error) {
    console.error('Connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test()
