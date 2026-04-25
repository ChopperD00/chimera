# UNISEC Setup — Michelle's iMac

## One command

```bash
curl -sL https://raw.githubusercontent.com/ChopperD00/chimera/main/setup/unisec-setup.sh | bash
```

## What installs

| Tool | Purpose |
|---|---|
| Node.js | Runtime for Claude Code + Flaude |
| Claude Code CLI | Agentic AI — connects to the mesh |
| Flaude plugin | AI inside Figma — your main tool |
| flaude-mcp | Figma ↔ Claude Code bridge |
| Desktop bookmark | One-click ACIDBURN console |

## Load Flaude in Figma

1. Open Figma desktop
2. Menu → Plugins → Development → **Import plugin from manifest...**
3. Navigate to `~/flaude/manifest.json`
4. Flaude appears under Plugins

## Console access

Double-click **ACIDBURN Console** on Desktop → opens `http://100.69.29.1:3141`  
Requires Tailscale (already connected).

## Keep in sync with Phil

```bash
bash ~/chimera-forge/unisec-setup.sh
```

Run anytime to pull latest builds.

---
*UNISEC · Secret Menu LLC + Unity of Sound*
