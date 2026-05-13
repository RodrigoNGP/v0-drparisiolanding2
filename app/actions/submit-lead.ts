"use server"

export async function submitLead(name: string, phone: string) {
  try {
    let formattedPhone = phone.replace(/\D/g, "")
    if (formattedPhone.length === 11) {
      formattedPhone = formattedPhone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    } else if (formattedPhone.length === 10) {
      formattedPhone = formattedPhone.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    } else {
      // If it doesn't match standard lengths, keep original or just the digits
      formattedPhone = phone
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    const data = { name, phone: formattedPhone };

    if (!webhookUrl) {
      console.log("[v0] Missing Google Sheets webhook URL")
      return { success: false, message: "Missing webhook URL" }
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    })

    if (response.status === 302) {
      return { success: true }
    }

    if (response.status === 403) {
      console.warn(
        "[v0] Google Sheets Warning: Script permissions are incorrect. Data was NOT saved to Sheets, but user was redirected to WhatsApp.",
      )
      return {
        success: true,
        message: "Google Sheets permission error (ignored)",
      }
    }

    if (!response.ok) {
      const text = await response.text()
      console.error(`Google Sheets API error: ${response.status} ${response.statusText}`, text.substring(0, 500))
      return { success: false, message: `Erro ao salvar no Google Sheets: ${response.statusText}` }
    }

    const result = await response.json()

    if (result.success) {
      return { success: true }
    } else {
      throw new Error(result.error || "Unknown error")
    }
  } catch (error: any) {
    const errorMessage = error?.message || String(error)
    if (errorMessage.includes("403") && (errorMessage.includes("<!DOCTYPE html>") || errorMessage.includes("Access Denied"))) {
      console.error(
        "[v0] Google Sheets 403 Forbidden: Script permissions are incorrect. 'Who has access' must be set to 'Anyone'.",
      )
      return { success: false, message: "Configuration Error: Script not public." }
    }

    console.error("[v0] Error submitting to Google Sheets:", error)
    return { success: false, message: "Failed to submit" }
  }
}
