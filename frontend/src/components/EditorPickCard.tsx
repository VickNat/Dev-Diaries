import React from 'react'
import { Badge } from "@/components/ui/badge"

const EditorPickCard = () => {
  return (
    <div className="flex flex-col justify-end bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply h-80 w-80 rounded-md text-white p-4 shadow-md cursor-pointer">
      <div className='self-end'>
        <Badge variant="outline" className='text-slate-100 border-none bg-slate-500 bg-opacity-40 p-2 rounded-lg'>Badge</Badge>
      </div>
      <div className='mt-auto'>
        <h3 className='text-xl font-semibold'>Title</h3>
        <p className='text-sm text-slate-100 font-light w-9/12'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at arcu sem. Vestibulum eget vestibulum odio. Donec nec nunc ac elit cursus tincidunt. </p>
      </div>
    </div>
  )
}

export default EditorPickCard