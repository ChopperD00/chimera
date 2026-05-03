# CHIMERA 3D PRINT WORKFLOW GUIDE
**Maintainer:** Renzo (Head 2) | **Node:** UNICRON → Bambu A1-LAPD
**Last updated:** 2026-05-03

---

## OVERVIEW

This guide covers the full end-to-end workflow for 3D printing on the Secret Menu / UNISEC mesh using the Bambu A1 and bambu-mcp MCP server. Covers setup, CLI slicing, file management, and print control — everything a team member needs to pick up a session mid-stream.

---

## CHANGELOG

### v1.0 — 2026-05-03 (Initial — z1 session)
- Established bambu-mcp MCP connection to A1-LAPD via MQTT
- Documented CLI slicing workflow using BambuStudio headless
- Discovered: `LEGO-luma40-POSITIONED.3mf` is the correct input file for the Luma40 bottom housing
- Discovered: BambuStudio CLI fails on raw STL centered at Z=0 — must use pre-positioned .3mf or Python-pre-processed STL
- Discovered: CLI `--rotate-y` + `--arrange` flags fail if model origin is outside print volume — pre-rotate with Python instead
- Installed `numpy-stl` on UNICRON for programmatic STL manipulation
- Confirmed: gcode output goes to `plate_1.gcode` in `--outputdir`, copy to named file before upload
- Confirmed: `upload_file` target path must match `start_print` path — use `remote_path: /cache/<filename>` for gcode files
- Documented: LE-GO TOP housing prints as-is, no modification needed before fit test
- Print result: 142.84g PLA, ~3h 52m, 0.20mm layers, 15% infill, no supports (draft)

---

## HARDWARE MAP

| Node | Role | IP | Notes |
|---|---|---|---|
| UNICRON | Operator seat | local | M4 Mac Mini. BambuStudio, OrcaSlicer, Fusion MCP |
| ACIDBURN | Ops backbone | 100.69.29.1 | Ubuntu 24.04. n8n, Ollama, Qdrant, Flask workers |
| A1-LAPD | Bambu Lab A1 | 192.168.127.197 | LAN Only Mode + Dev Mode enabled |

**A1 credentials:**
```
ID:          a1-lapd
Name:        A1-LAPD
Host:        192.168.127.197
Access Code: 12798118
Serial:      03919D530903308
MQTT:        :8883 (TLS)
FTPS:        :990 (implicit)
```

---

## BAMBU-MCP SETUP

### What it is
`bambu-mcp` is an MCP server (Model Context Protocol) that gives Claude direct control over Bambu Lab printers. No Bambu app, no BambuStudio required for print control.

### Location
```
Repo:    ChopperD00/bambu-mcp (fork of griches/bambu-mcp)
Install: /Users/unicron/chimera-forge/bambu-mcp/
Binary:  /Users/unicron/chimera-forge/bambu-mcp/dist/index.js
Config:  /Users/unicron/.bambu-mcp/printers.json
```

### Claude Desktop MCP config
File: `~/Library/Application Support/Claude/claude_desktop_config.json`
```json
{
  "mcpServers": {
    "bambu-farm": {
      "command": "node",
      "args": ["/Users/unicron/chimera-forge/bambu-mcp/dist/index.js"],
      "env": { "BAMBU_MCP_CONFIG_DIR": "/Users/unicron/.bambu-mcp" }
    }
  }
}
```
> **Note:** Claude Desktop must be restarted to load MCP config changes.

### Printer config file
`/Users/unicron/.bambu-mcp/printers.json`:
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

### Prerequisites on the printer
1. Settings → Network → **LAN Only Mode** ON
2. Settings → Network → LAN Only Mode → **Developer Mode** ON
3. Note the **Access Code** shown on the LCD

---

## MCP TOOL REFERENCE

### Fleet management
| Tool | Description |
|---|---|
| `add_printer` | Register printer (saves to printers.json + connects) |
| `remove_printer` | Remove + disconnect |
| `reconnect_printer` | Re-establish MQTT (use after network changes) |
| `list_printers` | Show all printers + connection status |

### Print control
| Tool | Key args | Notes |
|---|---|---|
| `get_status` | `printer`, `detailed` | `detailed: true` forces fresh data push from printer |
| `start_print` | `printer`, `file`, `path`, `bed_leveling` | `path` must match where file was uploaded |
| `upload_file` | `printer`, `local_path`, `remote_path` | `remote_path` defaults to `/<filename>` (root) — use `/cache/<name>` for gcode |
| `pause_print` | `printer` | |
| `resume_print` | `printer` | |
| `stop_print` | `printer` | ⚠️ Irreversible |
| `list_files` | `printer`, `path` | `path: '/'` for root, `'/cache/'` for sliced files |

### Hardware
| Tool | Args | Notes |
|---|---|---|
| `set_temperature` | `target: nozzle\|bed`, `temperature` | 0 = off. Max: nozzle 300°C, bed 120°C |
| `set_light` | `light: chamber_light\|work_light`, `mode: on\|off` | |
| `set_speed` | `profile: silent\|standard\|sport\|ludicrous` OR `percent: 50-166` | |
| `send_gcode` | `command` | Raw gcode. Blocked: M112, M502, M500, M501, M997, M999 |

---

## SLICING WORKFLOW — CLI (HEADLESS)

Use this when you want Renzo to slice without touching BambuStudio GUI.

### Profile paths (BambuStudio)
```
Base: /Applications/BambuStudio.app/Contents/Resources/profiles/BBL/

Machine:  machine/Bambu Lab A1 0.4 nozzle.json
Process:  process/0.20mm Standard @BBL A1.json
          process/0.20mm Strength @BBL A1.json
Filament: filament/Generic PLA @BBL A1.json
          filament/Bambu PLA Tough @BBL A1.json
          filament/Bambu PLA Tough+ @BBL A1.json
```

### CLI command
```bash
MACHINE="/Applications/BambuStudio.app/Contents/Resources/profiles/BBL/machine/Bambu Lab A1 0.4 nozzle.json"
PROCESS="/Applications/BambuStudio.app/Contents/Resources/profiles/BBL/process/0.20mm Standard @BBL A1.json"
FILAMENT="/Applications/BambuStudio.app/Contents/Resources/profiles/BBL/filament/Generic PLA @BBL A1.json"

/Applications/BambuStudio.app/Contents/MacOS/BambuStudio \
  --slice 0 \
  --load-settings "$PROCESS;$MACHINE" \
  --load-filaments "$FILAMENT" \
  --outputdir /Users/unicron/CyberKeebs/ \
  "/Users/unicron/CyberKeebs/LEGO-luma40-POSITIONED.3mf"
```

**Output files:**
- `plate_1.gcode` — the sliced file (~11MB for the Luma40 bottom)
- `result.json` — slice stats (print time, filament weight, return code)

### ⚠️ Known CLI limitations
- **Supports not generated via CLI.** The Standard profile doesn't include tree supports. For production prints, use BambuStudio GUI with tree supports + 25% gyroid infill.
- **`--slice 0` = slice all plates.** Don't use 1 unless targeting a specific plate.
- **Raw STL centered at Z=0 will fail.** The slicer rejects models not clearly above the bed plane. Use a `.3mf` project file OR pre-process the STL with Python (see below).
- **`--rotate-y` + `--arrange` combo fails** when the model origin is off-volume. Pre-rotate in Python instead.

---

## STL ROTATION & BED PLACEMENT — PYTHON

Use this when you need to programmatically rotate an STL before slicing (e.g., the 30–45° Y tilt for structural layer orientation).

### Install
```bash
pip3 install numpy-stl  # already installed on UNICRON
```

### Rotation script
```python
import numpy as np
from stl import mesh

m = mesh.Mesh.from_file('/path/to/input.stl')
verts = m.vectors.astype(np.float64)
flat = verts.reshape(-1, 3)

# Rotation matrix — Y axis, 40 degrees
angle = np.radians(40)
Ry = np.array([
    [np.cos(angle),  0, np.sin(angle)],
    [0,              1, 0             ],
    [-np.sin(angle), 0, np.cos(angle)]
], dtype=np.float64)

rotated = (Ry @ flat.T).T

# Place on bed (Z-min = 0)
rotated[:, 2] -= rotated[:, 2].min()

# Center on 256×256 A1 bed
rotated[:, 0] += 128 - (rotated[:, 0].min() + rotated[:, 0].max()) / 2
rotated[:, 1] += 128 - (rotated[:, 1].min() + rotated[:, 1].max()) / 2

m.vectors = rotated.reshape(-1, 3, 3).astype(np.float32)
m.save('/path/to/output-rotated.stl')
```

**Then slice the output STL** using the CLI command above (no `--rotate-y` flag needed).

> **Why tilt for Luma40 housing:** At 30–45° Y, the pocket walls, hinge receivers, and clip arms get Z-axis layer lines for structural integrity. Printing flat puts layer boundaries across the weakest points.

---

## FULL PRINT WORKFLOW (STEP BY STEP)

### For a team member starting fresh:

**Step 1 — Connect to printer**
```
→ In Claude: "add printer a1-lapd at 192.168.127.197, access code 12798118, serial 03919D530903308, model A1"
```
Or if it's already in `printers.json`, it auto-connects on server start. Verify:
```
→ get_status(printer: 'a1-lapd', detailed: true)
```

**Step 2 — Prepare your file**
- If you have a `.3mf` project (with orientation already set): go to Step 3
- If you have a raw `.stl` centered at origin: use the Python rotation script above first
- STLs exported from Fusion360/OpenSCAD are often Z-centered — always check

**Step 3 — Slice via CLI**
```bash
# Copy the CLI command from the Slicing Workflow section above
# Change the input file path and outputdir as needed
# Check result.json when done — return_code: 0 = success
```

**Step 4 — Rename and upload**
```bash
cp /path/to/plate_1.gcode /path/to/myprint.gcode
```
```
→ upload_file(printer: 'a1-lapd', local_path: '/full/path/myprint.gcode', remote_path: '/cache/myprint.gcode')
```

**Step 5 — Start print**
```
→ start_print(printer: 'a1-lapd', file: 'myprint.gcode', path: '/cache/', bed_leveling: true)
```

**Step 6 — Monitor**
```
→ get_status(printer: 'a1-lapd', detailed: true)
```
Check: Status shows `Running`, nozzle temp rising toward print temp, progress % moving.

---

## CYBERKEEBS PROJECT STATE

### Files in `/Users/unicron/CyberKeebs/`

| File | Purpose | Use |
|---|---|---|
| `LEGO-bottom-luma40-swap.scad` | Source model | Edit geometry here |
| `LEGO-bottom-luma40-DRAFT.stl` | Raw export, Z-centered | Don't slice directly |
| `LEGO-luma40-POSITIONED.stl` | Bed-placed version | Can be sliced if position correct |
| `LEGO-luma40-POSITIONED.3mf` | BambuStudio project | **Best input for CLI slice** |
| `LEGO-luma40-BEDDED.stl` | Z-placed variant | Alt input |
| `LEGO-luma40-rotated-40y.stl` | 40° Y rotated (Python) | Generated 2026-05-03, delete if POSITIONED.3mf is used |
| `plate_1.gcode` | Latest CLI slice output | Rename before uploading |
| `luma40-print.gcode` | Copy on printer at `/cache/` | Current in-progress print |
| `result.json` | Slice stats | Check after every CLI slice |

### Print queue
1. **LEGO bottom housing (Luma40 swap)** — 🟡 IN PROGRESS (`luma40-print.gcode`)
2. **LE-GO TOP housing** — ⏳ Print as-is from `LE-GO case/Top housing component/TOP1-6.3mf`. No edits needed. Verify fit after bottom finishes.
3. **Cable arch + hinge pins** — `LE-GO case/Other elements/` — print after fit test confirms sizing

### Post-print fit test checklist
- [ ] Luma40 seats in pocket, keycaps protrude ~8mm above rim
- [ ] Hinge receivers mate with TOP housing tabs
- [ ] Lid closes flush
- [ ] Cable arch bridges correctly
- [ ] Clip arms engage rail geometry on TOP housing
- [ ] If any geometry is off → edit `LEGO-bottom-luma40-swap.scad` → re-export → re-slice

---

## TROUBLESHOOTING

| Symptom | Cause | Fix |
|---|---|---|
| `Nothing to be sliced` on CLI | STL not above bed plane, or model outside print volume | Use `.3mf` project file or pre-rotate with Python |
| `err_code` in start_print response | Often non-fatal (Bambu quirk) | Check `get_status` — if status shows `Running`, it's fine |
| Status still shows `Finished` after start_print | Wrong file path — gcode in root but command looking in `/cache/` | Re-upload with `remote_path: '/cache/<name>'` |
| MQTT connect fails | Another client (BambuStudio, Bambu app) has the MQTT slot | Close BambuStudio / Bambu Handy on the same network |
| CLI slice outputs wrong infill/no supports | Standard profile defaults — override via GUI for production prints | Use BambuStudio GUI: 25% gyroid, tree supports, build plate only |
| `reconnect_printer` needed | Network change or sleep/wake cycle | Call `reconnect_printer(printer: 'a1-lapd')` |

---

## QUICK REFERENCE — STATUS CODES

| Printer status | Meaning |
|---|---|
| `Idle` | Ready for new print |
| `Preparing` | Bed leveling / homing / heat-up |
| `Running` | Actively printing |
| `Paused` | Paused by user or filament runout |
| `Finished` | Print complete — part on bed |
| `Failed` | Print error — check printer LCD |

---

*Guide maintained by Renzo (Head 2) · Secret Menu LLC / UNISEC*
*Next update after fit test + production slice (tree supports + 25% gyroid)*
