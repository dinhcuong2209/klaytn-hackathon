import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchemaWithTimestamps } from 'src/commons/ultis/base.schema';

export type ConcertDocument = HydratedDocument<Concert>;

@Schema({
  collection: 'concert',
  timestamps: true,
})
export class Concert extends BaseSchemaWithTimestamps {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  location: string;

  @Prop({ type: String })
  img: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Date })
  startTime: Date;

  @Prop({ type: Number })
  qty: number;

  @Prop({ type: String })
  symbol: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
