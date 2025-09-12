import React from 'react';
import { Book } from './Book';
import { useRouter } from 'next/navigation';
// 定义组件属性类型
interface IProp {
  book?: Book;
}
const BookCard = ({ book }: IProp) => {
  const router = useRouter(); // 获取路由导航对象
  // 若图书信息为空，返回null
  if (book == undefined) {
    return null;
  }
  // 点击卡片跳转到图书详情页面
  const onClick = () => {
    router.push(`/show-book/${book._id}`);
  };
  return (
    <div className='card-container' onClick={onClick}>
      {/* 图书封面图片 */}
      <img
        src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
        alt='Books'
        height={200}
      />
      {/* 图书信息描述 */}
      <div className='desc'>
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <p>{book.description}</p>
      </div>
    </div>
  );
};
export default BookCard;