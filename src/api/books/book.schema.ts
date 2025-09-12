import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// 定义Book文档类型
export type BookDocument = HydratedDocument<Book>;
@Schema()
export class Book {
  @Prop({ required: true }) // 标题为必填项
  title: string;
  @Prop({ required: true }) // ISBN为必填项
  isbn: string;
  @Prop({ required: true }) // 作者为必填项
  author: string;
  @Prop() // 描述为可选项
  description: string;
  @Prop({ type: Date }) // 出版日期为日期类型
  published_date: Date;
  @Prop() // 出版商为可选项
  publisher: string;
  @Prop({ type: Date, default: Date.now }) // 更新日期默认为当前时间
  updated_date: Date;
}
// 创建Book模式
export const BookSchema = SchemaFactory.createForClass(Book);