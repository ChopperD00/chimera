# SWOOP UBUNTU INSTALL RUNBOOK
## CYBERTRON → OWC 6G SATA · UTM Raw Disk Method
## For Renzo to execute via SSH from UNICRON

---

## PREREQUISITES

- OWC 6G SATA SSD plugged into CYBERTRON via USB
- CYBERTRON on Tailscale (100.82.142.39) ✓
- SSH access from UNICRON ✓
- Ubuntu 24.04.2 ISO on UNICRON at ~/Downloads/

---

## STEP 1 · INSTALL UTM ON CYBERTRON

Must be run directly on CYBERTRON. Open Terminal on CYBERTRON:

```bash
eval "$(/usr/local/bin/brew shellenv)"
brew install --cask utm
```

OR install from Mac App Store (search UTM, free). Verify:
```bash
ls /Applications/UTM.app && echo "UTM OK"
```

---

## STEP 2 · TRANSFER UBUNTU ISO TO CYBERTRON

Run from UNICRON:
```bash
scp -o StrictHostKeyChecking=no \
  ~/Downloads/ubuntu-24.04.2-desktop-amd64.iso \
  new@100.82.142.39:~/Downloads/ubuntu-24.04.2-desktop-amd64.iso
```

Verify:
```bash
ssh new@100.82.142.39 'ls -lh ~/Downloads/ubuntu-24.04.2-desktop-amd64.iso'
```

---

## STEP 3 · IDENTIFY OWC DISK ON CYBERTRON

Run on CYBERTRON:
```bash
diskutil list | grep -A6 "external"
```

Note the ~250GB drive identifier (likely /dev/disk2 or /dev/disk3).

Unmount:
```bash
diskutil unmountDisk /dev/diskX
sudo chmod 777 /dev/diskX
```

---

## STEP 4 · CREATE UTM VM

Open UTM on CYBERTRON:

1. Click **+** → **Virtualize** (NOT Emulate — CYBERTRON is Intel x86)
2. OS: **Linux**
3. Boot ISO: select `~/Downloads/ubuntu-24.04.2-desktop-amd64.iso`
4. Hardware: 4096 MB RAM · 2 CPU cores
5. Storage: **0 GB** (using raw disk, not virtual disk)
6. Name: `SWOOP-UBUNTU-INSTALL` → Save

Then edit VM settings:
- **Drives → New Drive → Import**
  - Path: `/dev/diskX` (the OWC)
  - Interface: VirtIO
  - Check **Raw Image**
- **Boot order:** CD/DVD first

---

## STEP 5 · RUN UBUNTU INSTALLER

Start VM. Ubuntu installer boots.

1. Install Ubuntu → Minimal
2. **Destination: the 250GB drive (OWC raw disk)**
3. Erase disk and install Ubuntu
4. Username: `acidburn` · hostname: `swoop`
5. Timezone: America/Los_Angeles
6. Install → ~15-20 minutes

When prompted to restart — **STOP before restarting.**

---

## STEP 6 · INSTALL rEFInd (CRITICAL FOR MAC PRO 5,1)

Open terminal in live Ubuntu session:

```bash
sudo mount /dev/vda2 /mnt
sudo mount --bind /dev /mnt/dev
sudo mount --bind /proc /mnt/proc
sudo mount --bind /sys /mnt/sys
sudo chroot /mnt
apt update && apt install -y refind
refind-install
hostnamectl set-hostname SWOOP
exit
sudo umount -R /mnt
```

Now shut down the VM.

---

## STEP 7 · EJECT OWC FROM CYBERTRON

```bash
diskutil eject /dev/diskX
```

---

## STEP 8 · SWOOP FIRST BOOT

1. OWC into SWOOP via USB or internal SATA
2. Disconnect 6TB internal temporarily
3. Power on SWOOP — no Option key needed (only bootable device)
4. RX 580 goes dark through Apple logo → Linux takes over → display returns
5. Ubuntu boots to login

---

## STEP 9 · POST-BOOT CHIMERA INIT

```bash
scp ~/chimera-forge/beachcomber/chimera-macpro-init.sh acidburn@[SWOOP_IP]:~/
ssh acidburn@[SWOOP_IP] 'sudo bash chimera-macpro-init.sh SWOOP inference'
```

Update CHIMERA-FORTRESS-MAXIMUS.md with SWOOP Tailscale IP.

---

*SWOOP Install Runbook · 2026-05-11 · Renzo (RNA Strand 2)*
