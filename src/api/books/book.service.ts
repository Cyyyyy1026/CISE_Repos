import { Injectable } from '@nestjs/common';
import { Book } from './book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './create-book.dto';
@Injectable()
export class BookService {
  // 注入Book模型
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
  // 测试方法
  test(): string {
    return 'book route testing';
  }
  // 查询所有图书
  async findAll(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }
  // 根据ID查询单本图书
  async findOne(id: string): Promise<Book | null> {
    return await this.bookModel.findById(id).exec();
  }
  // 创建新图书
  async create(createBookDto: CreateBookDto) {
    return await this.bookModel.create(createBookDto);
  }
  // 根据ID更新图书
  async update(id: string, createBookDto: CreateBookDto) {
    return await this.bookModel.findByIdAndUpdate(id, createBookDto).exec();
  }
  // 根据ID删除图书
  async delete(id: string) {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    return deletedBook;
  }
}