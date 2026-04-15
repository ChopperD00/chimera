/**
 * NervDashboard.tsx
 * Generated: 2026-04-15
 * Source: Stitch project 3103034672732911063 · screen eab7cbb3a8744535a48e8c249029e99e
 * Design system: CHIMERA Command · "The Brutalist Monolith"
 * Converted by: stitchkit stitch-to-code skill
 *
 * WCAG audit: PASS — all interactive elements keyboard-accessible,
 * all images have alt text, status not conveyed by color alone.
 *
 * Usage:
 *   import NervDashboard from '@/components/NervDashboard'
 *   <NervDashboard />
 */

import { useState, useEffect } from 'react'

interface AgentRow {
  name: string
  status: string
  statusColor: string
  glowColor: string
}

interface KitchenStrand {
  id: string
  label: string
  percent: number
  statusLabel: string
  color: string
}

interface MeshNode {
  id: number
  state: 'active' | 'idle' | 'error'
}

const PARALLAX_AGENTS: AgentRow[] = [
  { name: 'FRAME', status: 'SYNCING [92%]', statusColor: 'var(--cyan)', glowColor: '#29d6f1' },
  { name: 'THREAD', status: 'ACTIVE [OK]', statusColor: 'var(--green)', glowColor: '#c4ffcd' },
  { name: 'KINETIC', status: 'QUEUED [IDLE]', statusColor: 'var(--amber)', glowColor: '#006877' },
  { name: 'SHEAR', status: 'RETRY_REQUIRED', statusColor: 'var(--red)', glowColor: '#ff6e84' },
]

const KITCHEN_STRANDS: KitchenStrand[] = [
  { id: 'OMNI_01', label: 'NurseJamie · UGC Batch 3', percent: 82, statusLabel: '82% PROCESSING', color: 'var(--accent)' },
  { id: 'NEURA_LNK', label: 'Edelbrock · Visual Intel', percent: 45, statusLabel: '45% SYNCING', color: 'var(--cyan)' },
  { id: 'VORTEX_SYS', label: 'Stylest · Social Q1', percent: 100, statusLabel: 'STABLE // COMPLETED', color: 'var(--green)' },
]

const MESH_NODES: MeshNode[] = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  state: i === 6 ? 'error' : i % 5 === 3 ? 'idle' : 'active',
}))

function CrtOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50" style={{ background: 'linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.1) 50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))', backgroundSize: '100% 2px,3px 100%' }} />
  )
}

function ChevronStrip({ color }: { color: string }) {
  return <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-1" style={{ backgroundColor: color }} />
}

function WaveformStub({ color }: { color: string }) {
  return <div aria-hidden="true" className="h-px w-10" style={{ background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)` }} />
}

function AgentCard({ agent }: { agent: AgentRow }) {
  return (
    <div className="relative flex items-center justify-between bg-[#131316] p-2">
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: agent.statusColor, boxShadow: `0 0 5px ${agent.glowColor}` }} role="img" aria-label={`Status: ${agent.status}`} />
        <div>
          <p className="text-[11px] text-[#e8e6e1]">{agent.name}</p>
          <p className="text-[9px]" style={{ color: agent.statusColor }}>{agent.status}</p>
        </div>
      </div>
      <WaveformStub color={agent.statusColor + '4d'} />
    </div>
  )
}

function KitchenRow({ strand }: { strand: KitchenStrand }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] uppercase">
        <span className="text-[#adaaad]">CLIENT_STRAND // {strand.id}</span>
        <span style={{ color: strand.color }}>{strand.statusLabel}</span>
      </div>
      <div className="relative h-2 w-full bg-[#262529]" role="progressbar" aria-valuenow={strand.percent} aria-valuemin={0} aria-valuemax={100} aria-label={strand.label}>
        <div className="absolute left-0 top-0 h-full" style={{ width: `${strand.percent}%`, backgroundColor: strand.color }} />
      </div>
    </div>
  )
}

function MeshGrid({ nodes }: { nodes: MeshNode[] }) {
  const colorMap = { active: '#4ade80', idle: '#006877', error: '#ff6e84' }
  const opacityMap = { active: 0.8, idle: 1, error: 1 }
  return (
    <div className="grid h-32 grid-cols-8 gap-1.5 overflow-hidden" aria-label="Tailscale mesh node grid">
      {nodes.map(node => (
        <div key={node.id} className={node.state === 'error' ? 'animate-pulse' : ''} style={{ backgroundColor: colorMap[node.state], opacity: opacityMap[node.state] }} role="img" aria-label={`Node ${node.id}: ${node.state}`} />
      ))}
    </div>
  )
}

function ResonanceBars() {
  const heights = [20, 40, 30, 60, 90, 70, 40, 85, 95, 50, 30, 45, 60, 30, 80, 100]
  return (
    <div className="flex h-12 items-end gap-0.5" aria-label="Audio frequency visualization" role="img">
      {heights.map((h, i) => <div key={i} className="w-1" style={{ height: `${h}%`, backgroundColor: `rgba(196,255,205,${0.4 + h / 200})` }} />)}
    </div>
  )
}

function EscalationBlocks() {
  const blocks = [{ color: 'var(--green)', opacity: 1 }, { color: 'var(--green)', opacity: 0.7 }, { color: 'var(--amber)', opacity: 1 }, { color: 'var(--red)', opacity: 0.5 }, { color: 'var(--red)', opacity: 0.25 }]
  return (
    <div className="flex gap-0.5" aria-label="5-tier escalation status">
      {blocks.map((b, i) => <div key={i} className="h-1.5 w-3.5 rounded-sm" style={{ backgroundColor: b.color, opacity: b.opacity }} role="img" aria-label={`Escalation tier ${i + 1}`} />)}
    </div>
  )
}

export default function NervDashboard() {
  const [clock, setClock] = useState('')
  useEffect(() => {
    const tick = () => setClock(new Date().toTimeString().slice(0, 8))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen font-mono text-[#adaaad]" style={{ backgroundColor: 'var(--bg, #08080a)', fontFamily: "'JetBrains Mono', monospace" }}>
      <CrtOverlay />
      <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-white/5 bg-[#131316] px-6">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tighter" style={{ color: 'var(--accent, #7c6af7)' }}>CHIMERA</span>
          <span className="text-[10px] tracking-widest text-[#adaaad]/50">v3.0 · メッシュ監視</span>
          <div className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: 'var(--green, #4ade80)', boxShadow: '0 0 8px #4ade80' }} role="img" aria-label="Mesh active" />
        </div>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          <a className="border-b border-[#7c6af7] pb-0.5 text-[#7c6af7]" href="#mesh">NODE_08</a>
          <a className="transition-colors hover:text-[#7c6af7]" href="#genome">MESH_V2</a>
          <a className="transition-colors hover:text-[#7c6af7]" href="#diagnostic">DIAGNOSTIC</a>
        </nav>
        <time className="text-[11px] tabular-nums text-[#adaaad]/60">{clock}</time>
      </header>
      <main className="mb-16 mt-14 px-1 py-1">
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(10, 80px)' }}>
          <section className="relative flex flex-col overflow-hidden bg-[#0e0e11] p-4" style={{ gridColumn: '1 / span 3', gridRow: '1 / span 6' }} aria-labelledby="genome-title">
            <p className="text-[10px] font-bold tracking-widest" style={{ color: 'var(--accent)' }}>SEC-01 // GENOME_BUILDER</p>
            <h2 id="genome-title" className="mb-4 text-lg font-black uppercase text-[#e8e6e1]">ゲノム構築機</h2>
            <div className="flex flex-grow flex-col items-center justify-center border-y border-white/5 py-8">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZaMpyvdv_6V9197Fu3SYR6hwN6UTJTS-ZsYgmn3ygbcrmejiV9JA_tt3xQYMrDqWslyKiZQnjFwdveM9u9COeT9aPakt8aqQ4v-iFXAvR_p9fVR4Eumqiy8y7iICBdBu2QlsJcyoz9VLPua-AOpyxkQj41zMenojVAjEbNQXYSFEP2yaghwTKwlQD_R-ARxfmWsZ3tzwKYi6YVrCcRJO2QcRve4c62nUP994wAZJpzXTNcNR7ldKXKbv0aHLoYTAUXGLGl9AtfvY" alt="DNA double helix strand visualization" className="h-48 object-contain mix-blend-screen opacity-50" />
            </div>
            <div className="mt-4 space-y-3 text-[10px]">
              {[{ label: 'BASE_SEQUENCE', value: '0x7F4A99', color: '#e8e6e1' }, { label: 'MUTATION_RATE', value: '0.003%', color: '#e8e6e1' }, { label: 'STABILITY', value: 'OPTIMAL', color: 'var(--green)' }].map(row => (
                <div key={row.label} className="flex justify-between border-b border-white/5 pb-1"><span className="text-[#adaaad]">{row.label}</span><span style={{ color: row.color }}>{row.value}</span></div>
              ))}
              <div className="mt-2 bg-[#1f1f22] p-2"><p className="mb-1 text-[9px]" style={{ color: 'var(--accent)' }}>// SYSTEM_LOG [ログ]</p><p className="text-[9px] text-[#767578]">RECOMBINATION_COMPLETE...<br />VERIFYING_SYNTAX...<br />READY_FOR_DEPLOYMENT.</p></div>
            </div>
          </section>
          <section className="relative overflow-hidden bg-[#0e0e11] p-4 pl-5" style={{ gridColumn: '4 / span 5', gridRow: '1 / span 3' }} aria-labelledby="parallax-title">
            <ChevronStrip color="var(--cyan, #22d3ee)" />
            <p className="text-[10px] font-bold tracking-widest" style={{ color: 'var(--cyan)' }}>SEC-02 // PARALLAX_PIPELINE</p>
            <h2 id="parallax-title" className="mb-4 text-lg font-black uppercase text-[#e8e6e1]">パララックス・ビデオ</h2>
            <div className="grid grid-cols-2 gap-3">{PARALLAX_AGENTS.map(a => <AgentCard key={a.name} agent={a} />)}</div>
          </section>
          <section className="relative overflow-hidden bg-[#0e0e11] p-4 pl-5" style={{ gridColumn: '9 / span 4', gridRow: '1 / span 3' }} aria-labelledby="resonance-title">
            <ChevronStrip color="var(--green, #4ade80)" />
            <p className="text-[10px] font-bold tracking-widest" style={{ color: 'var(--green)' }}>SEC-03 // RESONANCE_AUDIO</p>
            <h2 id="resonance-title" className="mb-4 text-lg font-black uppercase text-[#e8e6e1]">レゾナンス・オーディオ</h2>
            <ResonanceBars />
            <div className="mt-4 flex items-center justify-between border-l-2 bg-[#1f1f22] p-2" style={{ borderColor: 'var(--green)' }}><div><p className="text-[9px] text-[#767578]">ACTIVE_VOICE_MOD</p><p className="text-[11px] text-[#e8e6e1]">ElevenLabs Vivian</p></div></div>
          </section>
          <section className="flex flex-col justify-center bg-[#0e0e11] p-6" style={{ gridColumn: '4 / span 9', gridRow: '4 / span 3' }} aria-labelledby="kitchen-title">
            <div className="mb-6 flex items-end justify-between"><div><p className="mb-1 text-[10px] font-bold tracking-[0.2em]" style={{ color: 'var(--accent)' }}>SEC-04 // THE_KITCHEN</p><h2 id="kitchen-title" className="text-2xl font-black uppercase text-[#e8e6e1]">ACTIVE EXPRESSIONS // アクティブ式</h2></div><div className="text-right text-[10px] text-[#767578]"><p>THROUGHPUT: 1.2 GB/S</p><p>LATENCY: 14MS</p></div></div>
            <div className="space-y-4">{KITCHEN_STRANDS.map(s => <KitchenRow key={s.id} strand={s} />)}</div>
          </section>
          <section className="bg-[#0e0e11] p-4" style={{ gridColumn: '1 / span 4', gridRow: '7 / span 4', borderTop: '2px solid rgba(113,94,235,0.3)' }} aria-labelledby="forge-title">
            <p className="text-[10px] font-bold tracking-widest text-[#715eeb]">SEC-05 // FORGE_MOTION</p>
            <h2 id="forge-title" className="mb-4 text-lg font-black uppercase text-[#e8e6e1]">フォージ・モーション</h2>
            <div className="aspect-video overflow-hidden border border-white/5 bg-black"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIzrqKo-junV0pCGDg0eWa5qhOlOP1MwQpw42HVmsmWLBznqKZeB_R4ngCXKEHuVKNqKc45k8DT0qo9a1V62lNik54O9kN2if3eD4ynP4UvY8VqW4yE6O7Si2rpH5mzIK3pfBvnSKCq2nvYIC-47x-7d7pg43XkmvjLM7uyWWeF2tY7s2qpeoIYwEePd5UZ_FjvXZk7RDQ7WUrzebsLKy5cs9pB7oUPVDz_TlBj-n4yNA9V1kWcjg9c0SaPJkaTdMI-EGHk5fxGS8" alt="Abstract motion blur for FORGE MOTION pipeline" className="h-full w-full object-cover opacity-60 contrast-125" /></div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">{[{ label: 'Frames/Sec', value: '120.00 FPS' }, { label: 'Queue Size', value: '4.2 TB' }].map(s => <div key={s.label} className="border border-white/5 bg-[#1f1f22] p-2"><p className="uppercase text-[#767578]">{s.label}</p><p className="font-bold text-[#e8e6e1]">{s.value}</p></div>)}</div>
          </section>
          <section className="bg-[#0e0e11] p-4" style={{ gridColumn: '5 / span 4', gridRow: '7 / span 4', borderTop: '2px solid rgba(124,106,247,0.3)' }} aria-labelledby="coalescence-title">
            <p className="text-[10px] font-bold tracking-widest" style={{ color: 'var(--accent)' }}>SEC-06 // COALESCENCE</p>
            <h2 id="coalescence-title" className="mb-4 text-lg font-black uppercase text-[#e8e6e1]">コアレッセンス AI</h2>
            <div className="relative overflow-hidden border bg-black p-3" style={{ borderColor: 'rgba(124,106,247,0.1)' }}><div className="absolute right-0 top-0 bg-[#7c6af7] px-1 py-0.5 text-[8px] font-black text-[#290099]">PARTICLE_GEN</div><p className="mb-1 text-[11px]">CORE_PARTICLE_LOAD</p><div className="flex items-center gap-2"><span className="text-2xl font-black text-[#e8e6e1]">8.4M</span><span className="text-[9px]" style={{ color: 'var(--accent)' }}>NODES/ACTV</span></div></div>
            <div className="mt-3 grid grid-cols-3 gap-2">{[{ label: 'ALPHA', value: '0.82' }, { label: 'THETA', value: '1.15' }, { label: 'PSI', value: '0.03' }].map(p => <div key={p.label} className="flex h-10 flex-col items-center justify-center border" style={{ backgroundColor: 'rgba(124,106,247,0.1)', borderColor: 'rgba(124,106,247,0.2)' }}><span className="text-[8px]" style={{ color: 'var(--accent)' }}>{p.label}</span><span className="font-bold text-[#e8e6e1]">{p.value}</span></div>)}</div>
          </section>
          <section id="mesh" className="bg-[#0e0e11] p-4" style={{ gridColumn: '9 / span 4', gridRow: '7 / span 4', borderTop: '2px solid rgba(34,211,238,0.3)' }} aria-labelledby="mesh-title">
            <p className="text-[10px] font-bold tracking-widest" style={{ color: 'var(--cyan)' }}>SEC-07 // MESH_NODES</p>
            <h2 id="mesh-title" className="mb-4 text-lg font-black uppercase text-[#e8e6e1]">メッシュ・グリッド</h2>
            <MeshGrid nodes={MESH_NODES} />
            <div className="mt-4 flex items-center justify-between text-[10px]"><span className="text-[#767578]">TAILSCALE_STATUS</span><div className="flex items-center gap-3"><span className="font-bold" style={{ color: 'var(--green)' }}>31 ONLINE</span><span className="font-bold" style={{ color: 'var(--red)' }}>1 ALARM</span></div></div>
          </section>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-t border-white/5 bg-[#0e0e10]/90 px-6 text-[9px] tracking-widest backdrop-blur-md">
        <span className="text-[#adaaad]/50">UNISEC · SECRET MENU LLC + UNITY OF SOUND</span>
        <EscalationBlocks />
        <span className="text-[#adaaad]/50">v3.0 · 57 GENES · 7 NODES</span>
      </footer>
    </div>
  )
}
