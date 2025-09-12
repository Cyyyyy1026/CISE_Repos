import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './create-book.dto';
import { error } from 'console';
@Controller('api/books') // 定义路由前缀
export class BookController {
  constructor(private readonly bookService: BookService) {}
  // 测试路由
  @Get('/test')
  test() {
    return this.bookService.test();
  }
  // 查询所有图书
  @Get('/')
  async findAll() {
    try {
      return this.bookService.findAll();
    } catch {
      // 捕获异常，返回404错误
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No Books found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
  // 根据ID查询单本图书
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      return this.bookService.findOne(id);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No Book found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
  // 创建新图书
  @Post('/')
  async addBook(@Body() createBookDto: CreateBookDto) {
    try {
      await this.bookService.create(createBookDto);
      return { message: 'Book added successfully' };
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to add this book',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
  // 根据ID更新图书
  @Put('/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() createBookDto: CreateBookDto,
  ) {
    try {
      await this.bookService.update(id, createBookDto);
      return { message: 'Book updated successfully' };
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update this book',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
  // 根据ID删除图书
  @Delete('/:id')
  async deleteBook(@Param('id') id: string) {
    try {
      return await this.bookService.delete(id);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No such a book',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
}