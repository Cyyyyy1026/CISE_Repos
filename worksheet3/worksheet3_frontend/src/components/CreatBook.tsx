import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Book, DefaultEmptyBook } from "./Book";
const CreateBookComponent = () => {
  const navigate = useRouter(); // 获取路由导航对象
  // 初始化图书状态
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  // 处理输入框变化
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };
  // 处理表单提交
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单默认提交行为
    console.log(book);
    // 发送POST请求创建图书
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/books/', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(book)
    })
      .then((res) => {
        console.log(res);
        setBook(DefaultEmptyBook); // 重置表单
        navigate.push("/"); // 导航回主页
      })
      .catch((err) => {
        console.log('Error from CreateBook: ' + err);
      });
  };
  return (
    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            {/* 返回图书列表链接 */}
            <Link href="/" className="btn btn-outline-warning float-left">
              Show Book List
            </Link>
          </div>
          <div className="col-md-10 m-auto">
            <h1 className="display-4 text-center">Add Book</h1>
            <p className="lead text-center">Create new book</p>
            {/* 图书创建表单 */}
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="title"
                  className="form-control"
                  value={book.title}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="ISBN"
                  name="isbn"
                  className="form-control"
                  value={book.isbn}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className="form-control"
                  value={book.author}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Describe this book"
                  name="description"
                  className="form-control"
                  value={book.description}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="date"
                  placeholder="published_date"
                  name="published_date"
                  className="form-control"
                  value={book.published_date?.toString()}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Publisher of this Book"
                  name="publisher"
                  className="form-control"
                  value={book.publisher}
                  onChange={onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-warning btn-block mt-4 mb-4 w-100"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateBookComponent;