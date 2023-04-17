import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostMessageSchema } from './schema/posts.schema';
import { PostsService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PostMessage', schema: PostMessageSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
