# RENZO HANDOFF — 3D Workflow Context z1
**Date:** 2026-05-03 | **Session:** CyberKeebs Luma40 × LE-GO × Bambu A1 MCP

---

## MISSION
Print a draft of the **LE-GO Bottom housing with Luma40 keyboard pocket swap** on the **Bambu Lab A1** while Phil naps. Phil has a Beat Junkies meeting and wants to demo this as a cyberdeck POC for their Serato DJ setups.

---

## PRINT FILE — READY TO SLICE & SEND

```
/Users/unicron/CyberKeebs/LEGO-bottom-luma40-DRAFT.stl
```

**What it is:** Full LE-GO Bottom housing (255.8 × 146.5 × 30.4mm) with ONLY the keyboard pocket modified.
- Original LE-GO was designed for Lenovo Multi-Device keyboard (~255mm wide)
- Pocket replaced to fit **Epomaker Luma40** (240 × 87 × 20.8mm)
- All LE-GO clamshell geometry preserved: Legion Go dock rails, hinge receivers, cable arch mount, clip arms
- Watertight ✅ | Fits A1 256mm bed ✅

**Source SCAD:**
```
/Users/unicron/CyberKeebs/LEGO-bottom-luma40-swap.scad
```

---

## SLICER SETTINGS (BambuStudio is open on UNICRON)

| Setting | Value |
|---|---|
| Layer height | 0.2mm |
| Infill | 25% gyroid |
| Supports | Tree, build plate only |
| Material | PLA (or PETG if loaded) |
| **CRITICAL** | **Rotate 30–45° on Y axis before slicing** |

**Why tilt:** The pocket walls, hinge receivers, and clip arms need Z-axis layer lines for structural integrity. Printing flat puts layer lines across the weakest points. At 30–45° on Y, footprint is ~202×147mm which still fits the 256mm bed.

**Export path after slicing:**
```
/Users/unicron/CyberKeebs/luma40-print.3mf
```

---

## BAMBU A1 — FULLY CONNECTED

| Field | Value |
|---|---|
| Model | Bambu Lab A1 |
| IP | `192.168.127.197` |
| Serial | `03919D530903308` |
| Access Code | `12798118` |
| WLAN | LAPD_Steakout |
| MQTT :8883 | ✅ Live |
| FTPS :990 | ✅ Live |

---

## BAMBU MCP SERVER — INSTALLED & CONFIGURED

Repo: `ChopperD00/bambu-mcp` (forked from griches/bambu-mcp)
Installed at: `/Users/unicron/chimera-forge/bambu-mcp/`
Built: `dist/index.js` ✅

**Printer config:** `~/.bambu-mcp/printers.json`
```json
{
  "printers": [{
    "id": "a1-lapd",
    "name": "A1-LAPD",
    "host": "192.168.127.197",
    "accessCode": "12798118",
    "serialNumber": "03919D530903308",
    "model": "A1"
  }]
}
```

**Claude MCP config:** `~/Library/Application Support/Claude/claude_desktop_config.json`
```json
"bambu-farm": {
  "command": "node",
  "args": ["/Users/unicron/chimera-forge/bambu-mcp/dist/index.js"],
  "env": { "BAMBU_MCP_CONFIG_DIR": "/Users/unicron/.bambu-mcp" }
}
```

**MCP Tools available:**
`add_printer`, `remove_printer`, `reconnect_printer`, `list_printers`, `get_status`, `get_version`, `pause_print`, `resume_print`, `stop_print`, `start_print`, `start_prints`, `set_speed`, `set_light`, `set_temperature`, `set_nozzle`, `list_files`, `upload_file`, `delete_file`, `download_file`, `set_recording`, `set_timelapse`, `change_filament`, `unload_filament`, `send_gcode`, `skip_objects`, `sign_message`

**Confirmed working:**
- Connected: `A1-LAPD (a1-lapd)` ✅
- `upload_file` — uses `local_path` arg (absolute path, supports .stl, .3mf, .gcode)
- `start_print` — uses `file` arg (filename on printer SD card)
- `get_status` — bed temp 44.97°C (warming up when last checked)
- `LEGO-bottom-luma40-DRAFT.stl` **already uploaded to A1 SD card** ✅

---

## SEND PRINT COMMAND

The STL is already on the printer's SD card. **But STL needs to be sliced first** — Bambu firmware prints .3mf or .gcode, not raw STL.

### Option A: Slice in BambuStudio (already open on UNICRON)
1. File is loaded — rotate 30–45° on Y
2. Set settings (0.2mm, 25% gyroid, tree supports)
3. Slice → Export plate sliced file → `/Users/unicron/CyberKeebs/luma40-print.3mf`
4. Use MCP to upload + start:

```javascript
// Upload
upload_file({ printer: 'a1-lapd', local_path: '/Users/unicron/CyberKeebs/luma40-print.3mf' })
// Start print
start_print({ printer: 'a1-lapd', file: 'luma40-print.3mf', bed_leveling: true, timelapse: false })
```

### Option B: Use Desktop Commander to run OrcaSlicer CLI
OrcaSlicer is installed at `/Applications/OrcaSlicer.app` — CLI slicing is possible but needs machine/filament JSON args.

---

## CYBERKEEBS FOLDER MAP

```
/Users/unicron/CyberKeebs/
├── 40-LegionGoCyberDeck/
│   ├── Body.stl          (238.6×154.6×17.5mm)
│   ├── Left.stl          (55.4×56.0×27.4mm)
│   └── Right.stl         (55.4×56.0×27.4mm)
├── LE-GO case/
│   ├── Top housing component/  (TOP1-6.3mf — screen holder, hinges)
│   ├── Bottom housing component/  (Bottom.3mf — 255.8×146.5×30.4mm)
│   └── Other elements/    (hinge pins, cable arch, rail)
├── XYZ_frame_WorkLouder/  (STEP files for Work Louder frame)
├── LEGO-bottom-luma40-swap.scad   ← SOURCE
├── LEGO-bottom-luma40-DRAFT.stl   ← PRINT THIS ← already on A1
├── LUMA40-TRAY-V2-DRAFT.stl      (tray-only version, not needed)
└── LUMA40-CYBERDECK-A1-DRAFT.stl (older version, ignore)
```

---

## DESIGN INTENT — Clamshell Form Factor

Reference images (Etsy listing): https://www.etsy.com/listing/4461110167/legion-go-keyboard-case-3d-print-file

- Luma40 sits **recessed** in the pocket — keycaps protrude ~8mm above the rim
- LE-GO TOP housing (6-part, hinges on rear) folds down over keyboard like a laptop lid
- Legion Go screen is held in the top housing — whole thing is a clamshell
- Cable arch (Other/5 in LE-GO case) bridges cable routing between keyboard and Go
- This is the **Beat Junkies POC** — plug Luma40 into IRONHIDE (Legion Go), fold shut for carry, open to use Serato

---

## WHAT STILL NEEDS TO HAPPEN

- [ ] **Slice the STL in BambuStudio** (30–45° Y tilt, tree supports, 0.2mm, 25% gyroid)
- [ ] **Export as .3mf** → `/Users/unicron/CyberKeebs/luma40-print.3mf`
- [ ] **Upload + start print** via bambu-mcp MCP tools
- [ ] **Verify A1 status** → `get_status({ printer: 'a1-lapd' })`
- [ ] When print finishes: test Luma40 physical fit in pocket
- [ ] Verify hinge tab alignment with LE-GO TOP housing
- [ ] Fusion MCP: refine hinge geometry for final version based on fit test

---

## ALSO IN THIS SESSION (non-3D, park for later)

- **RH3D / VIRTU E3 printer build** — ELIMINATED, 230×230×230mm bed is too small for LE-GO bottom (255.8mm)
- **Amazon vs Best Buy printer shopping** — X2D Combo ($899) at Best Buy has best Amazon-equivalent return policy for IDEX dual extrusion. Amazon $250 credit best used on filament.
- **PRISM Flask worker** — `/Users/unicron/chimera-forge/prism_worker.py` — deploy to ACIDBURN:8094 (pending)
- **Bambu Python bridge** — `/Users/unicron/chimera-forge/bambu_bridge.py` — superseded by bambu-mcp
- **Fusion MCP** — wired and working at localhost:7654, confirmed version 2702.1.58

---

## INFRASTRUCTURE NOTES

- **UNICRON** (M4 Mac Mini) — operator seat, BambuStudio + Fusion + OrcaSlicer installed
- **ACIDBURN** (Ubuntu 24.04, 100.69.29.1) — ops backbone, SSH accessible
- **A1** on LAPD_Steakout (192.168.127.197) — same subnet as UNICRON
- **bambu-mcp** requires restart of Claude desktop to load the new MCP server
- OrcaSlicer CLI path: `/Applications/OrcaSlicer.app/Contents/MacOS/OrcaSlicer`
- BambuStudio CLI path: `/Applications/BambuStudio.app/Contents/MacOS/BambuStudio`
