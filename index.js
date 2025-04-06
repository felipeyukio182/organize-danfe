const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

// Regex para identificar CNPJ (formato XX.XXX.XXX/XXXX-XX)
const cnpjRegex = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/;

// Pasta onde estão os PDFs
const pastaPDFs = path.join(__dirname, 'pdfs');

async function processarPDF(caminhoArquivo) {
  const buffer = fs.readFileSync(caminhoArquivo);
  const data = await pdf(buffer);
  const texto = data.text;

  const match = texto.match(cnpjRegex);
  if (match) {
    const cnpj = match[0]?.replace("/", "_");

    // Criar pasta se não existir
    const pastaDestino = path.join(__dirname, 'output', cnpj);
    if (!fs.existsSync(pastaDestino)) {
      fs.mkdirSync(pastaDestino, { recursive: true });
    }

    // Mover arquivo para a pasta
    const novoCaminho = path.join(pastaDestino, path.basename(caminhoArquivo));
    fs.copyFileSync(caminhoArquivo, novoCaminho);
    console.log(`Arquivo ${path.basename(caminhoArquivo)} movido para ${cnpj}`);
  } else {
    console.log(`CNPJ não encontrado em: ${path.basename(caminhoArquivo)}`);
  }
}

async function main() {
  const arquivos = fs.readdirSync(pastaPDFs).filter(arquivo => arquivo.endsWith('.pdf'));

  for (const arquivo of arquivos) {
    const caminhoCompleto = path.join(pastaPDFs, arquivo);
    await processarPDF(caminhoCompleto);
  }

  console.log('Processamento concluído.');
}

main().catch(console.error);
