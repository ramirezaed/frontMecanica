"use client"

import Image from "next/image"
import { IconArrowRight, IconChevronRight } from "@/assets/icons"
import { useState } from "react"
import Link from "next/link"

const imagenes = ["/carrusel-inicio1.jpg","/carrusel-inicio2.jpg","/carrusel-inicio3.jpg"]

export default function CarruselInicio (){ //componente carrusel para el inicio
    const [currentIndex, setCurrentIndex] = useState(0)

    function handlePreviosClick() {
        const esPrimera = currentIndex === 0;
        setCurrentIndex(esPrimera ? imagenes.length - 1 : currentIndex -1)
    }

    function handleNextClick (){
        const esUltima = currentIndex === imagenes.length -1
        setCurrentIndex(esUltima? 0 : currentIndex + 1)
    }

    return(
        
        <div className="w-full bg-gray-400">
        <div className="w-full h-[558px] relative flex items-center justify-center">
          {imagenes.map((image, idx) => {
            return (
              <Image
                key={image + idx}
                src={image}
                alt={image}
                fill
                objectFit="cover"
                className={`transition-all ease-in-out duration-500 ${
                  currentIndex === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          })}
          <div className="flex flex-col w-[1200px] z-10">
            <h2 className="text-5xl font-bold text-white ">50-40% OFF</h2>
            <h4 className="text-2xl text-white ">Scaneo de vehiculo.</h4>
            <h5 className="text-xl text-white ">Todos los modelos</h5>
            <Link href="/turnos">
            <button className="w-32 h-10 rounded-md border border-white text-white mt-4 flex items-center justify-center gap-2">
              Pedi un turno <IconArrowRight className="w-5 h-5" />
            </button>
            </Link>
          </div>
          <div className="w-full p-16 absolute flex justify-between">
            <button
              className="bg-white shadow-black hover:shadow-xl flex justify-center items-center w-10 h-10 rounded-full"
              onClick={() => handlePreviosClick()}
            >
              <IconChevronRight className="text-gray-700 rotate-180 mr-0.5 hover:text-gray-400" />
            </button>
            <button
              className="bg-white shadow-black hover:shadow-xl flex justify-center items-center w-10 h-10 rounded-full"
              onClick={() => handleNextClick()}
            >
              <IconChevronRight className="text-gray-700 ml-0.5 hover:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    );

}
