import { Shield, Brain, FileText, CheckCircle, Database, Lock, ArrowRight, Menu, X, TrendingUp, Users, Zap, Award, Search } from 'lucide-react';
import { useState } from 'react';
import barclaysBuilding from  '../../assets/a99940d037be85e8b7a7c4d577116225b365d6e0.png';
import barclaysLogo from '../../assets/8aaed975500a30811cee81ad6dd27c38362b1e50.png';
import MovingStarsBackground from "./MovingStars";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
interface LandingPageProps {
  onSignIn: () => void;
  onGetStarted: () => void;
}

declare global {
  interface Window {
    FinisherHeader: any;
  }
}



const mainStyle = {
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  color: "#e2e8f0",
  borderRadius: "12px",
  padding: "22px 28px",
  width: 260,
  fontSize: 16,
  textAlign: "center" as const,
  border: "1px solid rgba(99,179,237,0.3)",
  boxShadow: "0 0 18px rgba(99,179,237,0.08)",
};

const agentStyle = {
  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  color: "#cbd5e1",
  borderRadius: "12px",
  padding: "18px 22px",
  width: 230,
  fontSize: 15,
  textAlign: "center" as const,
  border: "1px solid rgba(148,163,184,0.2)",
  boxShadow: "0 0 12px rgba(148,163,184,0.06)",
};

const nodes = [
  {
    id: "1",
    position: { x: 0, y: 220 },
    data: { label: (<div><b>📂 Case Intake</b><div style={{fontSize:13,opacity:.65,marginTop:5}}>Upload alerts & KYC data</div></div>) },
    style: mainStyle
  },
  {
    id: "2",
    position: { x: 340, y: 220 },
    data: { label: (<div><b>🧠 ML Classification</b><div style={{fontSize:13,opacity:.65,marginTop:5}}>Detect SAR worthy cases</div></div>) },
    style: mainStyle
  },
  {
    id: "3",
    position: { x: 680, y: 220 },
    data: { label: (<div><b>⚙ Planning Agent</b><div style={{fontSize:13,opacity:.65,marginTop:5}}>Orchestrates analysis agents</div></div>) },
    style: mainStyle
  },
  {
    id: "4",
    position: { x: 1020, y: 40 },
    data: { label: (<div><b>🔍 Typology Analysis</b><div style={{fontSize:13,opacity:.65,marginTop:5}}>Identify fraud patterns</div></div>) },
    style: agentStyle
  },
  {
    id: "5",
    position: { x: 1020, y: 220 },
    data: { label: (<div><b>🌐 Enrichment</b><div style={{fontSize:13,opacity:.65,marginTop:5}}>Pull external intelligence</div></div>) },
    style: agentStyle
  },
  {
    id: "6",
    position: { x: 1020, y: 400 },
    data: { label: (<div><b>🔄 Event Cognition</b><div style={{fontSize:13,opacity:.65,marginTop:5}}>Reconstruct transaction flow</div></div>) },
    style: agentStyle
  },
  {
    id: "7",
    position: { x: 1360, y: 220 },
    data: { label: (<div><b>✍ Narrative Generation</b><div style={{fontSize:13,opacity:.65,marginTop:5}}>Generate SAR narrative</div></div>) },
    style: mainStyle
  },
  {
    id: "8",
    position: { x: 1700, y: 220 },
    data: { label: (<div><b>🛡 Compliance Validation</b><div style={{fontSize:13,opacity:.65,marginTop:5}}>Check regulatory rules</div></div>) },
    style: mainStyle
  },
  {
    id: "9",
    position: { x: 2040, y: 220 },
    data: { label: (<div><b>👨‍💻 Human Investigator</b><div style={{fontSize:13,opacity:.65,marginTop:5}}>Manual review & approval</div></div>) },
    style: mainStyle
  },
  {
    id: "10",
    position: { x: 2380, y: 220 },
    data: { label: (<div><b>📄 Final SAR</b><div style={{fontSize:13,opacity:.65,marginTop:5}}>Submit compliant report</div></div>) },
    style: mainStyle
  }
];

const edges = [
  { id:"e1", source:"1", target:"2", type:"smoothstep", animated:true, style:{stroke:"#63b3ed",strokeWidth:2,opacity:0.7} },
  { id:"e2", source:"2", target:"3", type:"smoothstep", animated:true, style:{stroke:"#63b3ed",strokeWidth:2,opacity:0.7} },
  { id:"e3", source:"3", target:"4", type:"smoothstep", animated:true, style:{stroke:"#94a3b8",strokeWidth:1.5,opacity:0.6} },
  { id:"e4", source:"3", target:"5", type:"smoothstep", animated:true, style:{stroke:"#94a3b8",strokeWidth:1.5,opacity:0.6} },
  { id:"e5", source:"3", target:"6", type:"smoothstep", animated:true, style:{stroke:"#94a3b8",strokeWidth:1.5,opacity:0.6} },
  { id:"e6", source:"4", target:"7", type:"smoothstep", animated:true, style:{stroke:"#94a3b8",strokeWidth:1.5,opacity:0.6} },
  { id:"e7", source:"5", target:"7", type:"smoothstep", animated:true, style:{stroke:"#94a3b8",strokeWidth:1.5,opacity:0.6} },
  { id:"e8", source:"6", target:"7", type:"smoothstep", animated:true, style:{stroke:"#94a3b8",strokeWidth:1.5,opacity:0.6} },
  { id:"e9", source:"7", target:"8", type:"smoothstep", animated:true, style:{stroke:"#63b3ed",strokeWidth:2,opacity:0.7} },
  { id:"e10", source:"8", target:"9", type:"smoothstep", animated:true, style:{stroke:"#63b3ed",strokeWidth:2,opacity:0.7} },
  { id:"e11", source:"9", target:"10", type:"smoothstep", animated:true, style:{stroke:"#63b3ed",strokeWidth:2,opacity:0.7} },
];

export function LandingPage({ onSignIn, onGetStarted }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  

  return (
    <div className="min-h-screen bg-[#292b3d] overflow-x-hidden">
      {/* Hero Section with Extended Background - Barclays Style */}
       {/* Hero Section */}
<section className="relative overflow-hidden text-white h-screen">

  {/* 🌌 Stars Background */}
  <MovingStarsBackground />

  {/* ✅ SAME OVERLAY AS FEATURES SECTION */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-[1]" />

  {/* 🔝 Navbar */}
  <nav className="relative z-20 max-w-[1400px] mx-auto px-6 flex items-center justify-between h-[72px]">

    {/* Logo */}
    <div className="flex items-center gap-3">
      

     <h1 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700, fontSize: "22px", color: "white", letterSpacing: "0.12em" }}>
  NORN AI
</h1>
    </div>

    {/* Right */}
    
  </nav>


  {/* 🚀 HERO */}
  <div className="absolute inset-0 z-10 flex items-center justify-center">

    {/* Slightly DOWN */}
    <div className="text-center max-w-[900px] px-6 transform -translate-y-[2%]">

      {/* Tagline */}
      <div className="mb-6 inline-block px-4 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
        <p className="text-[12px] tracking-[0.25em] uppercase text-white/70 font-medium">
          AI COMPLIANCE PLATFORM
        </p>
      </div>

      {/* Heading */}
      <h1 className="text-[44px] sm:text-[60px] lg:text-[72px] font-bold leading-tight mb-6 text-white">
        Intelligent Compliance <br />
        in Real-Time
      </h1>

      {/* Subtitle */}
      <p className="text-[18px] sm:text-[20px] text-white/80 mb-10 leading-relaxed">
        Enterprise-grade AI platform designed for compliance teams at global
        financial institutions. Detect suspicious activity, automate workflows,
        and generate SAR reports faster.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5">

        <button
          onClick={onGetStarted}
          className="px-12 h-[56px] rounded-full text-[16px] font-semibold
          bg-white text-black hover:bg-white/90 transition">
          Get Started
        </button>

        <button
          onClick={onSignIn}
          className="px-12 h-[56px] rounded-full text-[16px] font-medium
          border border-white/20 bg-white/10 backdrop-blur-md
          hover:bg-white/20 transition text-white">
          Sign In
        </button>

      </div>

    </div>
  </div>

</section>
      {/* Core Features Section - Barclays Dark Card Style */}
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">

  {/* 🌌 Stars Background */}
  <MovingStarsBackground />

  {/* 🌑 Dark overlay for readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-[1]" />

  <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
    
    {/* Heading */}
    <div className="text-center mb-10 sm:mb-16">
      <h2
        className="text-[28px] sm:text-[36px] lg:text-[42px] text-white mb-3 sm:mb-4"
        style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}
      >
        Core Features
      </h2>

      <p
        className="text-[15px] sm:text-[16px] lg:text-[18px] text-white/70 max-w-[700px] mx-auto px-4"
        style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
      >
        Enterprise-grade capabilities designed for compliance teams at global financial institutions
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[
        {
          title: 'ML-Based SAR Worthiness & Typology Classification',
          description: 'Advanced machine learning algorithms classify suspicious activity and identify money laundering patterns with precision',
          image: 'https://images.unsplash.com/photo-1717501219687-ddce079f704b?...'
        },
        {
          title: 'Agentic Workflow & Orchestration',
          description: 'Intelligent multi-step processing with automated validation, enrichment, and orchestration at each stage',
          image: 'https://images.unsplash.com/photo-1759752393975-7ca7b302fcc6?...'
        },
        {
          title: 'Structured SAR Narrative Generation',
          description: 'Regulator-ready reports following FinCEN guidelines with complete audit trail and version control',
          image: 'https://images.unsplash.com/photo-1762846700374-f4aeb2f38e92?...'
        },
        {
          title: 'Explainability & Reasoning Trace',
          description: 'Complete transparency with line-by-line explanations, confidence indicators, and source traceability',
          image: 'https://images.unsplash.com/photo-1740908900846-4bbd4f22c975?...'
        },
        {
          title: 'Compliance Validation Engine',
          description: 'Automated checks against BSA, FinCEN, and FATF regulatory requirements with real-time validation',
          image: 'https://images.unsplash.com/photo-1704969724221-8b7361b61f75?...'
        },
        {
          title: 'Full Audit Logging',
          description: 'Complete traceability of all actions, decisions, and modifications for regulatory review and compliance',
          image: 'https://images.unsplash.com/photo-1675627453084-505806a00406?...'
        }
      ].map((feature, idx) => (
        <div
          key={idx}
          className="
            relative
            bg-white/5 backdrop-blur-md
            border border-white/10
            rounded-2xl overflow-hidden
            transition-all duration-300
            hover:scale-[1.03]
            hover:border-white/30
            hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]
            group cursor-pointer
          "
        >
          {/* Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-xl"></div>

          {/* Image */}
          <div className="h-[220px] overflow-hidden relative">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-7">
            <h3
              className="text-[18px] text-white mb-3 leading-snug group-hover:text-blue-300 transition"
              style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}
            >
              {feature.title}
            </h3>

            <p
              className="text-[14px] text-white/70 leading-relaxed"
              style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
            >
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>

     
{/* System Architecture Section - After Core Features */}
<section className="relative py-28 overflow-hidden text-white">

  <MovingStarsBackground />

  <div className="absolute inset-0 bg-black/40 z-[1]" />

  <div className="relative z-[2] max-w-[1800px] mx-auto px-8">

    {/* Heading */}
    <div className="text-center mb-20">
      <h2 className="text-[42px] font-semibold tracking-tight text-white">
        Agentic Workflow
      </h2>

      <p className="text-[#B0B0B0] max-w-[720px] mx-auto mt-4 text-[16px]">
        End-to-end AI pipeline converting transaction alerts into regulator-ready
        Suspicious Activity Reports through coordinated intelligent agents.
      </p>
    </div>

    {/* Workflow Canvas */}
    <>
      <style>{`
        .react-flow__renderer,
        .react-flow__container,
        .react-flow__pane {
          background: transparent !important;
        }
      `}</style>

      <div
        className="w-full h-[400px] rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden"
        style={{ background: "rgba(5, 10, 25, 0.15)" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          panOnDrag
          zoomOnScroll
          minZoom={0.3}
          maxZoom={1.5}
        >
          <Background
            gap={32}
            size={1}
            color="#0d1117"
          />
          <Controls
            style={{
              background: "rgba(15,23,42,0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
            }}
          />
        </ReactFlow>
      </div>
    </>

  </div>

</section>

      {/* Explainability Section - Full Width Image */}
     <section className="relative py-16 lg:py-24 text-white overflow-hidden">

  {/* 🌌 Background */}
  <MovingStarsBackground />

  <div className="relative z-10 max-w-[1400px] mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-14">
     <h2 
  className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold tracking-tight"
  style={{ color: "white" }}
>
  Transform Your Compliance Operations
</h2>
      <p className="text-gray-400 mt-4 text-[15px] max-w-[600px] mx-auto">
        AI-powered automation to streamline workflows, reduce costs, and scale compliance effortlessly.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {[
        {
          title: 'Time Efficiency',
          stat: '80%',
          metric: 'Faster',
          points: [
            'Automated SAR generation',
            'Real-time alert processing',
            'Smart workflow routing',
            'Reduced manual intervention'
          ]
        },
        {
          title: 'Cost Optimization',
          stat: '65%',
          metric: 'Savings',
          points: [
            'Lower operational overhead',
            'Reduced compliance errors',
            'Optimized resource usage',
            'Scalable infrastructure'
          ]
        },
        {
          title: 'Scalable Compliance',
          stat: '10x',
          metric: 'Volume',
          points: [
            'Handle high alert volumes',
            'AI-driven decision support',
            'Flexible system expansion',
            'Future-ready architecture'
          ]
        }
      ].map((item, idx) => (
        <div
          key={idx}
          className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-all duration-300"
        >

          {/* Stat */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[44px] font-semibold text-white">
              {item.stat}
            </span>
            <span className="text-[18px] text-gray-400">
              {item.metric}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[20px] font-semibold mb-4">
            {item.title}
          </h3>

          {/* Points */}
          <ul className="space-y-3">
            {item.points.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-400 text-[14px]">

                {/* Dot / Icon */}
                <span className="mt-1 h-2 w-2 rounded-full bg-[#00AEEF]"></span>

                {point}
              </li>
            ))}
          </ul>

          {/* Glow Hover Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00AEEF]/10 to-transparent rounded-2xl"></div>
          </div>

        </div>
      ))}
    </div>
  </div>
</section>

      {/* Benefits Section - Image Cards */}
     
{/* CTA Section */}
<section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden text-white">

  {/* 🌌 Stars Background */}
  <MovingStarsBackground />

  {/* 🖤 Black Overlay + Blur */}
  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

  {/* Glow Effects */}
  <div className="absolute inset-0 opacity-10 z-10">
    <div className="absolute top-0 left-0 w-96 h-96 bg-[#00AEEF] rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00AEEF] rounded-full blur-3xl"></div>
  </div>

  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center relative z-20">
    <h2
      className="text-[28px] sm:text-[36px] lg:text-[48px] text-white mb-4 sm:mb-6"
      style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}
    >
      Build Regulator-Ready SARs with Confidence
    </h2>

    <p
      className="text-[15px] sm:text-[16px] lg:text-[18px] text-[#B0B0B0] mb-8 sm:mb-10 max-w-[700px] mx-auto px-4"
      style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
    >
      Join leading financial institutions using AI to transform their compliance operations
    </p>

    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
      
      <button
        onClick={onGetStarted}
        className="px-10 sm:px-12 h-[52px] sm:h-[56px] bg-[#00AEEF] hover:bg-[#0284c7] text-white text-[15px] sm:text-[16px] rounded-full transition-all shadow-xl"
        style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}
      >
        Get Started
      </button>

      <button
        onClick={onSignIn}
        className="px-10 sm:px-12 h-[52px] sm:h-[56px] bg-white hover:bg-gray-100 text-[#292b3d] text-[15px] sm:text-[16px] rounded-full transition-all shadow-xl"
        style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}
      >
        Sign In
      </button>

    </div>
  </div>
</section>


{/* Footer */}
<footer className="relative overflow-hidden border-t border-white/10 text-white">

  {/* 🌌 Stars Background */}
  <MovingStarsBackground />

  {/* 🖤 Black Overlay */}
  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

  <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16">

    <div className="grid md:grid-cols-4 gap-12 mb-12">

      <div>
        <div className="flex items-center gap-2 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#00AEEF"/>
            <path d="M2 17L12 22L22 17" stroke="#00AEEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#00AEEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[16px] font-semibold">
            SAR Generator
          </span>
        </div>

        <p className="text-[13px] text-[#B0B0B0]">
          AI-powered compliance intelligence for global financial institutions
        </p>
      </div>

      <div>
        <h3 className="text-[14px] font-semibold mb-4">Product</h3>
        <div className="space-y-2 text-[13px] text-[#B0B0B0]">
          <div>Features</div>
          <div>Architecture</div>
          <div>Security</div>
        </div>
      </div>

      <div>
        <h3 className="text-[14px] font-semibold mb-4">Company</h3>
        <div className="space-y-2 text-[13px] text-[#B0B0B0]">
          <div>Team Baymax</div>
          <div>Hackathon 2026</div>
        </div>
      </div>

      <div>
        <h3 className="text-[14px] font-semibold mb-4">Contact</h3>
        <div className="text-[13px] text-[#B0B0B0]">
          info@sargenerator.com
        </div>
      </div>

    </div>

    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[13px] text-[#B0B0B0]">
        © 2026 SAR Generator by Team Baymax. All rights reserved.
      </p>

      <div className="flex gap-6 text-[13px] text-[#B0B0B0]">
        <a href="#" className="hover:text-white transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Terms of Service
        </a>
      </div>
    </div>

  </div>
</footer>
    </div>
  );
}