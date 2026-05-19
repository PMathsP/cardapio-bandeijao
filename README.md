# Cardápio Bandejão

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

## VISÃO GERAL DO PROJETO

Este projeto é o sistema do Restaurante Universitário (Bandejão) e reúne as funcionalidades de:

- visualização de cardápio semanal,
- CRUD completo de pratos,
- recarga de saldo do cartão RU,
- sugestões de pratos com IA.

A aplicação foi desenvolvida em **React** com **Vite** e separa claramente as entregas para duas disciplinas diferentes.

---

## Documentos separados por disciplina

- **Programação Dinâmica para Web**: `DOC_PROGRAMACAO_DINAMICA_WEB.md`
- **Sistemas Distribuídos**: `DOC_SISTEMAS_DISTRIBUIDOS.md`

### Para avaliação de Web

Consulte `DOC_PROGRAMACAO_DINAMICA_WEB.md` para:

- detalhes do CRUD em `src/pages/TabelaCRUD.jsx`,
- uso de `fetch` assíncrono,
- `json-server` local com `db.json`,
- integração com Google Gemini.

### Para avaliação de Sistemas Distribuídos

Consulte `DOC_SISTEMAS_DISTRIBUIDOS.md` para:

- arquitetura Serverless,
- uso de AWS API Gateway e Lambda,
- recarga de cartão RU via endpoint remoto,
- papel de `src/apiConfig.js`.

---

## Estrutura principal do projeto

- `src/pages/Home.jsx` - exibe cardápio semanal e gráficos.
- `src/pages/TabelaCRUD.jsx` - CRUD de pratos e sugestões de IA.
- `src/pages/Recarga.jsx` - recarga do cartão RU usando AWS.
- `src/apiConfig.js` - alterna a URL base entre local e AWS.
- `db.json` - base de dados simulada para `json-server`.
- `public/data/cardapio.json` - cardápio estático usado na Home.

---

## Como executar

```bash
cd cardapio-bandeijao
npm install
npx json-server --watch db.json --port 3000
npm run dev
```

Acesse a aplicação pelo endereço exibido pelo Vite.

---

## Observação

Este README funciona como índice do projeto e encaminha para os dois documentos de disciplina.
