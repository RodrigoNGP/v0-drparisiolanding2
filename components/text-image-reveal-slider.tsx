"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface TextImageRevealSliderProps {
  title?: string
  description?: string
  beforeImage?: string
  afterImage?: string
}

export default function TextImageRevealSlider({
  title = "Rinoplastia",
  description = "A Rinoplastia é um procedimento cirúrgico que visa melhorar a estética e a harmonia do nariz, preservando ou aperfeiçoando sua função respiratória.",
  beforeImage = "/lipo2.png",
  afterImage = "/lipo1.png",
}: TextImageRevealSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateSliderPosition(e.clientX)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    updateSliderPosition(e.touches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      e.preventDefault()
      updateSliderPosition(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const updateSliderPosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    }
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        ref={containerRef}
        className="relative w-full h-[400px] md:h-[500px] rounded-2xl shadow-lg overflow-hidden cursor-col-resize select-none"
      >
        {/* Before Image (Left/Base Layer) */}
        <div className="absolute inset-0">
          <img
            src={beforeImage || "/placeholder.svg"}
            alt={`Antes - ${title}`}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* After Image (Right/Overlay Layer) */}
        <div
          className="absolute inset-0 transition-all duration-75 ease-out"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <img
            src={afterImage || "/placeholder.svg"}
            alt={`Depois - ${title}`}
            className="w-full h-full object-cover pr-0"
            draggable={false}
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all duration-75 ease-out z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 cursor-col-resize flex items-center justify-center hover:scale-110 transition-transform"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          Antes
        </div>
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          Depois
        </div>
      </div>
    </div>
  )
}
