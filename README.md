
# Diego_E-commerce

Este é um monorepositório que contém:

* **API** (Node.js + Express + TypeScript)
* **Front-end** (React + Vite + TypeScript + Redux Toolkit + styled-components)

---

## 🚀 Tecnologias

* **Back-end**: Node.js, Express, TypeScript
* **Front-end**: Vite, React, TypeScript, Redux Toolkit, React Router, styled-components, Axios
* **Testes**: Cypress (E2E)
* **Notificações**: react-toastify

---

## 📁 Estrutura

```
root/
├── api/              # Servidor Express + TypeScript
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── app.ts
│       ├── types.ts
│       └── routes/
│           ├── products.ts
│           ├── auth.ts
│           └── orders.ts
├── src/             # Front-end React (Vite)
│   ├── App.tsx
│   ├── main.tsx
│   ├── redux/
│   ├── pages/
│   ├── components/
│   └── styles/
├── package.json     # Scripts e dependências do front-end
├── tsconfig.json    # Configuração TypeScript do front-end
└── README.md        # Este arquivo
```

---

## ⚙️ Setup (Desenvolvimento)

### 1. Clonar o repositório

```
git clone <URL_DO_REPO>
cd Diego_E-commerce
```

### 2. Iniciar a API

```
cd api             # entrar na pasta do back-end
npm install        # instalar dependências
npm run dev        # inicia o servidor em http://localhost:5000/api
```

### 3. Iniciar o Front-end

Em outro terminal:

```
cd Diego_E-commerce  # de volta à raiz do projeto
npm install          # instala dependências do front-end
npm run dev          # inicia o Vite em http://localhost:5173
```

Agora o front-end se comunica com a API em `<span>http://localhost:5000/api</span>`.

---

## ✅ Scripts úteis

**API** (dentro de `<span>api/</span>`):

```
npm run dev   # servidor com reload automático
npm run build # transpila TypeScript para dist/
npm start     # executa build em produção
```

**Front-end** (na raiz):

```
npm run dev      # Vite em modo dev
npm run build    # gera build de produção
npm run preview  # preview do build local
npm run lint     # executa ESLint
npm run cypress:open  # abre Cypress para E2E
```

---

## 📄 Mais detalhes

* Consulte cada pasta `<span>api/src/routes</span>` para ver os endpoints disponíveis:
  * **Produtos**: `<span>GET/POST/PUT/DELETE /api/products</span>`
  * **Autenticação**: `<span>POST /api/auth/login</span>`
  * **Pedidos**: `<span>GET/POST /api/orders</span>`
* No front, veja em `<span>src/services/api.ts</span>` como o Axios está configurado.

---

## 📣 Deploy

* API pode ser publicada em Heroku, Vercel (Functions) ou outro provider.
* Front-end pode ser hospedado em Netlify, Vercel ou GitHub Pages.

---

Feito com ❤️ por Diego. Boa codada!
