<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Commit conventions

- Use Conventional Commits for commit subjects, for example `feat: add stock search`, `fix: handle empty revenue data`, or `docs: update deployment notes`.
- AI-generated commits must include a meaningful commit body that explains what changed and why.
- AI-generated commits must include this trailer:

```txt
Co-authored-by: Codex GPT-5.5 <noreply@openai.com>
```

## Validation

- Do not use `pnpm dev`, `npm run dev`, `pnpm build`, or `npm run build` for validation.
- Prefer `npx tsc --noEmit`, `npm run lint`, and `npm run format:check`.
