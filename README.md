# CodePlay Web

Frontend da plataforma CodePlay - uma plataforma de compartilhamento de vídeos educacionais.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Testes**: Vitest
- **Linting**: Biome
- **Build**: Next.js built-in

## Requisitos

- Node.js 22+
- npm
- API rodando em `localhost:3333` (ver [README da API](../api/README.md))

## Setup

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`

## Scripts

```bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm start            # Rodar build
npm test             # Rodar testes
npm run test:watch   # Watch mode
npm run lint         # Lint com Biome
npm run format       # Format com Biome
```

## Variáveis de Ambiente

Crie `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

## Estrutura

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── (routes)/     # Grouped routes
├── components/       # React components
│   ├── common/       # Reutilizáveis
│   └── modules/      # Específicos de features
├── lib/              # Utils, hooks, API client
├── styles/           # CSS globals
└── types/            # TypeScript types
```

## Desenvolvimento

### Conectar na API

A web conecta na API via `NEXT_PUBLIC_API_URL`:

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

export async function getVideos() {
  const res = await fetch(`${API_URL}/videos`);
  return res.json();
}
```

### Hot reload

Editar arquivos em `src/` recarrega automaticamente no browser.

## Testes

```bash
npm test             # Uma vez
npm run test:watch   # Watch
```

Ver [TESTING.md](TESTING.md) para mais detalhes.

## Build

```bash
npm run build
```

Gera build otimizado em `.next/`

```bash
npm start
```

Roda o build em produção localmente.

## Deploy

Para Vercel (recomendado para Next.js):

```bash
npm i -g vercel
vercel
```

Segue as instruções interativas.

## Troubleshooting

### API não responde
```bash
# Verificar se API está rodando
curl http://localhost:3333/docs

# Se não, na pasta api/:
npm run dev
```

### Build falha com "Not found"
```bash
# Limpar cache
rm -rf .next

# Reinstalar
npm install

# Rebuildar
npm run build
```

### Porta 3000 já em uso
```bash
npm run dev -- -p 3001
```

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org)
