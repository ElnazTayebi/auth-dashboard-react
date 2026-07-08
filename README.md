#  Enterprise Admin Dashboard (Work in Progress)

[![CI/CD Workflow](https://img.shields.io/badge/CI%2FCD-Passing-success?style=flat-for-grid&logo=githubactions&logoColor=white)](https://github.com/Elnaz_Tayebi)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TanStack](https://img.shields.io/badge/TanStack-Router%20%26%20Query-ff4154)](https://tanstack.com/)

A modern, high-performance enterprise admin panel architecture built to demonstrate scalable frontend patterns, seamless state management, and type-safe routing. This project bridges the gap between clean software engineering practices and pixel-perfect UX/UI integration.

 **Live Demo:** [Deploy your Vercel/Netlify link here]

---

##  Key Features & Technical Highlights

- ** Advanced Authentication Flow:** Robust Login & SignUp forms backed by secure token handling and persistent layout architectures.
- ** 100% Type-Safe Routing:** Leverages **TanStack Router** (`createFileRoute`, layout nesting via `_dashboard`, and robust route tree configurations).
- ** Smart Data Fetching & Caching:** Utilizes **TanStack Query** for asynchronous server state synchronization, cache invalidation, and seamless REST API communication (integrated with DummyJSON API).
- ** Dynamic Username Validation:** Implements an asynchronous availability check triggered on input `onBlur`, reducing unnecessary API overhead.
- ** Bulletproof Form Handling:** Integrated with **React Hook Form** and strict schema validation powered by **Zod** (`zodResolver`).
- ** Modular Architecture:** Clean, highly reusable UI atom components (Custom Inputs with visibility toggles, Loading States, and accessible Table elements) styled beautifully with **Tailwind CSS**.
- ** CI/CD Automation:** Fully equipped with **GitHub Actions** for automated build checks, linting, and type verification on every push.

---

##  Tech Stack & Ecosystem

| Layer | Technologies Used |
| :--- | :--- |
| **Core Framework** | React (Vite) + TypeScript (Strict Mode) |
| **Routing** | TanStack Router (File-based routing) |
| **State & Fetching** | TanStack Query (React Query) |
| **Form Validation** | React Hook Form + Zod Schema Validation |
| **Styling & UI** | Tailwind CSS + Radix/Shadcn-based Design System Patterns |
| **Automation** | GitHub Actions (CI/CD Pipeline) |
| **API Provider** | DummyJSON (Auth, Users Management Services) |

---

##  Demo Access Credentials

To test the authenticated dashboard layout directly, use the following sandbox account from DummyJSON:

- **Username:** `emilys`
- **Password:** `emilyspass`

---

##  Getting Started

### 1. Clone & Install
```bash
git clone [https://github.com/Elnaz_Tayebi/your-repo-name.git](https://github.com/Elnaz_Tayebi/your-repo-name.git)
cd your-repo-name
npm install

npm run dev 

npm run build

Architecture Overview
The repository follows a strict, domain-driven folder layout designed for large-scale production applications:

src/components/auth/ - Specialized authorization modules (LoginForm, RegisterForm).

src/components/widgets/ - Highly reusable atomic interface elements (InputField, FormButton).

src/routes/ - File-based routing tree governed by TanStack Router (e.g., __root.tsx, _dashboard.tsx).

src/schemas/ - Unified schemas for Zod data validation.

src/services/ - Isolated infrastructure layers dealing with HTTP/REST requests.

CI/CD Pipeline Details
Every single commit pushed to the repository automatically triggers a dedicated GitHub Actions workflow to guarantee architectural health:

Dependency Installation: Validates clean lockfiles.

Linting & Formatting: Checks styling rules via ESLint.

Static Type Checking: Runs compiler validations (tsc --noEmit) to prevent runtime type failures.