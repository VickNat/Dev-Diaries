import Image from 'next/image'
import React from 'react'
import landingImage from '../../public/landingImage.svg'

const LandingCard = () => {
  return (
    <div className='bg-white dark:bg-[#181A2A] dark:shadow-blue-800 shadow-lg shadow-blue-400 md:w-5/12 w-11/12 rounded-2xl px-4 py-8 flex flex-col gap-y-8'>
      <p className='bg-blue-100 text-blue-500 dark:bg-blue-600 dark:text-white font-semibold py-1 px-4 max-w-28 rounded-lg'>
        Technology
      </p>

      <h2 className='md:text-3xl text-2xl font-semibold text-black dark:text-white'>
        The Impact of Technology on the Workplace: How Technology is Changing
      </h2>

      <div className='flex items-center gap-x-3 md:gap-x-4'>
        <div className='md:w-14 md:h-14 w-12 h-12 bg-black rounded-full relative overflow-hidden'>
          <Image src={landingImage} alt='' className='absolute top-0 left-0 w-full h-full object-cover' />
        </div>
        <p className='text-sm text-slate-400'>Nate</p>
      </div>
    </div>

  )
}

export default LandingCard