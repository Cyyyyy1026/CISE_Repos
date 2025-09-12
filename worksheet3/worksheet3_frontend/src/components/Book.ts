export type Book = {
    _id?: string;          // 图书ID（可选，由数据库自动生成）
    title?: string;        // 书名
    isbn?: string;         // ISBN编号
    author?: string;       // 作者
    description?: string;  // 描述
    published_date?: Date; // 出版日期
    publisher?: string;    // 出版商
    updated_date?: Date;   // 更新日期
};
// 定义默认空图书对象
export const DefaultEmptyBook: Book = {
    _id: undefined, 
    title: '', 
    isbn: '',
    author: '',
    description: '',
    published_date: undefined,
    publisher: '',
    updated_date: undefined,
}