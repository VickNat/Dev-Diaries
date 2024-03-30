import React, { useEffect, useState } from 'react'
import ThemeToggler from './ThemeToggler'
import Link from 'next/link'
import Image from 'next/image'
import logoLight from '../../public/Logo Light.svg';
import logoDark from '../../public/Logo Dark.svg';
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import landingImage from '../../public/landingImage.svg'
import { CiLogout } from "react-icons/ci";
import axios from 'axios';


const Header = () => {
  const router = useRouter()

  let accessToken = null

  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken')
  }

  let user: any = null

  if (accessToken) {
    user = jwtDecode(accessToken);
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  // console.log("User Header", user)
  // console.log("AccessTon", accessToken)


  return (
    <nav className=" bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-slate-900 sticky top-0 z-10 shadow-md shadow-blue-200 dark:shadow-blue-800 mb-5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/" className="flex items-center">
          {
            <Image
              src={logoLight}
              alt="logo"
              width={35}
              height={35}
              className="dark:hidden"
            />
          }
          {
            <Image
              src={logoDark}
              alt="logo"
              width={35}
              height={35}
              className="hidden dark:block"
            />
          }
        </Link>
        <div className="flex items-center lg:order-2">
          <div
            className="text-gray-800 dark:text-white  font-medium rounded-lg text-sm dark:hover:bg-darkSecondary focus:outline-none "
          >
            <ThemeToggler />
          </div>
          {accessToken ? (
            <>
              <button
                onClick={async () => {
                  try {
                    let refreshToken = null

                    if (typeof window !== 'undefined') {
                      refreshToken = localStorage.getItem('refreshToken')
                    }
                    await axios.post('https://dev-diaries-backend.onrender.com/user/logout', {
                      refreshToken: refreshToken
                    })

                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('accessToken')
                      localStorage.removeItem('refreshToken')
                    }

                    router.push('/signin')
                    // window.location.reload()
                  } catch (error) {
                    console.log(error)
                  }
                }}
                className="cursor-pointer text-gray-800 dark:text-white hover:bg-gray-50  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none "
              >
                <CiLogout />
              </button>
              <Link href={`/profile`}>
                <Avatar>
                  <AvatarImage src={landingImage} alt="Avatar" />
                  <AvatarFallback>{user?.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-gray-800 dark:text-white hover:bg-gray-50  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none "
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-white bg-blue-700 hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
              >
                Get started
              </Link>
            </>
          )}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${isOpen ? 'block' : 'hidden'
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link
                href="/"
                className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="block py-2 pr-4 pl-3 text-gray-800 rounded lg:bg-transparent lg:text-gray-800 lg:p-0 dark:text-white"
              >
                Blogs
              </Link>
            </li>
            {
              accessToken ? (
                <li>
                  <Link
                    href="/blog/create"
                    className="block py-2 pr-4 pl-3 text-gray-800 rounded lg:bg-transparent lg:text-gray-800 lg:p-0 dark:text-white"
                  >
                    Create
                  </Link>
                </li>
              ) : null
            }
          </ul>
        </div>
      </div>
    </nav >
  )
}

export default Header