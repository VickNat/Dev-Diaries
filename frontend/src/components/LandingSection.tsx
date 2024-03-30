import Image from 'next/image'
import React from 'react'
import landingImage from '../../public/landingImage.svg'
import LandingCard from './LandingCard'

const LandingSection = () => {
  return (
    <div className='relative mb-32 mx-10 md:mx-auto max-w-screen-xl flex flex-col'>
      <Image priority src={landingImage} alt='' className='w-full min-h-96 shadow-lg shadow-blue-200 dark:shadow-blue-800 rounded-xl' />
      <div className='absolute md:top-64 md:-left-64 top-52 w-full h-full flex justify-center items-center'>
        <LandingCard />
      </div>
    </div>
  )
}

export default LandingSection