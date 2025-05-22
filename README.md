# Craftly

Mini e-commerce for digital services focused on practicing Redux Toolkit, persistent state management, modular architecture, and modern UI design with React and Tailwind.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version ≥ 18 recommended)
- npm, [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Installation

Clone the repository:

```bash
git clone https://github.com/AngelRodRo/Craftly.git
cd Craftly
```

Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Start the development server:

```bash
npm run dev
```

Then open your browser at:

```
http://localhost:5173
```

## 🎯 Purpose

The goal of this project is to build a mini digital services marketplace as a way to practice advanced frontend development skills. This includes using Redux Toolkit for global state management, building a modular architecture, implementing UI/UX best practices with TailwindCSS and Framer Motion, and deploying a fully functional SPA.

## 👤 Target Users

- **Customer**: Can browse services, add them to a cart, and simulate a purchase.
- **Admin (simulated)**: Can create, update, and delete services via a basic admin panel.

## 🧠 Learning Goals

- Use Redux Toolkit properly (createSlice, createAsyncThunk, createApi)
- Build a complete SPA with global state, simulated authentication, and data persistence
- Add animations with Framer Motion to enhance user experience
- Apply TailwindCSS and shadcn/ui to create a modern and responsive UI

## 🧭 User Flow

1. User lands on the homepage and sees the list of available services.
2. User can filter services by category.
3. User adds one or more services to their cart.
4. To proceed to checkout, the user must log in (simulated).
5. User confirms the order (simulation ends here).

## ✂️ MVP Scope

### ✅ Included

- Services catalog with filtering
- Shopping cart with Redux Toolkit and localStorage persistence
- Simulated login/logout system
- Basic admin panel with CRUD for services
- UI polish: dark mode, transitions, mobile responsiveness

### ❌ Excluded (for now)

- Real authentication/registration
- Payment gateway integration
- Messaging/chat between client and provider
- Reviews or rating system

## 🧩 Modules / Components

- Catalog
- Cart
- Auth
- Admin Panel

## 🗂️ Folder Structure 

```markdown
Craftly/
├── public/                       # Static files (index.html, favicon, etc.)
├── src/
│   ├── app/                      # Global app configuration
│   │   ├── store.ts              # Redux store setup with configureStore()
│   │   └── hooks.ts              # useAppDispatch / useAppSelector (typed hooks)
│   ├── features/                 
│   ├── components/               # Shared reusable components (e.g., Button, Card)
│   ├── pages/                    # Top-level routed pages
│   │   └── Home.tsx
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # ReactDOM.createRoot and provider setup
├── tsconfig.json                 
├── package.json
└── README.md
```

## ⚙️ Tech Stack

- **Frontend**: React + Vite + TypeScript
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS + shadcn/ui
- **Animations**: Framer Motion
- **Deployment**: Vercel (planned)

## 🚧 Tasks

[Tasks Board](https://www.notion.so/Tasks-Board-1f685041f92b80ada97de18be7230207?pvs=21)

## 📎 Notes

