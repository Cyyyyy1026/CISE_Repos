'use client' // 标记为客户端组件
import ShowBookList from "@/components/ShowBookList";
export default function Home() {
  return (
    <main>
      <ShowBookList /> {/* 引入图书列表组件 */}
    </main>
  );
}