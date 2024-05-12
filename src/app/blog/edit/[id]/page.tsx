"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const editBlog = async (
  title: string | undefined,
  content: string | undefined,
  authorId: number | undefined,
  id: number | undefined
) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, authorId, id }),
  });
};

const getBlogById = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  console.log(data);
  return data.blog;
};

const EditPost = ({ params }: { params: { id: number } }) => {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await editBlog(
      titleRef.current?.value,
      contentRef.current?.value,
      1,
      params.id
    ); //authorId: 1

    router.push("/blog/create");  
    // ここ変えれば元に戻る
    router.refresh();
  };

  useEffect(() => {
    console.log(params.id);
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && contentRef.current) {
          titleRef.current.value = data.title;
          contentRef.current.value = data.content;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full py-5 flex items-center justify-between">
          <h1 className="text-5xl font-bold flex-grow text-center">
            edit Blog
          </h1>
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
            修正投稿
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;