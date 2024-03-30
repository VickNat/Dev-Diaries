import Image from 'next/image'
import React from 'react'
import landingImage from '../../public/BackgroundImageSection.svg'

const BlogsBackgroundImageSection = () => {
  return (
    <div className="flex flex-col justify-end bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-500 bg-blend-multiply rounded-md text-white p-4 shadow-md shadow-blue-400 dark:shadow-blue-700 cursor-pointer h-96 mx-2 md:mx-0 my-4">
      <p className='bg-blue-100 text-blue-500 dark:bg-blue-600 dark:text-white font-semibold py-1 px-4 max-w-28 rounded-lg'>
        Technology
      </p>

      <h2 className='md:text-3xl text-2xl font-semibold max-w-screen-md text-white'>
        The Impact of Technology on the Workplace: How Technology is Changing
      </h2>

      <div className='flex items-center gap-x-3 md:gap-x-4'>
        <div className='md:w-14 md:h-14 w-12 h-12 bg-black rounded-full relative overflow-hidden'>
          <Image src={landingImage} alt='' className='absolute top-0 left-0 w-full h-full object-cover' />
        </div>
        <p className='text-sm text-slate-200'>Nati.</p>
      </div>
    </div>
  )
}

export default BlogsBackgroundImageSection