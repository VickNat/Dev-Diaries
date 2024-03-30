import React from 'react'
import EditorPickCard from './EditorPickCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const EditorPickSection = () => {
  return (
    <div className='mx-auto flex flex-col gap-y-5 max-w-screen-xl'>
      <h2 className="text-xl text-slate-900 dark:text-white font-semibold ml">Editor&apos;s Pick</h2>
      <Carousel className='w-[340px] md:w-auto max-w-screen-lg'>
        <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <EditorPickCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <EditorPickCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <EditorPickCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <EditorPickCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <EditorPickCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <EditorPickCard />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default EditorPickSection