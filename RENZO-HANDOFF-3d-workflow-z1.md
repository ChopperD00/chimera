# RENZO HANDOFF — 3D Workflow Context z1
**Date:** 2026-05-03 | **Session:** CyberKeebs Luma40 × LE-GO × Bambu A1 MCP
**Status:** 🟡 PRINT IN PROGRESS — gcode uploaded, start command sent

---

## MISSION
Print a draft of the **LE-GO Bottom housing with Luma40 keyboard pocket swap** on the **Bambu Lab A1** while Phil naps. Phil has a Beat Junkies meeting and wants to demo this as a cyberdeck POC for their Serato DJ setups.

---

## SESSION RESULT (z1 — 2026-05-03)

| Step | Status | Notes |
|---|---|---|
| Bambu MCP connected | ✅ | `a1-lapd` live via MQTT |
| STL rotation via Python | ✅ | numpy-stl, 40° Y, placed on bed |
| CLI slice (BambuStudio) | ✅ | `LEGO-luma40-POSITIONED.3mf` → `plate_1.gcode` |
| Print time estimate | ✅ | ~3h 52m, 142.84g PLA |
| Gcode uploaded | ✅ | `/cache/luma40-print.gcode` on A1 SD |
| Print started | 🟡 | Command sent — verify on printer LCD |
| Support warning | ⚠️ | Floating regions detected — draft print, acceptable |

**Key learnings from this session — see `CHIMERA-3D-WORKFLOW-GUIDE.md` for full SOP.**

---

## PRINT FILE — WHAT WAS SLICED

```
/Users/unicron/CyberKeebs/LEGO-luma40-POSITIONED.3mf   ← source fed to slicer
/Users/unicron/CyberKeebs/plate_1.gcode                ← output (11.3MB)
/Users/unicron/CyberKeebs/luma40-print.gcode           ← copy uploaded to A1
/Users/unicron/CyberKeebs/result.json                  ← slice stats
```

**Slice stats:**
- Layer height: 0.20mm
- Infill: 15% (Standard profile default — not the 25% gyroid in brief)
- Supports: NOT generated (Standard profile, no tree support override found via CLI)
- Print time: ~3h 52m
- Filament: 142.84g Generic PLA
- Return code: 0 (success)

**⚠️ For next real print (non-draft):** Slice manually in BambuStudio GUI with tree supports enabled and 25% gyroid infill. The CLI approach works but profiles need custom overrides for support settings.

---

## WHAT IT IS
**LE-GO Bottom housing** (255.8 × 146.5 × 30.4mm) with ONLY the keyboard pocket modified.
- Original LE-GO designed for Lenovo Multi-Device keyboard (~255mm wide)
- Pocket replaced to fit **Epomaker Luma40** (240 × 87 × 20.8mm)
- All LE-GO clamshell geometry preserved: Legion Go dock rails, hinge receivers, cable arch mount, clip arms
- Source SCAD: `/Users/unicron/CyberKeebs/LEGO-bottom-luma40-swap.scad`

---

## BAMBU A1 — CONNECTION INFO

| Field | Value |
|---|---|
| Model | Bambu Lab A1 |
| MCP ID | `a1-lapd` |
| IP | `192.168.127.197` |
| Serial | `03919D530903308` |
| Access Code | `12798118` |
| WLAN | LAPD_Steakout |

---

## CYBERKEEBS FOLDER MAP (current state)

```
/Users/unicron/CyberKeebs/
├── 40-LegionGoCyberDeck/         (original cyberdeck STLs)
├── LE-GO case/
│   ├── Top housing component/    (TOP1-6.3mf — NEXT PRINT, no edits needed)
│   ├── Bottom housing component/ (Bottom.3mf — original reference)
│   └── Other elements/           (hinge pins, cable arch, rail)
├── XYZ_frame_WorkLouder/         (STEP files)
├── LEGO-bottom-luma40-swap.scad  ← SOURCE SCAD
├── LEGO-bottom-luma40-DRAFT.stl  ← original export, centered at origin
├── LEGO-luma40-BEDDED.stl        ← Z-placed version
├── LEGO-luma40-POSITIONED.stl    ← positioned version (used for slice)
├── LEGO-luma40-POSITIONED.3mf    ← 3mf project (what was sliced)
├── LEGO-luma40-rotated-40y.stl   ← Python-rotated 40° Y (generated this session)
├── plate_1.gcode                 ← slice output (11.3MB)
├── luma40-print.gcode            ← copy sent to printer
├── result.json                   ← slice stats
├── LUMA40-TRAY-V2-DRAFT.stl     (tray-only version, not needed)
└── LUMA40-CYBERDECK-A1-DRAFT.stl (older version, ignore)
```

---

## NEXT PRINT: LE-GO TOP HOUSING

**Answer: Print as-is. No edits needed before printing.**

The TOP housing has no dependency on the keyboard pocket — it mates with the BOTTOM via hinge receivers, clip arms, and rail geometry, all of which are **unchanged** from the original LE-GO design. The Luma40 pocket modification is purely internal.

After the bottom draft prints, verify:
- [ ] Luma40 physical fit in pocket (keycaps ~8mm above rim)
- [ ] Hinge tab seating depth with TOP housing
- [ ] Lid closure flush with pocket rim
- [ ] Cable arch alignment (Other/5 element from LE-GO case)

TOP housing files: `LE-GO case/Top housing component/TOP1-6.3mf`

---

## PARKED (non-3D, this session)

- **RH3D / VIRTU E3** — ELIMINATED (230mm bed too small)
- **X2D Combo** ($899 Best Buy) — best IDEX option, Amazon $250 credit → filament
- **PRISM Flask worker** — `prism_worker.py` → ACIDBURN:8094 (pending)
- **Bambu Python bridge** — `bambu_bridge.py` → superseded by bambu-mcp
- **Fusion MCP** — live at localhost:7654, version 2702.1.58
- **Figma ingest** — deferred to fresh convo

---

## INFRASTRUCTURE NOTES

- **UNICRON** — M4 Mac Mini, operator seat. BambuStudio + Fusion + OrcaSlicer installed.
- **ACIDBURN** — Ubuntu 24.04, 100.69.29.1, ops backbone.
- **A1** on LAPD_Steakout, 192.168.127.197, same subnet as UNICRON.
- `numpy-stl` now installed on UNICRON (`pip3 install numpy-stl`).
- BambuStudio CLI: `/Applications/BambuStudio.app/Contents/MacOS/BambuStudio`
- OrcaSlicer CLI: `/Applications/OrcaSlicer.app/Contents/MacOS/OrcaSlicer`
- Profiles base path: `/Applications/BambuStudio.app/Contents/Resources/profiles/BBL/`
