"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import WhatsAppIcon from "@/components/whatsapp-icon"
import { submitLead } from "@/app/actions/submit-lead"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 11) value = value.slice(0, 11)

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2")
    } else {
      value = value.replace(/^(\d*)/, "($1")
    }

    setPhone(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate phone has exactly 11 digits
    const digitsOnly = phone.replace(/\D/g, "")
    if (digitsOnly.length !== 11) {
      alert("Por favor, insira um telefone válido com 11 dígitos (DDD + número)")
      return
    }
    
    setIsSubmitting(true)

    try {
      // Submit to Google Sheets (don't block if it fails)
      await submitLead(name, phone)
    } catch (error) {
      console.error("Error submitting lead:", error)
    }

    // Format the message
    const message = `Olá, gostaria de agendar uma consulta.\n\nNome: ${name}\nTelefone: ${phone}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=5581991152114&text=${encodedMessage}&type=phone_number&app_absent=0`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    setIsSubmitting(false)
    // Close modal
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agendar Consulta</DialogTitle>
          <DialogDescription>
            Preencha seus dados abaixo para iniciar o agendamento pelo WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone / WhatsApp</Label>
            <Input
              id="phone"
              placeholder="(00) 00000-0000"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              required
              disabled={isSubmitting}
              minLength={15}
              title="Digite um telefone com DDD + 9 dígitos (11 números no total)"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#191D25] hover:bg-[#0f1318] text-white gap-2"
            disabled={isSubmitting}
          >
            <WhatsAppIcon className="w-4 h-4" />
            {isSubmitting ? "Enviando..." : "Enviar e Agendar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
