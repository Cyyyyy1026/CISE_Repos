import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from './BookCard';
import { Book } from './Book';
function ShowBookList() {
  // 初始化图书列表状态
  const [books, setBooks] = useState<[Book?]>([]);
  // 组件挂载时获取图书列表
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/books/')
      .then((res) => {
        return res.json();
      })
      .then((books) => {
        setBooks(books);
      })
      .catch((err) => {
        console.log('Error from ShowBookList: ' + err);
      });
  }, []);
  // 渲染图书列表（无图书时显示提示信息，否则渲染图书卡片）
  const bookList =
    books.length === 0
      ? 'there is no book record!'
      : books.map((book, k) => <BookCard book={book} key={k} />);
  return (
    <div className='ShowBookList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Books List</h2>
          </div>
          <div className='col-md-11'>
            {/* 跳转到创建图书页面的链接 */}
            <Link
              href='/create-book'
              className='btn btn-outline-warning float-right'
            >
              + Add New Book
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>
        {/* 渲染图书列表 */}
        <div className='list'>{bookList}</div>
      </div>
    </div>
  );
}
export default ShowBookList;