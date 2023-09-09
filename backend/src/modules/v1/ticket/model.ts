import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchemaWithTimestamps } from 'src/commons/ultis/base.schema';
import { Concert } from '../concert/model';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({
  collection: 'ticket',
  timestamps: true,
})
export class Ticket extends BaseSchemaWithTimestamps {
  @Prop({ type: String })
  concertAdd: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Concert' })
  concert: Concert;

  @Prop({ type: String })
  walletAdd: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
