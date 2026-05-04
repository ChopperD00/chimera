# RENZO HANDOFF — Flaude Build Context z1
**Date:** 2026-05-03 | **Session:** Computron Suite / Flaude Figma Plugin

---

## WHAT FLAUDE IS

Flaude = AI agent **inside Figma** with MCP bridge, component KB, and license system.
Repo: `ChopperD00/flaude` — main branch.

Part of the **Computron Suite** — Secret Menu's full Figma plugin fleet:

| Plugin | Function |
|---|---|
| **Flaude** | AI agent inside Figma, MCP bridge, KB, license |
| **figma-scattershot** | Figma → MJML/HTML email (Mailchimp, Klaviyo) |
| **figma-lightspeed** | Multi-page PDF import |
| **figma-nosecone** | Raster → editable vector layers |
| **figma-strafe** | PSD import with layer hierarchy |
| **figma-afterburner** | .ai file import via SVG/PDF extraction |

---

## WHAT WAS BUILT THIS SESSION — ALL COMMITTED ✅

Three new tools implemented, registered, MCP-wired across 3 commits to `ChopperD00/flaude` main:

### 1. `src/plugin/tools/lint-layer-names.ts`
- NameLint replacement (decided NOT to pay $8-12/mo subscription)
- Scans for: unnamed layers, duplicates, violations, inconsistent casing, detached components, hidden clutter
- Same functionality as the NameLint plugin we analyzed

### 2. `src/plugin/tools/smart-group-by-vision.ts`
- Vision AI grouping — sends frame screenshot to vision model
- Groups layers by visual proximity/semantic relationship
- Solves the "nagging problem" of disorganized Figma files

### 3. `src/plugin/tools/extract-to-kb.ts`
- Figma → component inventory → Qdrant KB
- Calls `generateDesignMd()` to produce DESIGN.md
- Pushes to ACIDBURN :8094 Qdrant `visual_components` collection

### Wiring (all committed):
- `src/plugin/agent/tool-definitions.ts` — all 3 registered
- `src/plugin/agent/executor.ts` — all 3 routed
- `src/plugin/mcp/command-handler.ts` — all 3 exposed via MCP + `generate_design_md` command added

---

## PRISM FLASK WORKER (Backend for Flaude vision tools)

Flaude's vision tools POST to ACIDBURN. The worker handles them:

**Files on UNICRON:**
```
/Users/unicron/chimera-forge/prism_worker.py
/Users/unicron/chimera-forge/deploy-prism-worker.sh
```

**Port:** ACIDBURN :8094

**Endpoints:**
- `POST /api/prism/group` — vision grouping (smart-group-by-vision)
- `POST /api/prism/ingest` — KB ingest (extract-to-kb)
- `GET /api/prism/health`

**Stack:** Flask + Anthropic API (vision) + Qdrant client

**STATUS: NOT YET DEPLOYED** — deploy command:
```bash
bash ~/chimera-forge/deploy-prism-worker.sh
# Requires ANTHROPIC_API_KEY env var + Qdrant running on ACIDBURN
```

---

## DESIGN INTELLIGENCE FLYWHEEL

**Generative direction (Stitch → Figma):**
```
Stitch (free, 350 gen/month)
  → DESIGN.md (native Stitch 2.0 export, March 18 2026)
  → Figma
  → Computron Suite plugins
  → Production
```

**Extractive direction (Figma → KB):**
```
Any Figma file
  → Flaude (audit_components + classify + export_frame_preview)
  → extract_to_kb
  → ACIDBURN :8094 Flask (prism_worker)
  → Qdrant visual_components collection
```

---

## GOOGLE STITCH MCP

Official MCP: `https://stitch.googleapis.com/mcp`
Community CLI: `npx @_davideast/stitch-mcp init`
DESIGN.md = native Stitch 2.0 export format.

**Wire command (run on ACIDBURN):**
```bash
claude mcp add stitch --transport http https://stitch.googleapis.com/mcp \
  --header "X-Goog-Api-Key: GEMINI_KEY" -s user
```
**STATUS: NOT YET WIRED** — Gemini API key already on ACIDBURN.

---

## NAMELINT ANALYSIS (context for lint-layer-names tool)

- Analyzed zip: `namelint-smart-file-organizing-figma-plugin`
- Contains one `.fig` file (11MB)
- Plugin UI shows: unnamed layers, duplicates, violations, inconsistent casing, detached components, hidden clutter
- Pro = $8-12/mo → **Decision: build our own** (lint-layer-names.ts committed)

---

## PENDING FLAUDE TASKS

- [ ] **Deploy PRISM worker** to ACIDBURN:8094
  ```bash
  bash ~/chimera-forge/deploy-prism-worker.sh
  ```
- [ ] **Wire Stitch MCP** on ACIDBURN
  ```bash
  npx @_davideast/stitch-mcp init
  ```
- [ ] **Test Flaude end-to-end** in Figma — open a file, run `audit_components`, then `extract_to_kb`, verify Qdrant ingestion
- [ ] **Enable FusionMCPBridge** in Fusion 360 (Tools → Add-Ins → FusionMCPBridge → Run on Startup) — needed for SCAD → Fusion → export loop
- [ ] **Blender MCP on GRIMLOCK** — after Ubuntu confirmed, install Anthropic's official Blender MCP connector

---

## FIGMA-SCATTERSHOT (NurseJamie email pipeline)

- Repo: `ChopperD00/figma-scattershot`
- Function: Figma frame → MJML → HTML → Mailchimp/Klaviyo
- **Active use case:** NurseJamie email campaigns via PARALLAX pipeline
- Status: existing repo, not modified this session

## FIGMA-LIGHTSPEED (SBJCT PDF ingestion)

- Repo: `ChopperD00/figma-lightspeed`
- Function: Multi-page PDF import into Figma
- **Active use case:** SBJCT site map PDF → Figma page breakdown
- Status: existing repo, not modified this session

---

## INFRASTRUCTURE NOTES

- **ACIDBURN** Qdrant: `visual_components` collection — target for extract-to-kb
- **ACIDBURN** Ollama: mistral-nemo 7B, mistral-small 24B, nomic-embed-text
- **ACIDBURN** services map: :8090 WIPE API, :8091 Stitch manifest worker, :8094 PRISM (pending), :8095 Bambu bridge
- **Anthropic API key** already on ACIDBURN — needed for PRISM vision calls
- **Gemini API key** already on ACIDBURN — needed for Stitch MCP

---

## REPO MAP

| Repo | Status |
|---|---|
| `ChopperD00/flaude` | ✅ 3 new tools committed this session |
| `ChopperD00/figma-scattershot` | existing, active |
| `ChopperD00/figma-lightspeed` | existing, active |
| `ChopperD00/figma-nosecone` | existing |
| `ChopperD00/figma-strafe` | existing |
| `ChopperD00/figma-afterburner` | existing |
| `ChopperD00/chimera` | main mesh repo, all handoffs land here |
| `ChopperD00/strand-parser` | private, Phase 1 MVP scaffolded |
| `ChopperD00/bambu-mcp` | forked, installed, A1 connected |
