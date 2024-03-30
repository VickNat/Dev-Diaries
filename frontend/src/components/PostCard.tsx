import Image from 'next/image'
import React, { useEffect } from 'react'
import cardImage from '../../public/BackgroundImageSection.svg'
import landingImage from '../../public/landingImage.svg'
import axios from 'axios'
import Link from 'next/link'
import { Post } from '@/lib/types'

interface PostProps {
  post: any
}

const PostCard: React.FC<PostProps> = ({ post }) => {

  // console.log("Post: ", post);

  return (
    <Link href={`/blog/${post._id}`} className="hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer p-3 w-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {
        post?.imagePath ? (
          <div className='relative w-full h-40 overflow-hidden rounded-lg' >
            <img src={`https://dev-diaries-backend.onrender.com/${post.imagePath}`} className='absolute top-0 left-0 w-full h-full object-cover' alt="Blog" />
          </div>
        ) : (
          <div className='relative w-full h-40 overflow-hidden rounded-lg' >
            <Image src={cardImage} alt='' className='absolute top-0 left-0 w-full h-full object-cover' />
          </div>
        )
      }

      <div className="my-4 flex flex-col gap-y-2">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.headline}
        </h5>
        <div className='flex items-center gap-x-3 md:gap-x-4'>
          <div className='md:w-14 md:h-14 w-12 h-12 bg-black rounded-full relative overflow-hidden'>
            <Image src={landingImage} alt='' className='absolute top-0 left-0 w-full h-full object-cover' />
          </div>
          <p className='text-sm text-slate-400'>{post.postedOn.substring(0, 10)}</p>
        </div>
      </div>
    </Link>
  )
}

export default PostCard