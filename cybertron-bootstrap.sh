#!/bin/bash
# ============================================================
# CHIMERA · CYBERTRON BOOTSTRAP
# iMac 27" Retina 5K Late 2014 · Intel · macOS Sonoma (OCLP)
# Run once: bash cybertron-bootstrap.sh
# ============================================================

set -e
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${CYAN}[CYBERTRON]${NC} $1"; }
ok()  { echo -e "${GREEN}[OK]${NC} $1"; }
warn(){ echo -e "${YELLOW}[WARN]${NC} $1"; }
err() { echo -e "${RED}[ERR]${NC} $1"; }

echo ""
echo "  ██████╗██╗  ██╗██╗███╗   ███╗███████╗██████╗  █████╗ "
echo "  ██╔════╝██║  ██║██║████╗ ████║██╔════╝██╔══██╗██╔══██╗"
echo "  ██║     ███████║██║██╔████╔██║█████╗  ██████╔╝███████║"
echo "  ██║     ██╔══██║██║██║╚██╔╝██║██╔══╝  ██╔══██╗██╔══██║"
echo "  ╚██████╗██║  ██║██║██║ ╚═╝ ██║███████╗██║  ██║██║  ██║"
echo "   ╚═════╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝"
echo ""
echo "  VALLEJO POLE · OPERATOR CONSOLE · CHIMERA MESH NODE"
echo "  ──────────────────────────────────────────────────────"
echo ""

# ── 1. HOSTNAME ─────────────────────────────────────────────────────
log "Setting hostname to CYBERTRON..."
sudo scutil --set HostName CYBERTRON
sudo scutil --set LocalHostName CYBERTRON
sudo scutil --set ComputerName CYBERTRON
ok "Hostname set"

# ── 2. HOMEBREW ──────────────────────────────────────────────────
log "Checking Homebrew..."
if command -v brew &>/dev/null; then
  ok "Homebrew already installed — updating"
  brew update --quiet
else
  log "Installing Homebrew (Intel path)..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
  eval "$(/usr/local/bin/brew shellenv)"
  ok "Homebrew installed"
fi

# ── 3. NODE.JS ─────────────────────────────────────────────────────
log "Checking Node.js..."
if command -v node &>/dev/null; then
  ok "Node $(node --version) already installed"
else
  log "Installing Node.js..."
  brew install node
  ok "Node $(node --version) installed"
fi

# ── 4. CLAUDE CODE ─────────────────────────────────────────────────
log "Checking Claude Code..."
if command -v claude &>/dev/null; then
  ok "Claude Code already installed — updating"
  npm update -g @anthropic-ai/claude-code --silent
else
  log "Installing Claude Code..."
  npm install -g @anthropic-ai/claude-code
  ok "Claude Code installed"
fi

# ── 5. GIT ───────────────────────────────────────────────────────────
log "Checking Git..."
if command -v git &>/dev/null; then
  ok "Git already present"
else
  brew install git
  ok "Git installed"
fi

# ── 6. PYTHON + FLASK ───────────────────────────────────────────────
log "Checking Python..."
if command -v python3 &>/dev/null; then
  ok "Python $(python3 --version) present"
else
  brew install python3
fi
pip3 install flask --break-system-packages --quiet 2>/dev/null || pip3 install flask --quiet
ok "Flask ready"

# ── 7. CHIMERA NODE DIR ──────────────────────────────────────────────
mkdir -p ~/chimera-node
ok "~/chimera-node ready"

# ── 8. PULL CONTEXT FROM GITHUB ───────────────────────────────────
log "Pulling CHIMERA-FORTRESS-MAXIMUS..."
curl -fsSL -o ~/chimera-node/CHIMERA-FORTRESS-MAXIMUS.md \
  https://raw.githubusercontent.com/ChopperD00/chimera/main/CHIMERA-FORTRESS-MAXIMUS.md
ok "FORTRESS-MAXIMUS ready"

log "Pulling CLAUDE.md seed..."
curl -fsSL -o ~/chimera-node/CLAUDE.md \
  https://raw.githubusercontent.com/ChopperD00/chimera/main/CYBERTRON-CLAUDE.md
ok "CLAUDE.md ready"

# ── 9. HEALTH ENDPOINT ───────────────────────────────────────────────
log "Writing health endpoint..."
cat > ~/chimera-node/health.py << 'PYEOF'
from flask import Flask, jsonify
import platform, subprocess, json
app = Flask(__name__)

@app.route('/health')
def health():
    try:
        ts = subprocess.check_output(['tailscale','status','--json'],timeout=3).decode()
        ts_ip = json.loads(ts).get('Self',{}).get('TailscaleIPs',['unknown'])[0]
    except:
        ts_ip = 'not connected'
    return jsonify({
        'node': 'CYBERTRON',
        'role': 'operator-console',
        'host': platform.node(),
        'tailscale_ip': ts_ip,
        'status': 'online'
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8094)
PYEOF
ok "Health endpoint written"

# ── 10. DESKTOP COMMANDER MCP ─────────────────────────────────────────
log "Registering Desktop Commander MCP..."
claude mcp add desktop-commander npx @wonderwhy-er/desktop-commander 2>/dev/null || \
  warn "Desktop Commander already registered or run 'claude' first to set API key"

# ── 11. TAILSCALE CHECK ──────────────────────────────────────────────
log "Checking Tailscale..."
if command -v tailscale &>/dev/null; then
  ok "Tailscale installed: $(tailscale status 2>/dev/null | head -1 || echo 'not connected — sign in')"
else
  warn "Tailscale not installed"
  brew install --cask tailscale
  warn "Open Tailscale from Applications → sign in → connect"
fi

# ── 12. NERV DASHBOARD ───────────────────────────────────────────────
open -a Safari 'http://100.69.29.1:3141/mono' 2>/dev/null || \
  warn "ACIDBURN unreachable — connect Tailscale first, then open http://100.69.29.1:3141/mono"

# ── DONE ─────────────────────────────────────────────────────────────
echo ""
echo "  ──────────────────────────────────────────────────────"
echo -e "  ${GREEN}CYBERTRON BOOTSTRAP COMPLETE${NC}"
echo "  ──────────────────────────────────────────────────────"
echo ""
echo "  NEXT:"
echo "  1. Tailscale → sign in → connect"
echo "  2. python3 ~/chimera-node/health.py"
echo "  3. cd ~/chimera-node && claude"
echo "  4. First prompt: Load CHIMERA-FORTRESS-MAXIMUS.md"
echo ""
echo "  MESH:"
echo "  ACIDBURN  100.69.29.1     ssh acidburn@100.69.29.1"
echo "  UNICRON   100.70.194.81   ssh unicron@100.70.194.81"
echo "  NERV      http://100.69.29.1:3141/mono"
echo ""
