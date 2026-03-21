# INFERIS / SECRET MENU — Project Context Brief

**Last updated:** 2026-03-21
**Purpose:** Context transfer document for new Claude instance. Covers architecture, infrastructure, active workstreams, and conventions.

---

## WHO

**Phil** — founder/operator of Secret Menu, a creative studio. Builds under the brand **Inferis** (infrastructure/AI layer) and **Secret Menu** (client-facing creative). The AI assistant identity across all projects is **Renzo** (previously Solus, Forge, ForgeChief).

**Collin** — Head 3, MS Azure Chief Cloud Architect. Joint entity UNISEC (Unity of Sound + Secret Menu). Domain: unisec.dev.

---

## WHAT INFERIS IS

A multi-agent AI mesh for creative production — video, image, audio, design. The system takes client briefs, decomposes them into generation tasks, dispatches to AI tools (Kling, Runway, Luma, ElevenLabs, etc.), reviews output via vision models, and delivers. The goal is a sovereign AI stack with minimal dependency on US big tech or PRC model providers.

### Core Architecture
- **ForgeChief** — orchestrator that dispatches briefs to agents. Lives in the `inferis` monorepo.
- **57 agents** in inferis-core across 7 teams (PARALLAX, RESONANCE, DISPATCH, CRUCIBLE, KILN, GAUNTLET, FORGE_MOTION).
- **Quality routing:** `draft` and `reviewed` tiers go to local inference (Mistral). `consensus` tier escalates to Claude (Anthropic cloud).
- **Chimera** — cross-platform AI sidebar. Tauri v2 (8.9MB binary). Multi-provider: Ollama, Anthropic, Gemini, Perplexity.

---

## INFRASTRUCTURE — THE MESH (Gen 3 / UNISEC Architecture)

7 nodes + 4 peripherals connected via **Tailscale**:

| Node | Hardware | IP | Role | Status |
|------|----------|-----|------|--------|
| **UNICRON** | M4 Mac Mini 16GB | 100.70.194.81 | Operator seat, Chimera UI, BT hub | Active |
| **ACIDBURN** | Ubuntu 24.04, 64GB RAM | 100.69.29.1 | Docker, CI/CD, n8n, Tailscale relay, Kinect v2 | Active |
| **GRIMLOCK** | Mac Pro 5,1 Linux, 2×Xeon X5690 3.46GHz 12c/24t, 128GB ECC, RX 580, NVMe+2×4TB | Pending | Scan station (DS200), 8TB vault, LoRA storage | Setting up |
| **IRONHIDE** | Arch + Hyprland | 100.67.87.65 | Portable dev, NERV shell | Offline (battery) |
| **HERBIE** | M1 Mac Mini 16GB | 100.107.10.49 | Reserve / idle | Standby |
| **KAIJU** | Jetson AGX Orin 64GB | Pending | Sovereign 70B, ForgeChief, STRAND VLM, Qdrant | Pending (next week) |
| **RYUJIN** | Jetson AGX Orin 32GB | Pending | Vision QA, SD, Whisper STT | Pending (next week) |

### Peripherals
| Device | Node | Role |
|--------|------|------|
| Innex DS200 scanner | GRIMLOCK | Book/storyboard scanning → LoRA training data |
| Sony RX0 II + arm | UNICRON | Overhead desk cam, Kickstarter video, live STRAND feed |
| Kinect v2 | ACIDBURN | Depth + skeletal tracking → STRAND &pose/&motion tags |
| Moondrop Pill | UNICRON (BT) | Voice-to-Renzo via Whisper STT |

### GRIMLOCK Storage Layout
- NVMe: OS + Docker + Tailscale
- 4TB Drive 1 (/vault/scans): DS200 archive, e-konte collections, notebook scans
- 4TB Drive 2 (/vault/lora): Training datasets, fine-tuned weights, DEADWEIGHT assets

---

## STRAND — Storyboard Translation and Notation for Design

9-prefix unified tag language + 6-color ink system for ForgeFX physical storyboard notebooks.
- Prefixes: > (motion), @ (timeline), # (trigger), $ (style), ~ (reference/~define), & (character), ^ (camera), % (routing), ! (film-tech)
- 59+ tags in Notion Tag Registry, filterable by domain (Web/Social/Film/Mograph)
- ~define: mint custom tags from video clips, CodePens, screenshots
- No competitor exists in this space (validated March 2026)
- Kickstarter product: ForgeFX notebook (physical) + STRAND parser + arg0n engine (digital)

---

## KEY PROJECTS & REPOS

### arg0n.dev (`deadweight-argon` repo)
Generative video tool. 50+ models via Krea API + Ryujin proxy + HuggingFace. Briefberry bridge: brief JSON → plan → execute.

### arg0n-studio (`ChopperD00/arg0n-studio`, private)
Video production pipeline. React 19 + Zustand + Vite 7 + Supabase Argon.

### chimera (`ChopperD00/chimera`)
Sidebar app + landing page. Vercel → unisec.dev.

### chimera-nerv-ui (`ChopperD00/chimera-nerv-ui`)
NERV design system. MIT licensed. CSS + Three.js + component demos.

### qr-forge (`ChopperD00/qr-forge`)
AI artistic QR code generator. Replicate API. Live on Vercel.

### REPO DRIFT WARNING
Console exists in TWO places: `inferis-console-web` (Vercel) AND `inferis` monorepo `console/` (ACIDBURN). Consolidate.

---

## REVENUE MODEL

| Tier | Price | What | Margin |
|------|-------|------|--------|
| Free | $0 (BYOK) | Multi-model sidebar only | N/A |
| Pro | $29/mo | HAWK pipeline + 57 agents + edge mesh | ~85% |
| Node | $750–$1,500/mo | Managed hardware on-site | 70–80% |

---

## CONVENTIONS

- The AI assistant name is **Renzo** across all projects.
- Phil values sovereign infrastructure, creative autonomy, and minimal vendor lock-in.
- Entity: UNISEC (unisec.dev). Public product: DNA. Internal codename: Chimera.
- Genomic vocabulary: agent=gene, workflow=strand, pipeline=helix, output=phenotype, iteration=mutation
- 5 visual languages: Eva/NERV, Prometheus hologram, Alien Semiotic, HUD Vault, Genomic
- Q2 2026 Kickstarter target: STRAND + ForgeFX notebook + DEADWEIGHT proof project
- One-line pitch: "Draw what you see. We build what you mean."
