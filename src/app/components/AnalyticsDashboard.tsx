import { useEffect, useState } from "react";
import { Activity, Clock, Cpu, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DashboardData {
  totalSAR: number;
  avgTime: number;
  complianceScore: number;
  avgTokens: number;
  typology: Record<string, number>;
}

interface KPICardProps {
  label: string;
  value: number;
  unit?: string;
  decimals?: number;
  icon: React.ElementType;
  trend?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockData: DashboardData = {
  totalSAR: 1240,
  avgTime: 3.6,
  complianceScore: 87,
  avgTokens: 2450,
  typology: {
    Structuring: 35,
    "Shell Company": 25,
    TBML: 20,
    Funneling: 15,
    RapidMovement: 10,
    Roundtripping: 8,
  },
};

const BAR_COLORS = ["#111827", "#374151", "#4b5563", "#6b7280", "#9ca3af", "#d1d5db"];

// ─── Animated Number ──────────────────────────────────────────────────────────

function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = value / (700 / 16);
    const counter = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(counter);
      } else {
        setDisplay(decimals ? parseFloat(current.toFixed(decimals)) : Math.floor(current));
      }
    }, 16);
    return () => clearInterval(counter);
  }, [value, decimals]);

  return <>{display}</>;
}

// ─── Ring Progress ────────────────────────────────────────────────────────────

function RingProgress({ value }: { value: number }) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
      <svg width="72" height="72" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="36" cy="36" r={r} stroke="#f3f4f6" strokeWidth="6" fill="none" />
        <circle
          cx="36" cy="36" r={r}
          stroke="#111827" strokeWidth="6" fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 600, color: "#111827", fontFamily: "monospace",
      }}>
        {value}%
      </span>
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KPICard({ label, value, unit = "", decimals = 0, icon: Icon, trend }: KPICardProps) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 10,
      padding: "16px 18px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      width: "100%",
      boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontSize: 10, fontWeight: 600, color: "#9ca3af",
          textTransform: "uppercase", letterSpacing: "0.07em",
        }}>
          {label}
        </span>
        <Icon size={12} color="#e5e7eb" />
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
        <span style={{
          fontSize: 28, fontWeight: 700, color: "#111827",
          fontFamily: "monospace", lineHeight: 1,
        }}>
          <AnimatedNumber value={value} decimals={decimals} />
        </span>
        {unit && <span style={{ fontSize: 12, color: "#9ca3af" }}>{unit}</span>}
      </div>

      {trend && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <TrendingUp size={10} color="#9ca3af" />
          <span style={{ fontSize: 10, color: "#9ca3af", fontFamily: "monospace" }}>{trend}</span>
        </div>
      )}
    </div>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111827", borderRadius: 6, padding: "6px 10px" }}>
      <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", fontFamily: "monospace" }}>
        {payload[0].value}
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <span style={{
        fontSize: 10, fontWeight: 600, color: "#9ca3af",
        textTransform: "uppercase", letterSpacing: "0.09em", whiteSpace: "nowrap",
      }}>
        {title}
      </span>
      <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export  function AnalyticsDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setData(mockData), 600);
    return () => clearTimeout(t);
  }, []);

  if (!data) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "#fafafa", fontSize: 13, color: "#9ca3af",
      }}>
        Loading…
      </div>
    );
  }

  const typologyData = Object.entries(data.typology).map(([name, value]) => ({ name, value }));

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "#fafafa",
      padding: "28px 32px",
      fontFamily: "system-ui, sans-serif",
      boxSizing: "border-box",
    }}>

      {/* ── Header ── */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: 28,
      }}>
        <div>
          <h1 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0, letterSpacing: "-0.02em" }}>
            KPI Dashboard
          </h1>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: "3px 0 0" }}>
            SAR Analytics · Agent Performance
          </p>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          background: "#f3f4f6", borderRadius: 20, padding: "4px 10px",
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#22c55e", boxShadow: "0 0 0 2px #dcfce7",
          }} />
          <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600 }}>Live</span>
        </div>
      </div>

      {/* ── Output & Impact ── */}
      <section style={{ marginBottom: 20 }}>
        <SectionHeader title="Output & Impact" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          width: "100%",
        }}>
          <KPICard
            label="Total SARs Generated"
            value={data.totalSAR}
            icon={Activity}
            trend="+12% vs last month"
          />
          <KPICard
            label="Avg Time per SAR"
            value={data.avgTime}
            decimals={1}
            unit=" hrs"
            icon={Clock}
            trend="−0.4 hrs improved"
          />
        </div>
      </section>

      {/* ── Agent Performance ── */}
      <section style={{ marginBottom: 20 }}>
        <SectionHeader title="Agent Performance" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          width: "100%",
        }}>
          <div style={{
            background: "#fff", border: "1px solid #e5e7eb",
            borderRadius: 10, padding: "16px 18px",
            boxSizing: "border-box", width: "100%",
          }}>
            <span style={{
              fontSize: 10, fontWeight: 600, color: "#9ca3af",
              textTransform: "uppercase", letterSpacing: "0.07em",
              display: "block", marginBottom: 12,
            }}>
              Compliance Score
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <RingProgress value={data.complianceScore} />
              <div>
                <div style={{
                  fontSize: 28, fontWeight: 700, color: "#111827",
                  fontFamily: "monospace", lineHeight: 1,
                }}>
                  {data.complianceScore}
                  <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 400 }}>%</span>
                </div>
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 4, fontFamily: "monospace" }}>
                  Target: 90%
                </div>
              </div>
            </div>
          </div>

          <KPICard
            label="Avg Tokens Used"
            value={data.avgTokens}
            icon={Cpu}
            trend="within budget"
          />
        </div>
      </section>

      {/* ── Typology Distribution ── */}
      <section>
        <SectionHeader title="Typology Distribution" />
        <div style={{
          background: "#fff", border: "1px solid #e5e7eb",
          borderRadius: 10, padding: "16px 18px",
          width: "100%", boxSizing: "border-box",
        }}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={typologyData} barSize={28} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {typologyData.map((_, i) => (
                  <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

    </div>
  );
}