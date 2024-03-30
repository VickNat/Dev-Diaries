'use client'

import Image from "next/image";
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import LandingSection from "@/components/LandingSection";
import EditorPickSection from "@/components/EditorPickSection";
import { Post } from '@/lib/types';
import Posts from "@/components/Posts";
import AllPosts from "@/components/AllPosts";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://dev-diaries-backend.onrender.com/blog`)
        const data = response.data
        // console.log("Posts: ", data);

        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPosts()
  }, [])

  // console.log("Posts: ", posts);
  return (
    <main className="min-h-screen md:py-8 dark:bg-darkPrimary flex flex-col gap-y-14">
      <LandingSection />
      {
        posts ? <AllPosts posts={posts} /> : (
          <div className='self-center flex flex-col gap-y-4 px-8 max-w-[1200px]'>
            <h2 className="text-xl self-center text-slate-900 dark:text-white font-semibold">Posts</h2>
            <div className='flex flex-wrap justify-center items-center gap-10'>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        )
      }
      <EditorPickSection />
    </main>
  );
}
