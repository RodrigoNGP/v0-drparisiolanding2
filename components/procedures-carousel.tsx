"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import TextImageRevealSlider from "@/components/text-image-reveal-slider"
import WhatsAppIcon from "@/components/whatsapp-icon"

const procedures = [
  {
    id: 1,
    title: "Rinoplastia",
    description:
      "A Rinoplastia é um procedimento cirúrgico que visa melhorar a estética e a harmonia do nariz, preservando ou aperfeiçoando sua função respiratória.",
    image: "/rinoplastia-depois-resultado-cirurgia-nariz.jpg",
  },
  {
    id: 2,
    title: "Lipoaspiração",
    description:
      "A Lipoaspiração é uma técnica cirúrgica que remove gordura localizada de áreas específicas do corpo, proporcionando contornos mais harmoniosos e definidos.",
    image: "/lipoaspiracao-resultado-contorno-corporal.jpg",
  },
  {
    id: 3,
    title: "Prótese de Mama",
    description:
      "A cirurgia de Prótese de Mama aumenta o volume e melhora o formato dos seios, proporcionando maior autoestima e confiança à paciente.",
    image: "/protese-mama-resultado-aumento-seios.jpg",
  },
]

export default function ProceduresCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProcedure = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % procedures.length)
  }

  const currentProcedure = procedures[currentIndex]

  return (
    <div className="relative">
      <div key={currentProcedure.id} className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <TextImageRevealSlider
            title={currentProcedure.title}
            description={currentProcedure.description}
            image={currentProcedure.image}
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <h4 className="text-2xl font-bold text-gray-900">{currentProcedure.title}</h4>
          <p className="text-gray-700 leading-relaxed">{currentProcedure.description}</p>
          <Button
            className="!bg-primary !text-white hover:!bg-primary/90 text-white px-6 py-2 rounded-full flex items-center gap-2"
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send/?phone=5581991152114&text&type=phone_number&app_absent=0",
                "_blank",
              )
            }
          >
            <WhatsAppIcon className="w-4 h-4" />
            Agendar Consulta
          </Button>
        </div>
      </div>

      <button
        onClick={nextProcedure}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-primary hover:bg-primary/90 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
        aria-label="Próximo procedimento"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="flex justify-center mt-8 space-x-2">
        {procedures.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-primary scale-110" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir para procedimento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
