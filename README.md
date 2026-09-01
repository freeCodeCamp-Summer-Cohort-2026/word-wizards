<div align="center">

<h1>⏙⌾☈⟄ ⏙⟟☡⍲☈⟄⎎</h1>

<img src="apps/web/public/logo.svg" style="filter: brightness(0) saturate(100%) invert(100%) sepia(13%) saturate(3674%) hue-rotate(302deg) brightness(100%) contrast(63%); width: 240px" />

![NodeJS](https://img.shields.io/badge/node.js-%236DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-%23000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-%233ECF8E.svg?style=for-the-badge&logo=supabase&logoColor=white)
![FreeCodeCamp](https://img.shields.io/badge/freecodecamp-%230A0A23.svg?style=for-the-badge&logo=freecodecamp&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/shadcnui-%23000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white)
![Turborepo](https://img.shields.io/badge/turborepo-%23EF4444.svg?style=for-the-badge&logo=turborepo&logoColor=white)
![Biome](https://img.shields.io/badge/biome-%2360A5FA.svg?style=for-the-badge&logo=biome&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

</div>

Repository for **Team Word Wizards** - Summer 2026 Cohort

## Local Development

Both the [frontend](#frontend) and [supabase backend](#running-supabase) must be running for the application to work as expected.

### Prerequisites

- Node.js v26.x.x
- Docker

### Frontend

#### Baremetal

```bash
npm ci
npm run dev
```

#### Docker

```bash
docker compose up -d
```

#### Nix with Devbox

```bash
devbox shell
```

Then steps from [Baremetal](#baremetal)

## Running supabase

```bash
npx supabase start
```
