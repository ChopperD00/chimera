#!/bin/bash
# UNISEC Node Setup — Mirrored Stack v1.1
# Run on UNICRON and Michelle's iMac
# Idempotent — safe to run multiple times

CYAN='\033[0;36m'; GREEN='\033[0;32m'; AMBER='\033[0;33m'; RESET='\033[0m'
log()  { echo -e "${CYAN}[UNISEC]${RESET} $1"; }
ok()   { echo -e "${GREEN}[OK]${RESET} $1"; }
warn() { echo -e "${AMBER}[WARN]${RESET} $1"; }

echo ""; echo "  UNISEC Node Setup v1.1 — $(hostname)"; echo ""

# 1. Homebrew
if ! command -v brew &>/dev/null; then
  [ -f /opt/homebrew/bin/brew ] && eval "$(/opt/homebrew/bin/brew shellenv)" || \
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" && \
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi
ok "Homebrew: $(brew --version | head -1)"

# 2. Node.js
command -v node &>/dev/null || brew install node
ok "Node: $(node --version)  npm: $(npm --version)"

# 3. Claude Code CLI
CLAUDE_BIN=""
for p in \
  "$HOME/.antigravity/extensions/anthropic.claude-code-"*"-darwin-arm64/resources/native-binary/claude" \
  "$HOME/Library/Application Support/Claude/claude-code-vm/"*"/claude" \
  "/usr/local/bin/claude"; do
  for match in $p; do [ -f "$match" ] && CLAUDE_BIN="$match" && break 2; done
done
[ -z "$CLAUDE_BIN" ] && npm install -g @anthropic-ai/claude-code && CLAUDE_BIN=$(which claude)
ok "Claude Code: $CLAUDE_BIN"
! command -v claude &>/dev/null && [ -n "$CLAUDE_BIN" ] && \
  grep -q "$(dirname $CLAUDE_BIN)" ~/.zshrc 2>/dev/null || \
  echo "export PATH=\"$(dirname $CLAUDE_BIN):\$PATH\"" >> ~/.zshrc

# 4. Flaude plugin
FLAUDE_DIR="$HOME/flaude"
if [ -d "$FLAUDE_DIR" ]; then
  sudo chown -R "$(whoami):staff" "$FLAUDE_DIR" 2>/dev/null || true
  git config --global --add safe.directory "$FLAUDE_DIR" 2>/dev/null || true
  cd "$FLAUDE_DIR" && git pull --quiet 2>&1 | grep -v 'Already up to date' || true
else
  git clone https://github.com/Ana-creates/flaude.git "$FLAUDE_DIR"
fi
cd "$FLAUDE_DIR" && npm install --silent && npm run build --silent
ok "Flaude built → $FLAUDE_DIR/build/"
echo "  Load in Figma: Plugins > Development > Import from manifest"
echo "  File: $FLAUDE_DIR/manifest.json"

# 5. flaude-mcp
MCP_DIR="$HOME/flaude-mcp"
if [ -d "$MCP_DIR" ]; then
  sudo chown -R "$(whoami):staff" "$MCP_DIR" 2>/dev/null || true
  git config --global --add safe.directory "$MCP_DIR" 2>/dev/null || true
  cd "$MCP_DIR" && git pull --quiet 2>&1 | grep -v 'Already up to date' || true
else
  git clone https://github.com/Ana-creates/flaude-mcp.git "$MCP_DIR"
fi
cd "$MCP_DIR" && npm install --silent && npm run build --silent
ok "flaude-mcp built → $MCP_DIR/dist/index.js"

# 6. Claude Code MCP config
CLAUDE_JSON="$HOME/.claude.json"
[ ! -f "$CLAUDE_JSON" ] && echo '{}' > "$CLAUDE_JSON"
node -e "
const fs=require('fs'),p='$CLAUDE_JSON';
let c={}; try{c=JSON.parse(fs.readFileSync(p,'utf8'));}catch(e){}
c.mcpServers=c.mcpServers||{};
c.mcpServers['figma-editor']={command:'node',args:['$MCP_DIR/dist/index.js'],env:{}};
fs.writeFileSync(p,JSON.stringify(c,null,2));
console.log('MCP servers: '+Object.keys(c.mcpServers).join(', '));
"
ok "figma-editor registered in ~/.claude.json"

# 7. Console bookmark
cat > "$HOME/Desktop/ACIDBURN Console.webloc" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict><key>URL</key><string>http://100.69.29.1:3141</string></dict></plist>
EOF
ok "Desktop bookmark → ACIDBURN Console"

# 8. Shell + dirs
grep -q 'brew shellenv' ~/.zshrc 2>/dev/null || echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
grep -q 'chimera-forge' ~/.zshrc 2>/dev/null || echo 'alias forge="cd ~/chimera-forge"' >> ~/.zshrc
mkdir -p ~/chimera-forge
ok "~/chimera-forge ready"

echo ""
echo "  Setup complete. Run: source ~/.zshrc && claude mcp list"
echo ""
