import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React, { useState } from 'react'
import landingImage from '../../public/landingImage.svg'
import { Button } from "@/components/ui/button"
import { useFormik } from 'formik'
import axios from 'axios'
import { JwtPayload, jwtDecode } from 'jwt-decode';

const ProfileCard = () => {

  const accessToken = localStorage.getItem('accessToken');

  // Decode the JWT token
  const user: any = jwtDecode(accessToken ? accessToken : 'token');

  // Accessing properties
  // if (user && typeof user[0] === 'object') {
  //   const userData = user[0]; // Access the user data stored with key '0'
  //   console.log("User ID: ", userData._id);
  //   console.log("Name: ", userData.name);
  //   console.log("Username: ", userData.username);
  //   console.log("Email: ", userData.email);
  //   // Access other properties as needed
  // } else {
  //   console.log("User data not found in the token.");
  // }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-6 gap-y-6 w-[300px]">
      <div className="flex flex-col items-center gap-y-1">
        <div className='w-28 h-28 bg-black rounded-full shadow-lg relative overflow-hidden'>
          <Image src={landingImage} alt='profile' className="absolute top-0 left-0 w-full h-full object-cover" />
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user && typeof user[0] === 'object' ? user[0].name : 'User Name'}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user && typeof user[0] === 'object' ? user[0].username : 'Username'}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user && typeof user[0] === 'object' ? user[0].email : 'Email'}
        </span>
        <p className='text-md text-gray-600 text-center mx-auto max-w-72 dark:text-gray-200'>
          There is no bio yet.
        </p>
      </div>

    </div>
  )
}

export default ProfileCard