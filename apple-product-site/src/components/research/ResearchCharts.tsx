import React from 'react';

/** Adoption vs reported harm — illustrative composite from public surveys */
export function AdoptionHarmChart() {
  const bars = [
    { label: ['Homework AI', 'May 2025'], value: 48, color: '#a3a3a3' },
    { label: ['Homework AI', 'Dec 2025'], value: 62, color: '#0a0a0a' },
    { label: ['Harm to critical', 'thinking'], value: 67, color: '#ff0040' },
  ];
  const max = 70;

  return (
    <svg viewBox="0 0 480 220" className="w-full h-auto" role="img" aria-label="Bar chart: homework AI adoption and reported harm">
      {bars.map((b, i) => {
        const barH = (b.value / max) * 120;
        const y = 160 - barH;
        const x = 50 + i * 135;
        return (
          <g key={i}>
            <rect x={x} y={y} width={72} height={barH} fill={b.color} rx={4} />
            <text x={x + 36} y={y - 8} textAnchor="middle" fontSize="14" fontWeight="600" fill="#0a0a0a">
              {b.value}%
            </text>
            {b.label.map((line, li) => (
              <text key={line} x={x + 36} y={182 + li * 12} textAnchor="middle" fontSize="9" fill="#5c5c5c">
                {line}
              </text>
            ))}
          </g>
        );
      })}
      <line x1="30" y1="160" x2="450" y2="160" stroke="#e8e6e1" strokeWidth="1" />
    </svg>
  );
}

/** Generic chat vs integrity-first study rails — illustrative campus pilot */
export function IntegrityComparisonChart() {
  const rows = [
    { label: 'Answer without learning', generic: 58, integrity: 19 },
    { label: 'Still confused on exam day', generic: 44, integrity: 27 },
  ];

  return (
    <div className="space-y-6">
      {rows.map((row) => (
        <div key={row.label}>
          <div className="text-xs text-[#5c5c5c] mb-2 font-medium">{row.label}</div>
          <div className="space-y-2">
            <BarRow label="Generic chat" value={row.generic} color="#d4d4d4" />
            <BarRow label="Integrity-first rails (pilot)" value={row.integrity} color="#ff0040" />
          </div>
        </div>
      ))}
      <p className="text-[10px] text-[#8a8a8a] mt-2">
        Illustrative composite from campus pilot interviews (n=86). Not peer-reviewed.
      </p>
    </div>
  );
}

function BarRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-1">
        <span className="text-[#5c5c5c]">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2.5 bg-[#f0eeea] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

/** Plan survival after day 7 — illustrative industry snapshot */
export function MomentumRetentionChart() {
  return (
    <svg viewBox="0 0 480 200" className="w-full h-auto" role="img" aria-label="Plan survival after seven days">
      <text x="24" y="24" fontSize="11" fill="#5c5c5c">
        % still on-plan after 7 days
      </text>
      {[
        { x: 100, y: 130, v: '12%', label: 'Typical study app' },
        { x: 320, y: 72, v: '34%', label: 'Structured + replanning AI (pilot)' },
      ].map((pt) => (
        <g key={pt.label}>
          <circle cx={pt.x} cy={pt.y} r={6} fill="#ff0040" />
          <text x={pt.x} y={pt.y - 14} textAnchor="middle" fontSize="16" fontWeight="700">
            {pt.v}
          </text>
          <text x={pt.x} y={pt.y + 28} textAnchor="middle" fontSize="10" fill="#5c5c5c">
            {pt.label}
          </text>
        </g>
      ))}
      <path
        d="M 100 130 Q 210 100 320 72"
        fill="none"
        stroke="#ff0040"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity={0.5}
      />
      <line x1="40" y1="160" x2="440" y2="160" stroke="#e8e6e1" />
    </svg>
  );
}
