"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Phone, Mail, Clock, Award, Users, Shield, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import WhatsAppIcon from "@/components/whatsapp-icon"
import { BookingModal } from "@/components/booking-modal"

export default function DrGersonParisioLanding() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [procedureIndex, setProcedureIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [stats, setStats] = useState({ years: 0, patients: 0, satisfaction: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const statsRef = useRef<HTMLElement>(null)
  const proceduresRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateCounters()
        }
      },
      { threshold: 0.5 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCounters = () => {
    const duration = 1000
    const fps = 60
    const frames = (duration / 1000) * fps
    const targets = { years: 20, patients: 5000, satisfaction: 100 }

    let frame = 0
    const interval = setInterval(() => {
      frame++
      const progress = frame / frames
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setStats({
        years: Math.round(easeOut * targets.years),
        patients: Math.round(easeOut * targets.patients),
        satisfaction: Math.round(easeOut * targets.satisfaction),
      })

      if (frame >= frames) {
        clearInterval(interval)
        setStats(targets)
      }
    }, 1000 / fps)
  }

  const testimonials = [
    {
      name: "Maria Bezerra",
      role: "Paciente",
      content:
        "Sem sombra de dúvidas, o melhor do Recife! Você passa confiança a cada paciente. Eu sou prova viva disso. Estava muito nervosa no dia da minha cirurgia, mas você chegou e me deixou muito tranquila.",
      rating: 5,
    },
    {
      name: "Fernanda Almeida",
      role: "Paciente",
      content:
        "Gratidão define! Obrigada Dr. Gerson por todo o cuidado, atenção e profissionalismo desde o primeiro atendimento. Do pré ao pós-operatório, me senti segura, acolhida e orientada em cada etapa da minha cirurgia de abdominoplastia com lipo.",
      rating: 5,
    },
    {
      name: "Jacqueline Bastos",
      role: "Paciente",
      content:
        "É verdade! Nos sentimos únicas mesmo! O bom tratamento e cuidado vai desde a recepção até a equipe de cirurgia. Você é um querido, Dr.! Extremamente humano, paciente e competente. Deixo meu testemunho aqui para que outras vejam e se sintam seguras de que estão em excelentes mãos. Pré e pós-operatório com toda assistência e carinho. Uma experiência que quero viver novamente em breve!",
      rating: 5,
    },
    {
      name: "Ana Claudia Medeiros",
      role: "Paciente",
      content:
        "Gratidão define! Obrigada Dr. Gerson por todo o cuidado, atenção e profissionalismo desde o primeiro atendimento. Do pré ao pós-operatório, me senti segura, acolhida e orientada em cada etapa da minha cirurgia de abdominoplastia com lipo. O resultado vai muito além da estética: é autoestima, leveza e confiança retomadas. Obrigada por transformar não só corpos, mas vidas! Indico de olhos fechados!",
      rating: 5,
    },
    {
      name: "Sandra Quirino",
      role: "Paciente",
      content: "Um dos melhores cirurgiões plásticos! Plástica realizada com muita perfeição e resultado impecável!",
      rating: 5,
    },
    {
      name: "Ericka Melo",
      role: "Paciente",
      content:
        "Um excelente profissional! O melhor, sem dúvida alguma! Tenho o maior prazer em dizer que fui remodelada pelas mãos do melhor: Dr. Gerson Parisio!",
      rating: 5,
    },
  ]

  const getTestimonialsPerPage = () => {
    return isMobile ? 1 : 2
  }

  const nextTestimonials = () => {
    const perPage = getTestimonialsPerPage()
    setCurrentTestimonialIndex((prev) => (prev + perPage >= testimonials.length ? 0 : prev + perPage))
  }

  const prevTestimonials = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + Math.ceil(testimonials.length / getTestimonialsPerPage())) % Math.ceil(testimonials.length / getTestimonialsPerPage()))
  }

  const procedures = [
    {
      name: "Lipo HD",
      image: "/images/lipo-hd.jpg",
      description: "Lipoaspiração com técnica de alta definição que esculpe o corpo com resultados profundos e naturais, realçando a musculatura.",
    },
    {
      name: "Lipoaspiração",
      image: "/images/lipoaspiracao.jpg",
      description: "Remoção de depósitos de gordura localizados para contorno corporal, melhorando a proporção e harmonia do corpo.",
    },
    {
      name: "Mastopexia",
      image: "/images/mastopexia.jpg",
      description: "Levantamento de mamas que combate a flacidez e o envelhecimento, restabelecendo a posição e forma ideais.",
    },
    {
      name: "Abdominoplastia",
      image: "/images/abdominoplastia.jpg",
      description: "Cirurgia estética que remove excesso de pele e gordura abdominal, definindo e tonificando a região.",
    },
    {
      name: "Implante de Prótese de Mama",
      image: "/images/implante-protese-mama.jpg",
      description: "Aumento de volume mamário com próteses de silicone ou solução salina, personalizadas para cada paciente.",
    },
    {
      name: "Ginecomastia",
      image: "/images/ginecomastia.jpg",
      description: "Redução do tecido mamário em homens, restaurando a estética e autoconfiança do paciente.",
    },
  ]

  const cardsPerSlide = isMobile ? 1 : 2
  const totalSlides = Math.ceil(procedures.length / cardsPerSlide)

  const handleNextProcedure = () => {
    setProcedureIndex((prev) => (prev + 1) % totalSlides)
  }

  const handlePrevProcedure = () => {
    setProcedureIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const prevProcedure = () => {
    setProcedureIndex((prev) => (prev - 1 + procedures.length) % procedures.length)
  }

  const getVisibleCount = () => {
    if (isMobile) return 1
    if (isTablet) return 2
    return 4
  }

  const getCardWidth = () => {
    const visibleCount = getVisibleCount()
    return 100 / visibleCount
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 xl:gap-12">
              <div className="flex items-center gap-2 md:gap-3">
                <img
                  src="/images/design-mode/logo.png"
                  alt="Logo Dr. Gerson Parisio"
                  className="w-8 h-8 md:w-10 md:h-10 object-contain"
                />
                <h1 className="text-lg md:text-2xl font-bold" style={{ color: "#0D0A0A" }}>
                  Gerson Parisio
                </h1>
              </div>
              <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
                <a href="#home" className="text-primary hover:text-secondary transition-colors text-sm">
                  Home
                </a>
                <a href="#sobre" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Dr. Gerson Parisio
                </a>
                <a href="#clinica" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  A Clínica
                </a>
                <a href="#procedimentos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Procedimentos
                </a>
                <a href="#tecnologias" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Tecnologias
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="px-3 py-2 xl:px-6 xl:py-2 rounded-full shadow-sm transition-all hover:scale-105 text-white flex items-center gap-1 xl:gap-2 text-sm"
                style={{ backgroundColor: "#191D25" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f1318")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#191D25")}
                onClick={() => setIsBookingModalOpen(true)}
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Agendar Consulta</span>
                <span className="sm:hidden">Agendar</span>
              </button>
              <button
                className="xl:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-primary hover:text-secondary transition-colors py-2 border-b border-border/50">
                Home
              </a>
              <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border/50">
                Dr. Gerson Parisio
              </a>
              <a href="#clinica" onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border/50">
                A Clínica
              </a>
              <a href="#procedimentos" onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border/50">
                Procedimentos
              </a>
              <a href="#tecnologias" onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors py-2">
                Tecnologias
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-br from-card to-background py-20 md:py-32 lg:py-40 bg-cover bg-[60%_center] md:bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/drgersonbg01.png)" }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/20 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-2 items-center">
            <div className="space-y-4 md:space-y-6 max-w-[70%] sm:max-w-[65%] md:max-w-[40%] lg:max-w-none pr-4 sm:pr-0 md:pr-8 lg:pr-0">
              <h2
                className="leading-tight font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white"
                style={{ fontFamily: "Moving, sans-serif" }}
              >
                Cirurgia Plástica com <span className="text-white">Cuidado</span>,{" "}
                <span className="text-white">Segurança</span> e <span className="text-white">Resultados Reais</span>
              </h2>
              <p className="text-base md:text-lg text-white/90 max-w-xs md:max-w-[280px] lg:max-w-md">
                Mais do que estética, é sobre transformar sua autoestima e caminhar ao seu lado em cada etapa do
                processo.
              </p>
              <Button
                size="lg"
                className="text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-base md:text-lg flex items-center gap-2 transition-transform hover:scale-105 w-full sm:w-auto"
                style={{ backgroundColor: "#191D25" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f1318")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#191D25")}
                onClick={() => setIsBookingModalOpen(true)}
              >
                <WhatsAppIcon className="w-5 h-5" />
                Agendar Consulta
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 md:py-20 bg-[rgba(21,22,24,1)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <Award className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-4" />
              <div className="text-5xl md:text-6xl font-bold text-white">+{stats.years}</div>
              <p className="text-lg md:text-xl text-white/90 font-medium">Anos de Experiência</p>
              <p className="text-sm text-white/70">Dedicados à excelência em cirurgia plástica</p>
            </div>

            <div className="text-center space-y-3">
              <Users className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-4" />
              <div className="text-5xl md:text-6xl font-bold text-white">+{stats.patients}</div>
              <p className="text-lg md:text-xl text-white/90 font-medium">Pacientes Atendidos</p>
              <p className="text-sm text-white/70">Vidas transformadas com cuidado e segurança</p>
            </div>

            <div className="text-center space-y-3">
              <Star className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-4 fill-white" />
              <div className="text-5xl md:text-6xl font-bold text-white">{stats.satisfaction}%</div>
              <p className="text-lg md:text-xl text-white/90 font-medium">Satisfação</p>
              <p className="text-sm text-white/70">Resultados que superam expectativas</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-12 md:py-20 text-black bg-[rgba(21,22,24,1)]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="space-y-6">
              <div className="relative w-full max-w-md mx-auto lg:mx-0">
                <img
                  src="/images/design-mode/dr-gerson-surgical.jpg.png"
                  alt="Dr. Gerson Parisio em cirurgia"
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[484px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Quem é o Dr. Gerson Parisio</h3>
              <div className="space-y-2">
                <p className="text-sm md:text-base text-white">
                  CRM 15093 | RQE 1980 (Cirurgia Plástica) | RQE 1979 (Cirurgia Gastroenterologia)
                </p>
              </div>
              <p className="leading-relaxed text-sm md:text-base text-white">
                Formado pela Universidade de Pernambuco (UPE), com residência em Cirurgia Gastroenterologia (HUOC) e
                Cirurgia Plástica (IMIP), dedico há mais de 20 anos minha carreira a transformar não apenas corpos, mas
                histórias de vida.
              </p>
              <div className="space-y-3 text-white">
                <p className="text-sm md:text-base">
                  Realizei milhares de cirurgias, mas o que me orgulha de verdade é o que cada paciente leva além do
                  resultado estético: confiança, autoestima e leveza para viver de forma mais plena.
                </p>
              </div>
              <p className="leading-relaxed text-sm md:text-base text-white">
                Sempre preferi o caminho da verdade, em vez de criar expectativas irreais. Meu trabalho é orientar,
                acolher e entregar o que é possível de forma ética e segura.
              </p>
              <blockquote className="border-l-4 border-white/30 pl-4 italic text-white/90">
                <p className="mb-2 text-sm md:text-base">
                  "Excelente profissional. Realiza acompanhamento após a cirurgia, deixando a paciente bem tranquila. E
                  o resultado é espetacular!"
                </p>
                <footer className="text-xs md:text-sm text-white/70">— Depoimento real de paciente</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Section */}
      <section id="clinica" className="py-12 md:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-[rgba(25,29,37,1)]">Sobre a Clínica</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                RioMar Trade Center, Torre 3, Sala 1106 – Pina – Recife – PE
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Um espaço moderno, seguro e acolhedor, onde cada paciente é recebido com privacidade e atenção.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                  <span className="text-xs md:text-sm">Segurança Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                  <span className="text-xs md:text-sm">Certificações</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                  <span className="text-xs md:text-sm">Atendimento Personalizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                  <span className="text-xs md:text-sm">Horários Flexíveis</span>
                </div>
              </div>
              <Button
                className="text-white px-4 md:px-6 py-2 rounded-full flex items-center gap-2 transition-transform hover:scale-105 w-full sm:w-auto"
                style={{ backgroundColor: "#191D25" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f1318")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#191D25")}
                onClick={() => setIsBookingModalOpen(true)}
              >
                <WhatsAppIcon className="w-4 h-4" />
                Agendar consulta
              </Button>
            </div>
            <div className="space-y-4">
              <img
                src="/images/design-mode/consultorio_1.jpg"
                alt="Recepção da clínica"
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/design-mode/consultorio_3.jpg"
                  alt="Consultório"
                  className="w-full h-28 sm:h-32 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="/images/design-mode/consultorio_4.jpg"
                  alt="Sala de espera"
                  className="w-full h-28 sm:h-32 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Procedures Section */}
      <section
        id="procedimentos"
        className="py-16 md:py-24 bg-gray-300 sm:bg-cover sm:bg-left md:bg-right lg:bg-center bg-no-repeat relative"
        style={{ backgroundImage: "var(--procedures-bg)" }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-transparent md:from-white/60 md:to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-right mb-12 md:mb-16 max-w-2xl ml-auto">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#191D25]">Procedimentos</h3>
            <p className="text-base md:text-lg text-[#191D25]/70">
              Cada paciente tem uma história única e cada procedimento é planejado de forma personalizada para seus objetivos estéticos e bem-estar.
            </p>
          </div>

          {/* Carousel Container - Centered on Mobile, Right Aligned on Desktop */}
          <div className="flex justify-center sm:justify-end">
            <div className="w-full px-2 sm:w-11/12 lg:w-7/12">
              <div className="relative px-0 sm:px-2 md:px-8 lg:px-12">
                <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${procedureIndex * 100}%)` }}
                  >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0 flex gap-1.5 sm:gap-2.5 md:gap-4 lg:gap-6 px-0 sm:px-1 md:px-2 lg:px-3 justify-center">
                      {procedures.slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide).map((procedure, index) => (
                          <div key={index} className="flex-1 min-w-0">
                            <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-md w-64 h-64 sm:w-auto sm:h-64 md:h-80 lg:h-96 xl:h-[420px] flex flex-col">
                              <div className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl flex-1 flex flex-col">
                                <img
                                  src={procedure.image || "/placeholder.svg"}
                                  alt={procedure.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Default gradient overlay with name - always visible */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-2 sm:p-3 md:p-5 lg:p-6">
                                  <h4 className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-xl text-center leading-tight">
                                    {procedure.name}
                                  </h4>
                                </div>
                                {/* Hover overlay with description and CTA */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-between p-2 sm:p-3 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl">
                                  <div className="flex-1 flex items-center justify-center">
                                    <p className="text-white text-xs sm:text-xs md:text-sm lg:text-base text-center font-light leading-relaxed">
                                      {procedure.description}
                                    </p>
                                  </div>
                                  <Button 
                                    onClick={() => setIsBookingModalOpen(true)}
                                    className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg text-xs sm:text-xs md:text-sm lg:text-base transition-all duration-200 w-full transform hover:scale-105"
                                  >
                                    Agendar Consulta
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevProcedure}
                  className="absolute left-0.5 sm:left-1 md:left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 sm:p-1.5 md:p-2.5 lg:p-3 shadow-lg transition-all duration-300 hover:scale-110 z-20"
                  aria-label="Procedimento anterior"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#191D25]" />
                </button>
                <button
                  onClick={handleNextProcedure}
                  className="absolute right-0.5 sm:right-1 md:right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 sm:p-1.5 md:p-2.5 lg:p-3 shadow-lg transition-all duration-300 hover:scale-110 z-20"
                  aria-label="Próximo procedimento"
                >
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#191D25]" />
                </button>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2 mt-4 sm:mt-5 md:mt-6 lg:mt-8">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setProcedureIndex(index)}
                      className={`h-1.5 sm:h-2 md:h-2.5 lg:h-3 rounded-full transition-all duration-300 ${
                        index === procedureIndex ? "bg-[#FF6B6B] w-4 sm:w-5 md:w-6 lg:w-8" : "bg-[#191D25]/30 w-1.5 sm:w-2 md:w-2.5 lg:w-3 hover:bg-[#191D25]/50"
                      }`}
                      aria-label={`Ir para slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#191D25]">FeedBacks</h3>
            <p className="text-base md:text-lg text-[#191D25]/70">O que nossos pacientes falam</p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {testimonials.length > 0 && (
                <>
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[currentTestimonialIndex]?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-[#191D25] italic mb-8 leading-relaxed">
                    "{testimonials[currentTestimonialIndex]?.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF6B6B]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm md:text-base font-bold text-[#FF6B6B]">
                        {testimonials[currentTestimonialIndex]?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-base md:text-lg text-[#191D25]">
                        {testimonials[currentTestimonialIndex]?.name}
                      </p>
                      <p className="text-sm md:text-base text-[#191D25]/70">
                        {testimonials[currentTestimonialIndex]?.role}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonials}
              className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 bg-[#191D25] hover:bg-[#0f1318] text-white p-3 md:p-4 rounded-full shadow-lg transition-colors z-10"
              disabled={currentTestimonialIndex === 0}
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <button
              onClick={nextTestimonials}
              className="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 bg-[#191D25] hover:bg-[#0f1318] text-white p-3 md:p-4 rounded-full shadow-lg transition-colors z-10"
              disabled={currentTestimonialIndex + 1 >= testimonials.length}
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-10 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentTestimonialIndex === index
                      ? "bg-[#FF6B6B] w-8"
                      : "bg-[#191D25]/30 w-3 hover:bg-[#191D25]/50"
                  }`}
                  aria-label={`Ir para testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-primary-foreground py-12 md:py-16 bg-[rgba(21,22,24,1)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-lg md:text-xl font-bold">Dr. Gerson Parisio</h4>
              <p className="text-xs md:text-sm text-primary-foreground/60">
                CNPJ: 62.820.226/0001-96
              </p>
              <p className="text-sm md:text-base text-primary-foreground/80">
                Cirurgia Plástica com segurança, cuidado e atenção aos detalhes.
              </p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h5 className="text-base md:text-lg font-semibold">Contato</h5>
              <div className="space-y-2 text-sm md:text-base text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a
                    href="https://api.whatsapp.com/send/?phone=5581991152114&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    (81) 99115-2114
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">contato@gersonparisio.com.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>RioMar Trade Center, Torre 3, Sala 1106 – Pina – Recife – PE</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h5 className="text-base md:text-lg font-semibold">Horário de Funcionamento</h5>
              <div className="space-y-2 text-sm md:text-base text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>Seg - Sex: 8h às 18h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>Sáb: 8h às 12h</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm"></div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  )
}
