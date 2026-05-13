# Configuração do Google Sheets para Formulário de Agendamento

Este guia explica como configurar o Google Sheets para receber os dados do formulário de agendamento usando Google Apps Script.

## Passo 1: Criar a Planilha do Google Sheets

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Nomeie a planilha como "Agendamentos Dr. Parisio" (ou o nome que preferir)
4. Na primeira linha (cabeçalho), adicione as seguintes colunas:
   - **A1**: Data/Hora
   - **B1**: Nome
   - **C1**: Telefone

## Passo 2: Criar o Google Apps Script

1. Na planilha, clique em **Extensões** → **Apps Script**
2. Apague todo o código padrão que aparece
3. Cole o seguinte código:

\`\`\`javascript
function doPost(e) {
  try {
    // Obtém a planilha ativa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dos dados recebidos
    var data = JSON.parse(e.postData.contents);
    
    // Obtém a data/hora atual no fuso horário de Brasília
    var timestamp = Utilities.formatDate(
      new Date(), 
      "America/Sao_Paulo", 
      "dd/MM/yyyy HH:mm:ss"
    );
    
    // Adiciona uma nova linha com os dados
    sheet.appendRow([
      timestamp,
      data.name,
      data.phone
    ]);
    
    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retorna erro
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

4. Clique em **Salvar** (ícone de disquete) e dê um nome ao projeto, como "Webhook Agendamentos"

## Passo 3: Implantar como Web App

1. No editor do Apps Script, clique em **Implantar** → **Nova implantação**
2. Clique no ícone de engrenagem ⚙️ ao lado de "Selecionar tipo"
3. Selecione **Aplicativo da Web**
4. Configure as seguintes opções:
   - **Descrição**: "Webhook para formulário de agendamento"
   - **Executar como**: "Eu" (sua conta)
   - **Quem tem acesso**: "Qualquer pessoa" (IMPORTANTE: Se não estiver como "Qualquer pessoa", dará erro 403)
5. Clique em **Implantar**
6. **IMPORTANTE**: Copie a **URL do aplicativo da Web** que aparece. Ela será algo como:
   \`\`\`
   https://script.google.com/macros/s/AKfycbx.../exec
   \`\`\`
7. Clique em **Concluído**

## Passo 4: Autorizar o Script

1. Na primeira vez que implantar, o Google pedirá autorização
2. Clique em **Revisar permissões**
3. Escolha sua conta do Google
4. Clique em **Avançado** (se aparecer um aviso)
5. Clique em **Ir para [nome do projeto] (não seguro)**
6. Clique em **Permitir**

## Passo 5: Configurar a Variável de Ambiente

1. No v0, vá até a seção **Vars** na barra lateral
2. Adicione uma nova variável de ambiente:
   - **Nome**: `GOOGLE_SHEETS_WEBHOOK_URL`
   - **Valor**: Cole a URL do aplicativo da Web que você copiou no Passo 3

## Passo 6: Testar a Integração

1. Acesse seu site
2. Clique em "Agendar Consulta"
3. Preencha o formulário com nome e telefone
4. Clique em "Enviar e Agendar"
5. Verifique se os dados aparecem na planilha do Google Sheets

## Solução de Problemas

### Erro 403 (Access Denied) ou "Erro de permissão"

Este é o erro mais comum. Acontece quando o script não tem permissão pública.

1. Volte ao Apps Script
2. Clique em **Implantar** → **Gerenciar implantações**
3. Clique no ícone de lápis (editar) na implantação ativa
4. **CRUCIAL**: Mude "Quem tem acesso" para **"Qualquer pessoa"** (Anyone)
   - Se estiver como "Apenas eu" ou "Qualquer pessoa com conta Google", **NÃO** funcionará.
5. Clique em **Concluído**

### Os dados não estão aparecendo na planilha

1. Verifique se a URL do webhook está correta nas variáveis de ambiente
2. Verifique se você autorizou o script corretamente
3. Abra o Apps Script e vá em **Execuções** para ver se há erros
4. Certifique-se de que a planilha tem os cabeçalhos corretos (Data/Hora, Nome, Telefone)

## Formato dos Dados na Planilha

Os dados serão salvos no seguinte formato:

| Data/Hora | Nome | Telefone |
|-----------|------|----------|
| 18/11/2025 14:30:45 | João Silva | (81) 99999-9999 |
| 18/11/2025 15:45:12 | Maria Santos | (81) 98888-8888 |

## Recursos Adicionais

- [Documentação do Google Apps Script](https://developers.google.com/apps-script)
- [Guia de Web Apps](https://developers.google.com/apps-script/guides/web)
- [Referência do SpreadsheetApp](https://developers.google.com/apps-script/reference/spreadsheet)
