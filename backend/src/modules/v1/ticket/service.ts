import { Injectable } from '@nestjs/common';
import { LogService } from 'src/commons/logging/logger.service';
import { Ticket } from './model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../concert/constant';
import { PaginationQuery } from 'src/commons/dto/common.dto';
import { BuyTicketDto } from './dto/ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    private myLogger: LogService,
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
  ) {
    this.myLogger.setContext(TicketService.name);
  }

  async create(data: BuyTicketDto) {
    return this.ticketModel.create(data);
  }

  async findAll(query: PaginationQuery, id: string) {
    const page = Number(query.page) || DEFAULT_PAGE;
    const pageSize = Number(query.pageSize) || DEFAULT_PAGE_SIZE;
    const skip = (page - 1) * pageSize;
    const findOptions = { walletAdd: id };
    let queryOptions: any = {};
    if (query.keyword) {
      queryOptions = {
        $or: [
          {
            'concert.name': { $regex: query.keyword, $options: 'i' },
          },
          {
            'concert.location': { $regex: query.keyword, $options: 'i' },
          },
        ],
      };
    }

    let orderOptions: any = { createdAt: -1 };
    if (query.order) {
      const orderBy = query.orderBy === 'desc' ? -1 : 1;
      const order = `concert.${query.order}`;
      orderOptions = { [order]: orderBy };
    }
    const aggregateOptions = [
      {
        $match: findOptions,
      },
      {
        $group: {
          _id: '$concert',
          ticketId: { $first: '$_id' },
          concertAdd: { $first: '$concertAdd' },
          walletAdd: { $first: '$walletAdd' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: 'concert',
          localField: '_id',
          foreignField: '_id',
          as: 'concert',
        },
      },
      {
        $match: queryOptions,
      },
    ];
    const [items, totalItems] = await Promise.all([
      this.ticketModel.aggregate([
        ...aggregateOptions,
        {
          $sort: orderOptions,
        },
        {
          $limit: pageSize,
        },
        {
          $skip: skip,
        },
        { $unwind: { path: '$concert' } },
      ]),
      this.ticketModel.aggregate([...aggregateOptions, { $count: 'concert' }]),
    ]);
    return {
      items,
      metadata: {
        page,
        totalPage: Math.ceil(totalItems[0].concert / pageSize),
        totalItems: totalItems[0].concert,
        pageSize,
      },
    };
  }

  async findOne(id: string) {
    return this.ticketModel.findById(id).populate('concert');
  }
}
