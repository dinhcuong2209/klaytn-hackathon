import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { LogService } from 'src/commons/logging/logger.service';
import { CreateConcertDto, UpdateConcertDto } from './dto/concert.dto';
import { Concert } from './model';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  Message,
  CONCERT_BASE_URL,
  REMOVED_NUMBER,
} from './constant';
import { PaginationQuery } from 'src/commons/dto/common.dto';
import { ContractService } from '../contract/service';

@Injectable()
export class ConcertService {
  constructor(
    private myLogger: LogService,
    @InjectModel(Concert.name) private concertModel: Model<Concert>,
    private contractService: ContractService,
  ) {
    this.myLogger.setContext(ConcertService.name);
  }

  async create(data: CreateConcertDto) {
    const concert = await this.contractService.createConcert(
      data.name,
      data.symbol,
    );
    const address = concert.logs[0].data.replace(REMOVED_NUMBER, '');
    await this.contractService.createTicket(
      address,
      data.price,
      `${CONCERT_BASE_URL}${address}`,
    );
    return await this.concertModel.create({
      ...data,
      address,
    });
  }

  async findAll(query: PaginationQuery) {
    const page = Number(query.page) || DEFAULT_PAGE;
    const pageSize = Number(query.pageSize) || DEFAULT_PAGE_SIZE;
    const skip = (page - 1) * pageSize;
    let findOptions: any = {
      isActive: true,
    };
    if (query.keyword) {
      findOptions = {
        $or: [
          {
            name: { $regex: query.keyword, $options: 'i' },
          },
          {
            location: { $regex: query.keyword, $options: 'i' },
          },
        ],
      };
    }
    let orderOptions: any = { createdAt: 'desc' };
    if (query.order) {
      orderOptions = { [query.order]: query.orderBy };
    }

    const [items, totalItems] = await Promise.all([
      this.concertModel
        .find(findOptions)
        .sort(orderOptions)
        .skip(skip)
        .limit(pageSize),
      this.concertModel.find(findOptions).count(),
    ]);
    return {
      items,
      metadata: {
        page,
        totalPage: Math.ceil(totalItems / pageSize),
        totalItems,
      },
    };
  }

  async findOne(id: string) {
    const findCondition: any = {};
    if (mongoose.isValidObjectId(id)) {
      findCondition['_id'] = id;
    } else {
      findCondition['address'] = id;
    }
    const concert = await this.concertModel.find(findCondition);
    return concert.length ? concert[0] : null;
  }

  async update(id: string, payload: UpdateConcertDto) {
    await this.getOrThrowErrorIfConcertNotExist(id);
    return this.concertModel.findByIdAndUpdate(id, payload, { new: true });
  }

  async inactiveConcert(id: string) {
    await this.getOrThrowErrorIfConcertNotExist(id);
    return this.concertModel.updateOne({ _id: id }, { isActive: false });
  }

  // helper region
  private async getOrThrowErrorIfConcertNotExist(id: string) {
    const concertInfo = await this.concertModel.findById(id);
    if (!concertInfo) {
      throw new BadRequestException(Message.Error.ConcertNotExist);
    }
    return concertInfo;
  }
  // end region
}
