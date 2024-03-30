import { Post } from '@/lib/types'
import React from 'react'
import PostCard from './PostCard';

interface PostsProps {
  posts: Post[];
}

const AllPosts: React.FC<PostsProps> = ({ posts }) => {

  return (
    <div className='flex flex-col gap-y-4 px-8 '>
      <h2 className="text-xl self-center text-slate-900 dark:text-white font-semibold">Posts</h2>
      <div className='flex flex-wrap justify-center items-center gap-10'>
        {posts.length > 0 ?
          posts.map((post) => (
            <PostCard key={post._id} post={post} />
          )) : <p className='text-slate-900 dark:text-white font-semibold'>No posts found.</p>}
      </div>
    </div>
  )
}

export default AllPosts