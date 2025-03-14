import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient()
const rn = new Date()
async function main() {
    for (let i = 0; i < 5; i++) {
        await prisma.concert.create({
            data: {
                artist: faker.person.firstName(),
                startTime: faker.date.future(),
                duration: faker.number.int({ min: 60, max: 180 })
            }
        })

    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })