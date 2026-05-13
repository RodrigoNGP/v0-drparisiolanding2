'use client'

import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

interface LipoHDFeaturedCardProps {
  onBookClick?: () => void
}

export function LipoHDFeaturedCard({ onBookClick }: LipoHDFeaturedCardProps) {
  return (
    <div className="w-full bg-gradient-to-br from-[#FF6B6B] to-[#FF5252] rounded-2xl overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8 lg:p-10">
        {/* Left Content */}
        <div className="flex flex-col justify-center text-white space-y-4 md:space-y-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-xs md:text-sm font-semibold uppercase tracking-wider">Destaque</span>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-balance">
              Lipo HD
            </h3>
            <p className="text-sm md:text-base lg:text-lg font-light text-white/90">
              Lipoaspiração de Alta Definição
            </p>
          </div>

          <p className="text-sm md:text-base text-white/85 leading-relaxed">
            Procedimento avançado que combina tecnologia de ponta com técnicas precisas para remover gordura e criar definição muscular natural. Resultados que impressionam.
          </p>

          <ul className="space-y-2 text-xs md:text-sm">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Alta Definição Muscular
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Resultados Naturais
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Recuperação Rápida
            </li>
          </ul>

          <Button
            onClick={onBookClick}
            className="bg-white hover:bg-white/90 text-[#FF6B6B] font-bold px-6 md:px-8 py-2.5 md:py-3 rounded-lg transition-all duration-200 w-fit"
          >
            Agendar Consulta
          </Button>
        </div>

        {/* Right Image */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src="/images/lipo-hd.jpg"
            alt="Lipo HD"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}
