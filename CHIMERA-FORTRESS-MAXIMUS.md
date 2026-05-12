# CHIMERA FORTRESS MAXIMUS
## Canonical Seed · All Prior Docs Superseded
**Updated:** 2026-05-11 · **Session:** Vallejo hardware activation + Bay sprint audit
**Classification:** UNISEC INTERNAL · DO NOT DISTRIBUTE
**Supersedes:** CHIMERA-MASTER.md · all RENZO-HANDOFF-* · all z0–z9b variants

---

## 01 · IDENTITY

| Role | Person | Callsign (ops) | Callsign (narrative) |
|---|---|---|---|
| Head 1 — Vision | Phil Nacionales | RNA Strand 1 | SPARKPLUG |
| Head 2 — Orchestration | Renzo (Claude) | RNA Strand 2 | SPIKE |
| Head 3 — Infrastructure | Collin Schroder | — | — |

**Entity:** UNISEC = Secret Menu LLC (Phil + Michelle Roque-Nacionales) + Unity of Sound (Collin)
**Public brand:** DNA · **Internal codename:** Chimera · **Domain:** unisec.dev
**GitHub:** ChopperD00/chimera · ChopperD00/strand-parser · ChopperD00/qr-forge · ChopperD00/lupin-pro
**VC advisor (confidential):** Brianne Kimmel (Worklife Ventures) — Michelle, KJ, Naveed, Collin only.

**Response protocol (mandatory):**
1. LINEAR / normal approach
2. ABSTRACTED / YOLO approach
3. SYNTHESIS best-of-both
→ Follow with visual workflow chart or diagram

---

## 02 · THREE-POLE COSMOLOGY (LOCKED)

| Pole | Location | Color | Anchor |
|---|---|---|---|
| UNICRON | Los Angeles | `#ff6a1c` coral-orange | ACIDBURN production backbone |
| CYBERTRON | Vallejo | `#4d8eff` blue | iMac 27" operator console |
| MOS ESPA | KJ outpost | `#d9a248` amber | FETT (KJ Johnson) |

**Energon accent:** `#ff2d8a` magenta — mesh connections, dispatch lines

---

## 03 · HARDWARE FLEET (canonical — 2026-05-11)

| Node | Hardware | Tailscale IP | Location | Role | Status |
|---|---|---|---|---|---|
| UNICRON | M4 Mac Mini 16GB | 100.70.194.81 | LA / traveling | Phil’s operator seat | ● online |
| ACIDBURN | Ubuntu 24.04 64GB | 100.69.29.1 | LA | 24/7 production backbone | ● online |
| CYBERTRON | iMac 27" Retina 5K Late 2014 (iMac15,1) | 100.82.142.39 | Vallejo | Operator console — OCLP Sonoma ✓ | ● online |
| HERBIE | M1 Mac Mini 16GB | 100.107.10.49 | LA → MOS ESPA | Qdrant + GHOSTWRITER (Gemma 4) · migrating | ⛙ migrating |
| WHEELJACK | M4 Mac Mini (incoming) | — | LA | Takes HERBIE’s LA role | ⏳ incoming |
| MICHELLES-IMAC | M4 Mac Mini | 100.73.20.65 | LA | Michelle’s machine | ◐ intermittent |
| ZER0C00L | Lenovo Legion Go | 100.94.248.8 | mobile | Phil’s daily carry + DJ rig | ◐ intermittent |
| RODIMUS | iOS device | 100.111.175.63 | mobile | Phil’s iPhone | ● idle |
| LASERBEAK | Steam Deck | 100.67.87.65 | LA | Leave-Behind prototype v1 | ○ dormant |
| GRIMLOCK | Mac Pro 5,1 · 128GB ECC · RX 5700 XT · 8TB | — | LA | Vault + Qdrant primary | ⛙ building |
| SNARL | Mac Pro 5,1 | — | LA testbench | BLOCKED — bad CPU tray + 2 bad RAM slots unmapped | ✗ blocked |
| SWOOP | Mac Pro 5,1 · 64GB · RX 580 Nitro+ · TB3 · 6TB | — | Vallejo | Inference + 6TB vault node | ⛙ next build |
| SLAG | Mac Pro 5,1 (spec TBD) | — | TBD | Inference node | ⛙ building |
| IRONHIDE | MacBook Air 2011 or 2012 | — | — | Mesh leaf / leave-behind | ⛙ just imaged |
| HARDCASE | Mac Mini Intel 2018 + Blackmagic eGPU (RX 580) | — | LA | Home server + Gemma 4B inference | ⛙ building |
| RYUJIN (hw) | Jetson AGX Xavier 64GB · Connect Tech Rogue | — | LA | Vision/media inference | ⛙ building |
| KAIJU | Jetson AGX Orin 64GB | — | — | Sovereign 70B brain | ⏳ hold $1,700 refund |

**HARDCASE note:** Mac Mini Intel 2018 8GB/256GB + Blackmagic eGPU RX 580 8GB. DO NOT upgrade past macOS Monterey — eGPU support dropped in Ventura. Runs Gemma 3 4B via Ollama + Metal acceleration.

**MOS ESPA print fleet (KJ):**
- SLAVE I · Bambu P1S · enclosed FDM (KJ names it)
- KRAYT · Phrozen MSLA · resin
- [name TBD — KJ picks] · Anycubic Kobra X · color FDM

**UNICRON pole print fleet (LA):**
- SUNSTREAKER · Bambu A1S + AMS Lite · multi-color FDM
- SIDESWIPE · Anycubic Kobra X · color FDM

**MOS ESPA personnel:** FETT (KJ Johnson) · BL-17 = HERBIE renamed at KJ’s desk post-migration

---

## 04 · ACIDBURN PORT MAP (canonical — 2026-05-11)

| Port | Service | Status | Notes |
|---|---|---|---|
| :3100 | paperclip (telemetry) | ● live | |
| :3141 | inferis-console (mono.html · NERV HUD) | ● live | |
| :3142 | inferis-core (ForgeChief + 57 agents WS) | ● live | |
| :3144 | ryujin-monitor SSE | ● live | |
| :3001 | lupin-pro Next.js frontend | ⛙ building | via Cloudflare tunnel → lupin.pro |
| :5678 | n8n-chimera | ● live | |
| :6333 | Qdrant | ● live | 7 collections |
| :8092 | Lupin Lite Flask (NERV INTEL tab) | ● live | HARBINGER/RECON/LEDGER |
| :8093 | ⚠ PORT CONFLICT | — | Stitch worker AND lupin-pro Flask both assigned — resolve next session |
| :8094 | mesh-monitor | ● live | |
| :8888 | SearXNG (localhost only) | ● live | |
| :11434 | Ollama | ● live | mistral-nemo · mistral-small · nomic-embed-text |
| :3143 :3145 :3146 :8290 | Legacy | ○ do not build against | audit for shutdown |
| :8090 | WIPE Flask (Phase 2) | ○ not built | |

**NERV console:** `http://100.69.29.1:3141/mono` · Cloudflare: `dashboard.inferis.app/nerv-dashboard.html`

---

## 05 · QDRANT COLLECTIONS

| Collection | Purpose | Status |
|---|---|---|
| courseware | pre-existing | ● live |
| visual_assets | pre-existing | ● live |
| research | pre-existing | ● live |
| intel_targets | Lupin Lite OSINT | ● live |
| stitch_moodboard | Pinned screens | ● live |
| stitch_snippets | Code snippets + STRAND tags | ● live |
| knowledge_base | Chrome reading list (~753 items) | ⛙ ingesting |

---

## 06 · SYNCTHING (NEEDS FIX)

UNICRON ↔ ACIDBURN chimera-forge sync. ACIDBURN port 22000 not binding.
**Fix:** edit `~/.local/state/syncthing/config.xml` → set `<listenAddress>` to `tcp://0.0.0.0:22000` → `systemctl --user restart syncthing`

---

## 07 · ACTIVE CLIENTS

| Client | PM | Status | Notes |
|---|---|---|---|
| NurseJamie | Phil | ACTIVE | PARALLAX · FRAME→THREAD reorder = 23% consistency gain |
| Edelbrock | Cindy Nishihara | IN PROGRESS | CRUCIBLE · via Studio Trigger |
| East Bay Auto Spa | Phil | PROSPECT | Ron Ocampo · @eastbayautospa · 1,338 IG followers / 921 posts · Walnut Creek |
| Lifestyle Studio NJ | Phil | PROSPECT | @slowjasm / @jasm.biyoshi / @lifestyle.studionj · expanding to Philippines |
| Stylest | — | QUEUED | pending |

---

## 08 · DNA CHIMERA NODE (leave-behind product)

**Concept:** Bespoke Gemma 4 powered SBC node left with clients. Local inference (sovereign). DNA mesh via Tailscale. Phil manages remotely.

**Tier 1 — NODE LITE:** RPi Zero 2W · cloud Claude API · ~$40 hardware · headless
**Tier 2 — CHIMERA NODE:** RPi 5 8GB + AI HAT+ (Hailo-8L 26 TOPS) · local Gemma · ~$200 hardware

**RPi 5 + AI HAT+ ASINs:** B0CK2FCQ4N (RPi 5 8GB) + B0D4879LG3 (AI HAT+)
**Rock 5B+ ASINs:** B0DDTPF958 (16GB) · B0DDTLBHR6 (24GB)

**Contest entry 2:** dev.to Gemma 4 challenge · DNA CHIMERA NODE as SMB agentic edge node
**Contest entry 1:** ChopperChair · Gemma 4 Vision → dog measurement → parametric wheelchair → STL

---

## 09 · SWOOP BUILD PLAN

**Hardware:** Mac Pro 5,1 · 64GB · RX 580 8GB Nitro+ · Titan Ridge TB3 · 6TB (DO NOT WIPE)
**Ubuntu installer:** Burned to 62GB SteamOS USB via Etcher ✓
**Install media:** 62GB USB (Ubuntu 24.04.2) · OWC 6G SATA = boot drive
**Boot drive:** OWC 6G SATA SSD (not NVMe — NVMe Sabrent card goes to GRIMLOCK)
**Stock GPU needed:** for EFI boot picker visibility — RX 580 doesn’t output at EFI stage
**Install sequence:** Option key boot → USB → Ubuntu to OWC 6G → HWE kernel → rEFInd → 6TB fstab → Tailscale → Ollama → rocm-smi

---

## 10 · INFERIS MESH STATE

**57-agent genome (ratified 2026-05-08)**
7 teams: GAUNTLET · PARALLAX · RESONANCE · DISPATCH · CRUCIBLE · KILN · FORGE_MOTION
ForgeChief = routing agent · Pixtral = vision QA
PARALLAX: FRAME · THREAD · KINETIC · SHEAR · SYNC
FORGE_MOTION: SANDBOX · MOTIONFLOW · MIRAI
INTEL: HARBINGER (HIBP) · RECON (crt.sh) · LEDGER (RDAP · rdap.org)

**NOTE:** FORGE naming conflict — ForgeChief, FORGE_MOTION, chimera-forge directory all need renaming. Existing product/repo conflict. Defer to dedicated session.

---

## 11 · KEY PATHS

**UNICRON:** `/Users/unicron/chimera-forge/` · `/Users/unicron/Pitch/` · `/Users/unicron/Inferis_React/`
**ACIDBURN:** `~/chimera-forge/` · `~/lupin/` · `~/nerv-public/`
**CYBERTRON:** `~/chimera-node/` · NERV: `http://100.69.29.1:3141/mono`
**Notion Cockpit:** `2c7556f6-08b6-80eb-90bc-e026d28a2e97`
**Vercel team:** `phil-secretmenus-projects`

---

## 12 · CRITICAL PATTERNS

- `Desktop Commander:write_file` → UNICRON real FS. `create_file` → container only.
- Heredocs in SSH: fail with JSON/Python/JS. Use write_file → scp → ssh execute.
- GitHub large files: `push_files` reliable. `create_or_update_file` unreliable.
- Vercel team slug: `phil-secretmenus-projects`
- n8n v2.16: Publishing = 3 postgres ops + systemctl restart.
- Chrome: always secretme.nu / phil@secretme.nu
- HARDCASE: DO NOT upgrade past macOS Monterey (eGPU drops in Ventura)

---

## 13 · ON-HORIZON

- SPIKE node: MINISFORUM MS-01 + RTX 3090 via OCuLink (~$850)
- SPIKE wearable: XIAO ESP32S3 Sense (~$15) · order Amazon ASIN B0C69FFVHH
- HARDCASE: Mac Mini Intel 2018 + Blackmagic eGPU $100 (from Apple contact)
- DogFit/Chopper: Gemma 4 Vision wheelchair · contest entry 1 · Fusion 360 bridge
- WIPE tool: EasyOCR + ProPainter + FFmpeg · California Closets driver
- LUPIN PRO: OSINT platform · runbook ready · ACIDBURN:3001
- NVIDIA Inception: Secret Menu LLC application pending
- Syncthing fix: ACIDBURN port 22000 binding
- :8093 conflict: Stitch vs LUPIN PRO Flask — resolve before lupin-pro build
- BEACHCOMBER: XU4 CloudShell2 NAS · needs microSD for petitboot
- chimera-forge restructure: archive 30 dead .md files after Syncthing fixed

---

*CHIMERA FORTRESS MAXIMUS · 2026-05-11 · Renzo (RNA Strand 2)*
*Single source of truth. Update in place. Do not spawn new handoff docs.*
