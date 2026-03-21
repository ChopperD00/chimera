# API Dependency Audit + Sovereignty Roadmap

**Last updated:** March 21, 2026
**Purpose:** Protect Pro tier margins from upstream API pricing volatility.

## Risk Tiers

| API | Risk | Current Cost | Sovereign Replacement | Timeline |
|-----|------|-------------|----------------------|----------|
| **Krea** | 🟥 HIGH | ~$35/mo + per-unit | fal.ai (Phase 1), FLUX/SD on KAIJU (Phase 2) | Now → Apr |
| **ElevenLabs** | 🟥 HIGH | $5–$99/mo credits | Chatterbox (MIT, 0.5B, beats EL at 63.8%) on KAIJU | Apr |
| **Replicate** | 🟧 MED-HIGH | Per-second GPU | fal.ai + local FLUX/SD on KAIJU | Apr |
| **Anthropic** | 🟧 MED | $3–$75/M tokens | Mistral Small 3 (draft), Claude (consensus only) | Apr |
| **Suno** | 🟧 MED | $10–$30/mo | YuE (Apache 2.0, 7B, on KAIJU 64GB) | Apr–May |
| **Runway** | 🟧 MED | $12–$76/mo credits | No OS equiv yet. Use for premium only. | Monitor |
| **Ollama** | ✅ SOVEREIGN | $0 | Already local | Done |
| **Whisper** | ✅ SOVEREIGN | $0 | Deploying on RYUJIN | Next week |

## Margin Impact

- **Current Pro tier COGS:** $2.95–$6.75/user/mo (~85% margin)
- **Target COGS (sovereign):** $0.45–$1.20/user/mo (~95–97% margin)
- **Key enabler:** KAIJU (Jetson AGX Orin 64GB) running Chatterbox + FLUX + YuE + Mistral locally

## Open-Source TTS Alternatives (replacing ElevenLabs)

| Model | Params | License | Voice Clone | Quality vs EL | Runs on KAIJU |
|-------|--------|---------|-------------|---------------|---------------|
| Chatterbox | 0.5B | MIT | Yes (6s audio) | 63.8% preference (beats EL) | Yes |
| Coqui XTTS v2 | ~1B | MPL (non-commercial) | Yes (6s, 17 langs) | 94% of EL | Yes |
| Kokoro | 82M | Apache 2.0 | No | Good, 96x realtime | Yes (even RYUJIN) |
| Orpheus | 0.15–3B | Varies | Yes | Strong | Yes |

## Open-Source Music Alternatives (replacing Suno)

| Model | Params | License | Capability | VRAM Req | Runs on KAIJU |
|-------|--------|---------|-----------|----------|---------------|
| YuE | 7B | Apache 2.0 | Lyrics-to-song, vocals+accomp, 5min | 24GB (full song) | Yes (64GB) |
| ACE-Step | ~1B | Apache 2.0 | Fast inference, all genres, LoRA | 12GB | Yes |
| DiffRhythm | ~1B | Apache 2.0 | Fast diffusion-based | 8GB | Yes |

---

*UNISEC · Secret Menu LLC + Unity of Sound · CONFIDENTIAL*
