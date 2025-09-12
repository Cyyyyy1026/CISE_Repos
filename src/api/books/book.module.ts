import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
@Module({
  imports: [
    // 注册Book模型到Mongoose模块
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController], // 声明控制器
  providers: [BookService], // 声明服务
})
export class BookModule {}