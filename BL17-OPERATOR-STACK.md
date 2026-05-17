# BL-17 · MOS ESPA · Operator Stack Reference
**UNISEC / Secret Menu LLC — CONFIDENTIAL**
*Cloned operator environment — KJ / FETT*

---

## Mesh-native (no config needed — just be on Tailscale)

These live on ACIDBURN (100.69.29.1) and are available to any mesh node the moment Tailscale is connected.

| Service | Address | What it does |
|---|---|---|
| NERV console | `http://100.69.29.1:3141/mono` | Operator HUD — workflow cards, agent state, JUDGE scores |
| Ollama | `http://100.69.29.1:11434` | Local LLM inference — no API cost |
| Qdrant | `http://100.69.29.1:6333` | Vector memory — visual KB, intel targets, agent context |
| Lupin OSINT | `http://100.69.29.1:8092` | HARBINGER (HIBP) · RECON (crt.sh) · LEDGER (RDAP) |
| Mesh monitor | `http://100.69.29.1:8094` | Node health + agent overrides |
| HARVEST | `http://100.69.29.1:8096` | YouTube → Qdrant genome ingest pipeline |
| NERV dashboard | `https://dashboard.inferis.app` | Live telemetry — public via Cloudflare tunnel |
| n8n | `https://secretmenu.app.n8n.cloud` | Workflow automation — Chimera Forge engine |

### Ollama models available on ACIDBURN
| Model | Use |
|---|---|
| mistral-nemo 7B | Fast local inference, routing |
| mistral-small 24B | Quality local inference |
| gemma4 26B | High-quality generation |
| gemma4 e4b | Efficient Gemma variant |
| nomic-embed-text | Embeddings for Qdrant |
| chopperchair-anatomist/geometrist/validator | 3D print pipeline |

---

## APIs — configure locally on BL-17
*Get keys from Phil via secure channel (1Password or in person — not email)*

### AI / Generation
| Service | Env var | Notes |
|---|---|---|
| Anthropic (Claude) | `ANTHROPIC_API_KEY` | Primary AI. Use the `local-infers` key for node work. |
| OpenAI | `OPENAI_API_KEY` | GPT-4o fallback, Whisper STT |
| Google Gemini | `GEMINI_API_KEY` | Via API/n8n only |
| OpenRouter | `OPENROUTER_API_KEY` | Multi-model routing layer |
| Perplexity | `PERPLEXITY_API_KEY` | Web-grounded research |
| Grok | `GROK_API_KEY` | xAI — code and reasoning |

### Creative / Media
| Service | Env var | Notes |
|---|---|---|
| ElevenLabs | `ELEVENLABS_API_KEY` | TTS — RESONANCE team voice output |
| Runway | `RUNWAY_API_KEY` | Gen-4 video — PARALLAX team |
| Kling | `KLING_ACCESS_KEY` + `KLING_SECRET_KEY` | Video gen — PARALLAX |
| Luma | `LUMA_API_KEY` | Dream Machine video |
| HeyGen | `HEYGEN_API_KEY` | AI avatar / talking head |
| Replicate | `REPLICATE_API_TOKEN` | FLUX, SD, model hosting |
| PiAPI | `PIAPI_KEY` | Midjourney API wrapper |
| Hugging Face | `HF_TOKEN` | Model hub + datasets |

### Dev / Infra
| Service | Env var | Notes |
|---|---|---|
| GitHub | `GITHUB_TOKEN` | ChopperD00/chimera + all repos |
| Vercel | `VERCEL_TOKEN` | Deployments — team: phil-secretmenus-projects |
| Tailscale | baked into bootstrap | Handled by bl17-bootstrap.sh |
| n8n | `N8N_API_KEY` | Workflow automation API |

### Design / Collaboration
| Service | Env var | Notes |
|---|---|---|
| Figma | `FIGMA_TOKEN` | Design file access + MCP |
| Notion | `NOTION_TOKEN` | Cockpit, briefs, fleet docs |
| Stitch | `STITCH_TOKEN` | Brief → Stitch → Figma pipeline |

---

## Claude Code MCP servers

```bash
# Added by chimera-setup.sh
claude mcp add desktop-commander npx @wonderwhy-er/desktop-commander

# Add manually as needed
claude mcp add github npx @modelcontextprotocol/server-github
claude mcp add notion https://mcp.notion.com/mcp
claude mcp add figma https://mcp.figma.com/mcp
claude mcp add google-drive https://drivemcp.googleapis.com/mcp/v1
claude mcp add google-calendar https://calendarmcp.googleapis.com/mcp/v1
claude mcp add gmail https://gmailmcp.googleapis.com/mcp/v1
claude mcp add vercel https://mcp.vercel.com
claude mcp add n8n https://secretmenu.app.n8n.cloud/mcp-server/http
claude mcp add cloudflare https://bindings.mcp.cloudflare.com/mcp
```

---

## Environment template — ~/.env.chimera

```bash
# Get values from Phil via 1Password
export ANTHROPIC_API_KEY=""
export OPENAI_API_KEY=""
export GEMINI_API_KEY=""
export OPENROUTER_API_KEY=""
export PERPLEXITY_API_KEY=""
export ELEVENLABS_API_KEY=""
export REPLICATE_API_TOKEN=""
export RUNWAY_API_KEY=""
export KLING_ACCESS_KEY=""
export KLING_SECRET_KEY=""
export LUMA_API_KEY=""
export HEYGEN_API_KEY=""
export HUGGING_FACE_HUB_TOKEN=""
export GITHUB_TOKEN=""
export VERCEL_TOKEN=""
export FIGMA_TOKEN=""
export NOTION_TOKEN=""
export STITCH_TOKEN=""
export N8N_API_KEY=""

# Mesh — pre-filled
export ACIDBURN="100.69.29.1"
export CHIMERA_NODE="bl-17"
export CHIMERA_POLE="MOS-ESPA"
```

Add to `.zshrc`: `[ -f ~/.env.chimera ] && source ~/.env.chimera`

---

## Key repos

| Repo | What it is |
|---|---|
| `chimera` | Master context, fleet docs, NERV dashboard |
| `strand-parser` | STRAND tag language parser (private) |
| `qr-forge` | QR code tooling |
| `chprcmnd` | Brief generator (Vercel) |
| `inferis` | Inferis lander + app (Vercel) |

---

## What does NOT need to run locally on BL-17

These live on ACIDBURN — use mesh endpoints, don’t duplicate:
- Qdrant, Ollama, n8n server, Cloudflared, Flask workers, NERV server

---

*Last updated: 2026-05-16 · UNISEC / Secret Menu LLC*
