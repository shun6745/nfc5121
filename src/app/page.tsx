"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const postBlog = async (
  title: string | undefined,
  content: string | undefined,
  authorId: number | undefined
) => {
  const res = await fetch("http://localhost:3000/api/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, authorId }),
  });

  return res.json();
};

// eslint-disable-next-line @next/next/no-async-client-component
export default async function PostBlog() {
  //const PostBlog = () => { //アロー関数
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await postBlog(titleRef.current?.value, contentRef.current?.value, 1); //authorId: 1

    router.push("/blog/create");  
    // 5.11ここを/ だけから入れ替えた
    router.refresh();
    
  };

  return (
    <div>
      <div className="flex flex-col  items-center">
        <div className="w-full py-5 flex items-center justify-between">
          <h1 className="text-5xl font-bold flex-grow text-center">new Blog</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-2/3 pb-5">
          <input
            ref={titleRef}
            type="text"
            placeholder="タイトルを入力"
            className="border-2 border-gray-500 p-2 m-2"
          />
          <textarea
            ref={contentRef}
            placeholder="Blog内容を入力"
            className="border-2 border-gray-500 p-2 m-2"
          />
          <button className="m-auto px-5 py-1 border-2 rounded-lg text-green-800 border-green-700 bg-green-100">
            投稿
          </button>
        </form>
      </div>
    </div>
  );
}

//export default PostBlog;
