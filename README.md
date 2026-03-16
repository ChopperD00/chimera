# Chimera

Multi-provider AI sidebar with bento workflow UI. Local-first, sovereign stack.

## What

Chimera is a standalone cross-platform AI sidebar app that routes between multiple providers — local Ollama, Claude, Gemini, Perplexity — through a unified bento-card workflow interface. Design-forward, agent-aware, built for the Inferis mesh.

## Design Direction

- **Bento card layout** with squiggle/flow workflow visualization (ref: [Synapse](https://youtu.be/fSfmZCfBGzQ?si=JQj6H9Ki5EGz8_HR))
- Dark mode only, Secret Menu design system tokens
- Compact mode for constrained screens (1366x768 IRONHIDE)
- Provider pills with status badges (LOCAL / CLOUD / SEARCH)

## Tech

- **Tauri v2** — ~8MB binary vs Electron ~150MB
- **Vanilla JS + CSS tokens** — no framework bloat
- **Multi-provider streaming** — Ollama, Anthropic, Gemini, Perplexity
- **SQLite** conversation history via Tauri
- **System tray + global hotkey**

## Architecture

```
CHIMERA SIDEBAR
├── Provider Bar        [Ollama] [Claude] [Gemini] [Perplexity]
├── Bento Workflow Grid  Agent cards, pipeline status, mesh nodes
├── Chat Area           Streaming responses, markdown, code blocks
├── Input               Provider-aware, model selector
└── Status Bar          Ollama status, mesh nodes, model info
```

## Build

Requires Rust toolchain + Tauri CLI + WebKit2GTK (Linux):

```bash
cargo install tauri-cli --version '^2.0'
cd src-tauri && cargo tauri build --no-bundle
```

8.9MB compiled binary on Linux x86-64.

## Providers

| Provider | Endpoint | Auth | Badge |
|----------|----------|------|-------|
| Ollama | localhost:11434 or Tailscale | None | LOCAL |
| Claude | api.anthropic.com | ANTHROPIC_API_KEY | CLOUD |
| Gemini | generativelanguage.googleapis.com | GEMINI_API_KEY | CLOUD |
| Perplexity | api.perplexity.ai | PERPLEXITY_API_KEY | SEARCH |

## Mesh

Part of the Inferis distributed compute network:
- UNICRON (M4 Mac Mini) — operator seat
- ACIDBURN (Ubuntu 24.04) — build/compute, Ollama, Qdrant
- IRONHIDE (Arch Linux) — portable node
- HERBIE (M1 Mac) — idle

## Status

- [x] Tauri v2 scaffold
- [x] Design system tokens
- [x] Ollama streaming chat
- [x] 8.9MB compiled binary
- [ ] Bento workflow grid UI (wireframes incoming)
- [ ] Anthropic streaming provider
- [ ] Gemini + Perplexity providers
- [ ] System tray + global hotkey
- [ ] SQLite conversation history
- [ ] .deb + .AppImage packaging

---

Secret Menu LLC · nu.secretme.chimera
