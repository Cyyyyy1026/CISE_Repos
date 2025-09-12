import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Book';
import Link from 'next/link';
function UpdateBookInfo() {
  // 初始化图书状态
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  // 获取路由参数（图书ID）
  const id = useParams<{ id: string }>().id;
  const router = useRouter(); // 获取路由导航对象
  // 组件挂载时获取当前图书信息
  useEffect(() => {
    fetch(`http://localhost:8082/api/books/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setBook(json);
      })
      .catch((err) => {
        console.log('Error from UpdateBookInfo: ' + err);
      });
  }, [id]);
  // 处理输入框变化
  const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };
  // 处理文本域变化（描述字段）
  const textAreaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };
  // 处理表单提交（更新图书信息）
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/books/${id}', {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(book)
    })
      .then((res) => {
        router.push(`/show-book/${id}`); // 更新后跳转到图书详情页面
      })
      .catch((err) => {
        console.log('Error from UpdateBookInfo: ' + err);
      });
  };
  return (
    <div className='UpdateBookInfo'>
      <div className='container'>
        <div className='row'>
          <div className='<div className='col-md-8 m-auto'>
            <br />
            {/* 返回图书列表链接 */}
            <Link href='/' className='btn btn-outline-warning float-left'>
              Show Book List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Book</h1>
            <p className='lead text-center'>Update Book's Info</p>
          </div>
        </div>
        <div className='col-md-8 m-auto'>
          {/* 图书编辑表单 */}
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                placeholder='Title of the Book'
                name='title'
                className='form-control'
                value={book.title}
                onChange={inputOnChange}
              />
            </div>
            <br />
            <div className='form-group'>
              <label htmlFor='isbn'>ISBN</label>
              <input
                type='text'
                placeholder='ISBN'
                name='isbn'
                className='form-control'
                value={book.isbn}
                onChange={inputOnChange}
              />
            </div>
            <br />
            <div className='form-group'>
              <label htmlFor='author'>Author</label>
              <input
                type='text'
                placeholder='Author'
                name='author'
                className='form-control'
                value={book.author}
                onChange={inputOnChange}
              />
            </div>
            <br />
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <textarea
                placeholder='Description of the Book'
                name='description'
                className='form-control'
                value={book.description}
                onChange={textAreaOnChange}
              />
            </div>
            <br />
            <div className='form-group'>
              <label htmlFor='published_date'>Published Date</label>
              <input
                type='text'
                placeholder='Published Date'
                name='published_date'
                className='form-control'
                value={book.published_date?.toString()}
                onChange={inputOnChange}
              />
            </div>
            <br />
            <div className='form-group'>
              <label htmlFor='publisher'>Publisher</label>
              <input
                type='text'
                placeholder='Publisher of the Book'
                name='publisher'
                className='form-control'
                value={book.publisher}
                onChange={inputOnChange}
              />
            </div>
            <br />
            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateBookInfo;