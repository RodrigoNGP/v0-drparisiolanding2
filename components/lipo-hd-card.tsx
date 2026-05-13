'use client'

import { Button } from '@/components/ui/button'
import { Zap, Sparkles, Award } from 'lucide-react'

interface LipoHDCardProps {
  onBookClick?: () => void
}

export function LipoHDCard({ onBookClick }: LipoHDCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF6B6B] via-[#FF8888] to-[#FF5252] shadow-2xl">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -ml-40 -mb-40"></div>
      </div>

      <div className="relative z-10 p-6 sm:p-8 md:p-10">
        {/* Header with badge */}
        <div className="flex items-start justify-between mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="text-xs sm:text-sm font-semibold text-white">Procedimento Premium</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Lipo HD</h2>
            <p className="text-white/90 text-sm sm:text-base">Esculpindo o corpo perfeito</p>
          </div>
          <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white/80" />
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="bg-white/15 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base mb-1">Precisão Máxima</h3>
                <p className="text-white/80 text-xs sm:text-sm">Tecnologia de alta definição para resultados precisos</p>
              </div>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base mb-1">Resultados Naturais</h3>
                <p className="text-white/80 text-xs sm:text-sm">Definição muscular sem excesso de intervenção</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/95 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
          A Lipoaspiração com tecnologia HD oferece esculptura corporal avançada, removendo gordura indesejada enquanto realça a musculatura natural, criando resultados sofisticados e harmoniosos.
        </p>

        {/* CTA Button */}
        <Button
          onClick={onBookClick}
          className="w-full bg-white text-[#FF6B6B] hover:bg-gray-100 font-bold py-3 sm:py-4 rounded-xl text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Agendar Consulta Premium
        </Button>

        {/* Footer text */}
        <p className="text-white/70 text-xs sm:text-sm text-center mt-4 sm:mt-6">
          Consulta com o Dr. Gerson • Resultados em 30 dias
        </p>
      </div>
    </div>
  )
}
