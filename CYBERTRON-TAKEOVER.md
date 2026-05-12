# CYBERTRON TAKEOVER HANDOFF
## Session: Vallejo · UNICRON powering down for NVMe swap
## 2026-05-11 · Renzo (RNA Strand 2) → CYBERTRON operator seat

---

## CURRENT STATE

**SWOOP Ubuntu install staged. One task to complete.**

- ✅ Ubuntu ISO on CYBERTRON: `~/Downloads/ubuntu-24.04.2-desktop-amd64.iso`
- ✅ UTM installed and VM "Swoop Install" configured
- ✅ OWC 250GB (disk2) permissions set, connected to CYBERTRON
- ▶ Start the UTM VM and run the Ubuntu installer

---

## SWOOP INSTALL · COMPLETE THIS NOW

### Step 1 · Start VM
Applications → UTM → Start **Swoop Install**

### Step 2 · Attach OWC
UTM window → Devices → USB → select OWC 250GB

### Step 3 · Ubuntu Installer
1. Install Ubuntu → Minimal
2. Target: 250GB OWC → Erase and install
3. Username: `acidburn` · Hostname: `swoop`
4. Timezone: America/Los_Angeles
5. **STOP before final restart**

### Step 4 · Install rEFInd (CRITICAL — before restarting)
```bash
sudo mount /dev/vda2 /mnt
sudo mount --bind /dev /mnt/dev
sudo mount --bind /proc /mnt/proc
sudo mount --bind /sys /mnt/sys
sudo chroot /mnt
apt update && apt install -y refind && refind-install
hostnamectl set-hostname SWOOP
exit
sudo umount -R /mnt
```
Shut down VM.

### Step 5 · Boot SWOOP
```bash
diskutil eject /dev/disk2
```
- OWC → SWOOP USB rear port
- Disconnect 6TB internal
- Power on SWOOP (no key held)
- RX 580 dark through Apple logo → Linux takes over → display returns

---

## MESH

| Node | IP | Status |
|---|---|---|
| ACIDBURN | 100.69.29.1 | ● live |
| UNICRON | 100.70.194.81 | ○ offline (NVMe swap) |
| CYBERTRON | 100.82.142.39 | ● YOU ARE HERE |

NERV: http://100.69.29.1:3141/mono

---

## ALSO IN PLAY

- Client fire: Phil on phone
- BEACHCOMBER: needs microSD — CC tomorrow AM
- CyberKeebs prints: `~/print-projects/` — WorkLouder + DNA enclosures ready
- OrcaSlicer: installed, /Applications
- Kobra X setup: `~/print-projects/SIDESWIPE-SETUP.md`

## WHEN UNICRON RETURNS
```bash
bash ~/chimera-forge/chimera-parity.sh
```
Update FORTRESS-MAXIMUS with SWOOP Tailscale IP after boot.

---
*CYBERTRON TAKEOVER · 2026-05-11 · Spike out*
