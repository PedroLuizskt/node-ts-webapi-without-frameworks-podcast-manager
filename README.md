<sub>Desenvolvido para evolução técnica por <a href="https://github.com/PedroLuizskt">Pedro Luiz</a></sub>
</div>
<div align="center">
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=26a62f&height=120&section=header"/>
 
  <a href="https://github.com/PedroLuizskt">
    <img src="https://readme-typing-svg.herokuapp.com/?color=fa9c0a&size=35&center=true&vCenter=true&width=1000&lines=PodManager+API;Node.js+&+TypeScript;Clean+Architecture+Concepts&duration=4000&pause=1000" alt="Typing SVG" />
  </a>
</div>

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![API REST](https://img.shields.io/badge/API-RESTful-E44C30?style=for-the-badge)](https://restfulapi.net/)

</div>

---

## Projeto: Gerenciador de Podcasts - API NodeJS Com Typescript e HTTP Module

O **PodManager API** é uma plataforma backend desenvolvida para facilitar a organização, curadoria e o gerenciamento de episódios de podcasts. Desenvolvido com **Node.js** e fortemente tipado com **TypeScript**, o sistema utiliza módulos HTTP nativos para comunicação de rede eficiente e leve.

O foco curatorial desta API é fornecer um catálogo voltado para o intelecto e a ciência, abrangendo tópicos complexos como **Astrofísica, Neurociência, Biologia Evolutiva e Teoria Musical Avançada** (com podcasts de referência como *StarTalk*, *Huberman Lab* e *Lex Fridman*).

---

## ⚙️ A Engenharia por Trás do Código

O projeto foi refatorado visando escalabilidade e aderência aos conceitos de *Clean Architecture*, separando responsabilidades e facilitando a manutenção futura.

### 1. Separação de Roteamento (Server vs App)
Na implementação original, a inicialização do servidor HTTP e o mapeamento de rotas estavam acoplados no mesmo arquivo (`server.ts`). A arquitetura foi refatorada:
* `server.ts`: Torna-se responsável apenas por inicializar a porta (`listen`) e injetar o app.
* `app.ts`: Passa a ser o coração do roteamento (Router), inspecionando o método (`GET`) e a URL (`baseUrl`) para delegar a execução aos *Controllers* corretos.

### 2. Segurança de Interface (CORS e Tratamento de Erros)
Para que esta API seja consumível por aplicações Front-end (React, Vue, etc.) sem bloqueios de segurança do navegador, implementei os cabeçalhos de **CORS (Cross-Origin Resource Sharing)** diretamente no fluxo de requisição:

```typescript
response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

```

Além disso, foi criada uma rota de *Fallback* universal. Qualquer requisição para um endpoint inexistente (ex: `/api/qualquer-coisa`) é interceptada, retornando um objeto JSON legível acompanhado do `HTTP Status 404 (Not Found)`, evitando que a aplicação trave (timeout) o cliente.

### 3. Decodificação de Queries de Busca

Ao filtrar por categorias ou nomes que possuam espaços (ex: `teoria musical`), URLs naturalmente encodam o espaço (ex: `%20`). A camada de serviço foi blindada com `decodeURIComponent` para garantir que o *Repository* receba a string limpa antes de processar o filtro no `.json`.

---

## 🛠️ Estrutura do Projeto

A arquitetura de pastas segue o padrão MSC (Model-Service-Controller) acoplada ao conceito de Repositórios:

```text
📦 projeto-app-podmanager
 ┣ 📂 src
 ┃ ┣ 📂 controllers       # Intercepta a requisição, chama o Service e devolve a resposta (Res.end)
 ┃ ┣ 📂 models            # Interfaces TypeScript definindo o formato dos objetos
 ┃ ┣ 📂 repositories      # Comunicação com os dados brutos (O JSON curatorial)
 ┃ ┣ 📂 routes            # Enumeração das rotas disponíveis
 ┃ ┣ 📂 services          # Lógica de negócio, validações e tratamentos de string
 ┃ ┣ 📂 utils             # Auxiliares (Status Codes, Content Types HTTP)
 ┃ ┣ 📜 app.ts            # Gerenciador de Rotas e Headers CORS
 ┃ ┗ 📜 server.ts         # Inicializador nativo do Node.js
 ┣ 📜 package.json        # Configuração de scripts (tsx, tsup) e dependências
 ┗ 📜 tsconfig.json       # Configurações estritas de compilação do TypeScript

```

---

## 🚀 Como Executar Localmente

### Pré-requisitos

* Node.js (v18+) instalado.

### Passo a Passo

1. **Clone o repositório e instale as dependências:**

```bash
git clone [https://github.com/PedroLuizskt/node-ts-webapi-without-frameworks-podcast-manager.git]
cd projeto-app-podmanager
npm install

```

2. **Inicie o servidor em modo de desenvolvimento (Watch Mode):**

```bash
npm run start:watch

```

3. **Teste os Endpoints (Via Navegador ou Postman):**
* **Listar o Catálogo Completo:** `GET http://localhost:3333/api/list`
* **Filtrar por Curadoria (ex: Neurociência / Huberman):** `GET http://localhost:3333/api/episode?p=huberman`
* **Validar Rota Não Encontrada (Tratamento 404):** `GET http://localhost:3333/api/rota-invalida`
