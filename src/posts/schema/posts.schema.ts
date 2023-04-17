import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PostMessage {
  @Prop()
  title: string;

  @Prop()
  message: string;

  @Prop()
  creator: string;

  @Prop()
  tags: string[];

  @Prop()
  selectedFile: string;

  @Prop({ default: 0 })
  likeCount: Number;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const PostMessageSchema = SchemaFactory.createForClass(PostMessage);
