# 📂 Separador de PDFs por CNPJ

Este script em Node.js lê todos os arquivos `.pdf` da pasta `pdfs`, identifica o **CNPJ** presente e copia cada PDF para uma subpasta nomeada com o respectivo CNPJ.

## 🚀 Como usar

### 1. Instale as dependências

npm install

### 2. Coloque seus arquivos .pdf na pasta pdfs/

Crie uma pasta chamada pdfs no diretório raiz do projeto e adicione os PDFs que deseja processar.

### 3. Execute o script

node index.js

Os arquivos serão copiados para a pasta output/<CNPJ>/, de acordo com o CNPJ encontrado em cada PDF.
