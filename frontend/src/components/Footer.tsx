import React from 'react'
import logoLight from '../../public/Logo Light.svg'
import logoDark from '../../public/Logo Dark.svg'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-darkPrimary dark:bg-slate-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
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
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:underline me-4 md:me-6">
                Blogs
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://github.com/VickNat" className="hover:underline">
            Vick
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer