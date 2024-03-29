import { Post } from '@/lib/types'
import React from 'react'
import PostCard from './PostCard';

interface PostsProps {
  posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {

  return (
    <div className='flex flex-col gap-y-4 px-8'>
      <h2 className="text-xl text-slate-900 dark:text-white font-semibold ml">Posts</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 gap-y-6 justify-items-center'>
        {posts.length > 0 ?
          posts.map((post) => (
            <PostCard key={post._id} post={post} />
          )) : <p className='text-slate-900 dark:text-white font-semibold'>No posts found.</p>}
      </div>
    </div>
  )
}

export default Posts