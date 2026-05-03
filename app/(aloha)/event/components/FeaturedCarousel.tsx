"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { MapPin } from "lucide-react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

type EventType = {
  id: string
  title: string
  address: string
  category: string
    coverImageUrl: string | null
  startDate: Date
}

interface FeaturedCarouselProps {
  events: EventType[]
}

export function FeaturedCarousel({
  events,
}: FeaturedCarouselProps) {

  const plugin = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
    })
  )

  return (
    <div className="w-full max-w-[1400px] mx-auto">

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
      >

        <CarouselContent className="-ml-2 md:-ml-4">

          {events.map((event) => {

            const date = new Date(event.startDate)

            return (
              <CarouselItem
                key={event.id}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/1"
              >

                <section className="relative w-full h-72 md:h-[450px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group">

                  <img
                    src={event.coverImageUrl || "/benner.png"}
                    alt={event.title}
                    
                    className="object-cover group-hover:scale-105 w-full h-full transition-transform duration-1000"
                    
                  />

                  {/* DATA */}
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-3 md:p-5 rounded-2xl md:rounded-[1.5rem] flex flex-col items-center min-w-[50px] md:min-w-[70px] shadow-xl z-10">

                    <span className="text-[10px] md:text-xs font-black text-blue-600 uppercase">
                      {date.toLocaleDateString("pt-BR", {
                        month: "short",
                      })}
                    </span>

                    <span className="text-xl md:text-3xl font-black text-zinc-900 leading-none">
                      {date.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                      })}
                    </span>

                  </div>

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-12">

                    <div className="flex items-center gap-2 mb-2 md:mb-4">

                      <span className="px-3 py-1 bg-blue-600 rounded-full text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">
                        {event.category}
                      </span>

                      <span className="text-white/60 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                        Destaque
                      </span>

                    </div>

                    <h2 className="text-white text-3xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] italic drop-shadow-2xl max-w-4xl">
                      {event.title}
                    </h2>

                    <p className="text-white/80 text-xs md:text-base mt-4 md:mt-6 font-bold flex items-center gap-2 uppercase tracking-tight">
                      <MapPin className="size-3 md:size-5 text-blue-400" />
                      {event.address}
                    </p>

                  </div>

                </section>

              </CarouselItem>
            )
          })}

        </CarouselContent>

      </Carousel>

      {/* INDICADORES */}
      <div className="flex justify-center gap-2 mt-6">

        {events.map((_, i) => (
          <div
            key={i}
            className="h-1.5 w-6 md:w-10 rounded-full bg-zinc-200 overflow-hidden"
          >
            <div className="h-full bg-zinc-400 w-0 group-active:w-full transition-all duration-[4000ms]" />
          </div>
        ))}

      </div>

    </div>
  )
}