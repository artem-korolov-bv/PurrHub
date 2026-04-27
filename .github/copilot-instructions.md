# Copilot Instructions

## Project Overview
This is **cat-generator** — a React app for displaying and generating cat images, with a built-in UI component showcase.

## Tech Stack
- **React 19** with TypeScript
- **Vite** (build tool)
- **TailwindCSS v4**
- **React Router v7** (client-side routing)
- **class-variance-authority (CVA)** for component variants
- **clsx + tailwind-merge** via `cn()` utility in `src/lib/utils.ts`

## Project Structure
```
src/
  components/ui/{component}/   # Reusable UI components
    Component.tsx              # Component implementation
    component.styles.ts        # CVA variant definitions
    index.ts                   # Re-exports
  pages/                       # Route-level page components
  services/                    # API/data fetching logic
  lib/utils.ts                 # cn() utility
```

## Coding Conventions

### UI Components
- Each UI component lives in `src/components/ui/{component}/` with the three-file structure above.
- Use `React.forwardRef` for all UI components and set `Component.displayName`.
- Define variants with `cva()` in a separate `*.styles.ts` file; export the variants and a `*Variants` type.
- Accept and forward a `className` prop; merge with `cn()`.
- Use `React.ButtonHTMLAttributes` / `React.InputHTMLAttributes` etc. as the base interface, extending it with the CVA `VariantProps`.
- Export the component and its props type from `index.ts`.

### Layout
- Menu with links to Home and other pages (e.g. Random Cats, Component Showcase).

### Styling
- Use TailwindCSS utility classes exclusively — no custom CSS files except `index.css` for global resets.
- Support both light and dark mode using `dark:` variants.
- Use the `cn()` helper for all dynamic/conditional class merging.

### TypeScript
- Prefer `interface` over `type` for component props.
- Avoid `any`; use proper generics or `unknown`.
- Keep strict mode on (as configured in `tsconfig.app.json`).

### Pages & Routing
- Add new routes in `src/App.tsx`.
- Pages are plain functional components (no `forwardRef` needed).

### Services
- API calls go in `src/services/`. Keep them as plain async functions — no class wrappers.
