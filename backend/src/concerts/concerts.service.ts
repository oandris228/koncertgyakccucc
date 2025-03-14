import { Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { PrismaService } from 'src/prisma.service';
import { el } from '@faker-js/faker/.';

@Injectable()
export class ConcertsService {

  constructor(private readonly db: PrismaService) {}

  create(createConcertDto: CreateConcertDto) {

    const dateObject = new Date(createConcertDto.startTime);
    const rn = new Date();
    
    if (dateObject > rn) {
      return this.db.concert.create({
        data: {
          ...createConcertDto,
          startTime: dateObject,
          duration: +createConcertDto.duration
        }
      });
    } else {
      throw new Error("Your concert can't start in the past!")
    }
  }

  findAll() {
    return this.db.concert.findMany();
  }

  findOne(id: number) {
    return this.db.concert.findUnique({
      where: {id}
    });
  }

  //ew

  async update(id: number, updateConcertDto: UpdateConcertDto) {

    const old = await this.db.concert.findUnique({where: {id}});
    const rn = new Date();

    var dateObject = old?.startTime;

    if (updateConcertDto.startTime) {
      dateObject = new Date(updateConcertDto.startTime)
    }

    if (updateConcertDto.duration) {
      if (dateObject! > rn) {
        return this.db.concert.update({
          where: {id},
          data: {
            ...updateConcertDto,
            startTime: dateObject,
            duration: +updateConcertDto.duration
          }
        });
      } else {
        throw new Error("Your concert can't start in the past!")
      }
    } else {
      if (dateObject! > rn) {
        return this.db.concert.update({
          where: {id},
          data: {
            ...updateConcertDto,
            startTime: dateObject
          }
        });
      } else {
        throw new Error("Your concert can't start in the past!")
      }
    }
  }

  remove(id: number) {
    return this.db.concert.delete({where: {id}});
  }
}
