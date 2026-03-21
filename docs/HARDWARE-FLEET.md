# UNISEC Hardware Fleet Map

**Last updated:** March 21, 2026
**Nodes:** 7 compute + 4 peripherals
**Network:** Tailscale mesh VPN

---

## Compute Nodes

| Node | Hardware | OS | IP | Role | Status |
|------|----------|----|----|------|--------|
| **UNICRON** | M4 Mac Mini 16GB | macOS | 100.70.194.81 | Operator seat, Chimera UI, BT hub, RX0 II capture | Active |
| **ACIDBURN** | Ubuntu 24.04, 64GB RAM | Linux | 100.69.29.1 | Docker, CI/CD, n8n, Tailscale relay, Kinect v2 host | Active |
| **GRIMLOCK** | Mac Pro 5,1, 2× Xeon X5690 (3.46GHz, 12c/24t), 128GB ECC, RX 580 8GB, NVMe + 2×4TB | Linux (Ubuntu 24.04) | Pending | Scan station (DS200), 8TB vault, LoRA data, batch processing | Setting up |
| **IRONHIDE** | Arch + Hyprland | Linux | 100.67.87.65 | Portable dev, NERV shell, Chimera dev | Offline (battery) |
| **HERBIE** | M1 Mac Mini 16GB | macOS | 100.107.10.49 | Reserve / idle | Standby |
| **KAIJU** | Jetson AGX Orin 64GB | Linux (JetPack 6.x) | Pending | Sovereign 70B LLM, ForgeChief, STRAND VLM, Qdrant | Pending (next week) |
| **RYUJIN** | Jetson AGX Orin 32GB | Linux (JetPack 6.x) | Pending | Vision QA (Pixtral), SD, Whisper STT, ControlNet | Pending (next week) |

## Peripherals

| Device | Connects to | Role |
|--------|-------------|------|
| **Innex DS200** | GRIMLOCK USB | Book/storyboard scanning → /vault/scans/. E-konte archives + DEADWEIGHT LoRA data |
| **Sony RX0 II** + arm | UNICRON USB-C | Overhead desk cam. Kickstarter video. Live STRAND parser feed. |
| **Kinect v2** (Xbox One) | ACIDBURN USB 3.0 | Depth + skeletal tracking (libfreenect2). STRAND &pose/&motion extraction. |
| **Moondrop Pill** | UNICRON BT 6.0 | Voice-to-Renzo. Whisper STT → text brief → HAWK. |

## GRIMLOCK Detailed Specs

- **Chassis:** Mac Pro 5,1 (Mid 2010/2012 tower)
- **CPU:** 2× Intel Xeon X5690 @ 3.46GHz (6-core each, 12 cores / 24 threads, 12MB L3 per CPU)
- **RAM:** 128GB DDR3 ECC (8× 16GB, triple-channel per CPU)
- **GPU:** AMD Radeon RX 580 8GB (flashed, amdgpu kernel driver on Linux, OpenCL compute)
- **Boot:** NVMe SSD (PCIe adapter)
- **Storage:** 2× 4TB HDD (SATA internal bays)

### Storage Layout

```
NVMe         → OS + system + Docker + Tailscale
4TB Drive 1  → /vault/scans  (DS200 archive, e-konte, notebook pages)
4TB Drive 2  → /vault/lora   (training data, weights, DEADWEIGHT assets)
```

## Mesh Topology

```
                    ┌──────────────┐
                    │   UNICRON    │ ← Operator seat
                    │  M4 Mac Mini │ ← RX0 II + Moondrop Pill
                    └──────┬───────┘
                           │ Tailscale
    ┌──────────────┬───────┼───────┬──────────────┐
    │              │       │       │              │
┌───┴────┐  ┌─────┴──┐ ┌──┴───┐ ┌─┴──────┐ ┌────┴───┐
│ACIDBURN│  │GRIMLOCK│ │KAIJU │ │ RYUJIN │ │IRONHIDE│
│Ubuntu  │  │Mac Pro │ │Jetson│ │ Jetson │ │ Arch   │
│Ops+n8n │  │5,1 Lin │ │ 64GB │ │  32GB  │ │Portable│
│Kinect  │  │DS200   │ │ 70B  │ │ Vision │ │Offline │
│Relay   │  │8TB vault│ │Brain │ │ QA+SD  │ │        │
└────────┘  └────────┘ └──────┘ └────────┘ └────────┘
```

## Data Flow

```
DS200 → GRIMLOCK /vault/scans/ → ACIDBURN Qdrant ingestion
RX0 II → UNICRON → STRAND parser → arg0n engine
Kinect v2 → ACIDBURN → MediaPipe skeletal → STRAND & tags
Moondrop Pill → UNICRON BT → Whisper STT → HAWK
GRIMLOCK /vault/lora/ → KAIJU fine-tuning → weights back to /vault/
```

---

*UNISEC · Secret Menu LLC + Unity of Sound · CONFIDENTIAL*
