"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import TextImageRevealSlider from "./text-image-reveal-slider"
import WhatsAppIcon from "./whatsapp-icon"

interface Procedure {
  title: string
  description: string
  beforeImage: string
  afterImage: string
}

const procedures: Procedure[] = [
  {
    title: "Rinoplastia",
    description:
      "A Rinoplastia é um procedimento cirúrgico que visa melhorar a estética e a harmonia do nariz, preservando ou aperfeiçoando sua função respiratória. O resultado é um nariz mais harmonioso com o rosto.",
    beforeImage: "/narizantes.png",
    afterImage: "/narizdepois.png",
  },
  {
    title: "Lipoaspiração",
    description:
      "A Lipoaspiração remove gordura localizada de áreas específicas do corpo, proporcionando um contorno corporal mais definido e harmonioso. É ideal para quem busca eliminar gorduras resistentes à dieta e exercícios.",
    beforeImage: "/lipo2.png",
    afterImage: "/lipo1.png",
  },
  {
    title: "Prótese de Mama",
    description:
      "O aumento mamário com próteses de silicone proporciona volume e forma aos seios, melhorando a autoestima e a silhueta feminina. O procedimento é personalizado para cada paciente.",
    beforeImage: "/protese-mama-antes.jpg",
    afterImage: "/protese-mama-resultado-aumento-seios.jpg",
  },
]

export default function MedicalProceduresCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % procedures.length)
  }

  const currentProcedure = procedures[currentIndex]

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Slider Column */}
        <div className="order-1 lg:order-1">
          <TextImageRevealSlider
            title={currentProcedure.title}
            description={currentProcedure.description}
            beforeImage={currentProcedure.beforeImage}
            afterImage={currentProcedure.afterImage}
          />
        </div>

        {/* Text Column */}
        <div className="order-2 lg:order-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{currentProcedure.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{currentProcedure.description}</p>
            <button
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send/?phone=5581991152114&text&type=phone_number&app_absent=0",
                  "_blank",
                )
              }
              className="text-white px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105"
              style={{ backgroundColor: "#191D25" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f1318")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#191D25")}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Agendar Consulta
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 z-20"
        style={{ backgroundColor: "#191D25" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f1318")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#191D25")}
        aria-label="Próximo procedimento"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {procedures.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200`}
            style={{ backgroundColor: index === currentIndex ? "#191D25" : "#d1d5db" }}
            aria-label={`Ir para procedimento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
