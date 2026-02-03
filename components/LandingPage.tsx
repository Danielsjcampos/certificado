import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  Globe, 
  BarChart3, 
  Zap, 
  Users, 
  Target, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight,
  Shield,
  TrendingUp,
  LineChart,
  Bot
} from 'lucide-react';
import { SplineSceneBasic } from './ui/spline-basic';
import { CircularTestimonials } from './ui/circular-testimonials';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden font-sans">
      <Helmet>
        {/* Basic SEO */}
        <title>Plata Digital | Escala Global & Performance Baseada em Dados</title>
        <meta name="description" content="A Plata Digital transforma negócios locais em máquinas globais de aquisição de clientes através de marketing orientado por dados, automação inteligente e funis de alta performance." />
        <link rel="canonical" href="https://platadigital.com" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://platadigital.com" />
        <meta property="og:title" content="Plata Digital | Marketing Digital de Alta Performance" />
        <meta property="og:description" content="Escalone seu faturamento com estratégias globais de aquisição e automação inteligente. Transformamos dados em receita previsível." />
        <meta property="og:image" content="https://platadigital.com/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://platadigital.com" />
        <meta name="twitter:title" content="Plata Digital | Escala Digital Global" />
        <meta name="twitter:description" content="Marketing orientado por dados e automação estratégica para empresas que buscam escala global." />
        
        {/* GEO (Generative Engine Optimization) - Specific for AI Search */}
        <meta name="ai-search-bot-content" content="Plata Digital is a global marketing technology agency specializing in client acquisition, marketing automation, high-performance funnels, and CRM integration. Headquartered in Brazil and Portugal, focusing on ROI-driven growth strategies." />
        <meta name="summary" content="Agência global de marketing e tecnologia focada em ROI, automação de leads e escala de faturamento para grandes empresas e infoprodutores." />

        {/* JSON-LD Structured Data (Organization) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Plata Digital",
            "url": "https://platadigital.com",
            "logo": "https://platadigital.com/logo.png",
            "description": "Especialistas em performance global, automação estratégica e crescimento exponencial de negócios digitais.",
            "address": [
              {
                "@type": "PostalAddress",
                "addressLocality": "São Paulo",
                "addressCountry": "BR"
              },
              {
                "@type": "PostalAddress",
                "addressLocality": "Lisboa",
                "addressCountry": "PT"
              }
            ],
            "sameAs": [
              "https://linkedin.com/company/platadigital",
              "https://instagram.com/platadigital"
            ]
          })}
        </script>
      </Helmet>

      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">PLATA DIGITAL</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-slate-400 text-sm font-bold uppercase tracking-widest">
            <a href="#solucoes" className="hover:text-blue-500 transition-colors">Soluções</a>
            <a href="#diferenciais" className="hover:text-blue-500 transition-colors">Diferenciais</a>
            <a href="#processo" className="hover:text-blue-500 transition-colors">Processo</a>
            <a href="#resultados" className="hover:text-blue-500 transition-colors">Resultados</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onEnterApp}
              className="text-slate-200 text-sm font-bold hover:text-white transition-colors py-2 px-4"
            >
              Login
            </button>
            <button 
              onClick={onEnterApp}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Pronto para Escala Global
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.95] max-w-5xl">
              Certificado Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">100% Online</span> em todo o Brasil.
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
              Emita ou renove seu certificado por videoconferência. Sem filas, sem deslocamentos e com validade jurídica imediata.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button 
                onClick={onEnterApp}
                className="group relative px-10 py-5 bg-blue-600 rounded-2xl text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative flex items-center gap-3">
                  Emitir Meu Certificado Agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                Minha Análise Gratuita
              </button>
            </div>
            
            {/* Social Proof Mini */}
            <div className="pt-12 flex flex-col items-center gap-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tecnologia Certificada por</p>
              <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale filter hover:grayscale-0 transition-all duration-700">
                <div className="text-xl font-black tracking-tighter">METΛ</div>
                <div className="text-xl font-black tracking-tighter">Google Ads</div>
                <div className="text-xl font-black tracking-tighter">HUB SPOT</div>
                <div className="text-xl font-black tracking-tighter">PLATA CRM</div>
              </div>
            </div>
          </motion.div>
          
          {/* Hero Visual - Interactive 3D */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-20 w-full max-w-6xl relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 blur-3xl opacity-20"></div>
            <SplineSceneBasic />
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-24">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
                Marketing sem estratégia não é investimento, é <span className="text-rose-500">custo.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                A maioria das empresas sofre com leads desqualificados, falta de previsibilidade e dependência de indicações. Sem um funil automatizado e dados reais, seu negócio está à deriva.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-6 h-6 rounded-full border border-rose-500/30 flex items-center justify-center">
                    <span className="text-rose-500 font-bold">✕</span>
                  </div>
                  <span>Dependência absoluta de indicação orgânica</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-6 h-6 rounded-full border border-rose-500/30 flex items-center justify-center">
                    <span className="text-rose-500 font-bold">✕</span>
                  </div>
                  <span>Equipes de vendas perdendo tempo com leads frios</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-6 h-6 rounded-full border border-rose-500/30 flex items-center justify-center">
                    <span className="text-rose-500 font-bold">✕</span>
                  </div>
                  <span>Escuridão total sobre o ROI real das campanhas</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl space-y-4">
                <div className="text-slate-500 uppercase text-[10px] font-bold tracking-widest">Leads Qualificados</div>
                <div className="text-4xl font-bold">08%</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[8%]"></div>
                </div>
                <p className="text-[10px] text-slate-600">Sua situação atual sem a Plata Digital</p>
              </div>
              <div className="bg-blue-600 border border-blue-400/20 p-8 rounded-3xl space-y-4 mt-8">
                <div className="text-blue-100 uppercase text-[10px] font-bold tracking-widest">Leads Qualificados</div>
                <div className="text-4xl font-bold">94%</div>
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-[94%]"></div>
                </div>
                <p className="text-[10px] text-blue-100">Performance com Plata Digital</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section id="solucoes" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-[0.3em] mb-4">A Plataforma de Escala</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">Soluções de classe mundial.</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SolutionCard 
              icon={<Target className="w-6 h-6" />}
              title="Emissão por Videoconferência"
              desc="Validação 100% remota com suporte via teleconsulta. Você faz tudo por vídeo, em qualquer lugar do Brasil."
            />
            <SolutionCard 
              icon={<Bot className="w-6 h-6" />}
              title="Rapidez e Segurança"
              desc="Processo acelerado com tecnologia de ponta. Receba seu certificado A1 ou A3 com rapidez e segurança total."
            />
            <SolutionCard 
              icon={<Zap className="w-6 h-6" />}
              title="Sem Necessidade de Viagem"
              desc="Economize tempo e combustível. Nossa validação online elimina a necessidade de visitas presenciais."
            />
            <SolutionCard 
              icon={<Users className="w-6 h-6" />}
              title="Suporte Especializado"
              desc="Time de especialistas pronto para guiar você em cada passo, garantindo que sua emissão seja perfeita."
            />
            <SolutionCard 
              icon={<LineChart className="w-6 h-6" />}
              title="Sincronização com CRM"
              desc="Controle total do vencimento dos seus certificados com alertas automáticos para você nunca ficar na mão."
            />
            <SolutionCard 
              icon={<TrendingUp className="w-6 h-6" />}
              title="Certificado para Empresas"
              desc="Simplificamos a gestão de certificados para contadores e empresas com múltiplos e-CNPJs e e-CPFs."
            />
          </div>

          <div className="mt-20 text-center">
            <button className="bg-white text-black px-10 py-5 rounded-2xl text-lg font-bold hover:scale-105 transition active:scale-95 flex items-center gap-3 mx-auto shadow-2xl shadow-white/10">
              Quero uma Análise Gratuita <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* DIFFERENTIALS / NUMBERS */}
      <section id="resultados" className="py-32 px-6 bg-blue-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div>
              <div className="text-7xl font-bold mb-4">+400%</div>
              <div className="text-blue-100 font-bold uppercase tracking-widest text-sm">Aumento médio em ROI</div>
            </div>
            <div>
              <div className="text-7xl font-bold mb-4">+R$ 20M</div>
              <div className="text-blue-100 font-bold uppercase tracking-widest text-sm">Gerados para clientes</div>
            </div>
            <div>
              <div className="text-7xl font-bold mb-4">+12</div>
              <div className="text-blue-100 font-bold uppercase tracking-widest text-sm">Países com campanhas ativas</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="processo" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="text-5xl font-black text-blue-600/20">01</div>
              <h4 className="text-2xl font-bold">Diagnóstico Estratégico</h4>
              <p className="text-slate-400">Analisamos seu mercado, concorrentes e estrutura atual para identificar os gargalos de escala.</p>
            </div>
            <div className="space-y-6">
              <div className="text-5xl font-black text-blue-600/20">02</div>
              <h4 className="text-2xl font-bold">Implementação e Automação</h4>
              <p className="text-slate-400">Colocamos a mão na massa: criamos anúncios, funis e as automações que o seu negócio exige.</p>
            </div>
            <div className="space-y-6">
              <div className="text-5xl font-black text-blue-600/20">03</div>
              <h4 className="text-2xl font-bold">Escala e Otimização</h4>
              <p className="text-slate-400">Acompanhamento contínuo baseado em dados para otimizar conversão e escalar faturamento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="depoimentos" className="py-24 px-6 overflow-hidden bg-black relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-[0.3em] mb-4">Depoimentos</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Quem confia na nossa escala.</h3>
          </div>
          
          <CircularTestimonials 
            autoplay={true}
            testimonials={[
              {
                name: "Ricardo Mendes",
                designation: "CEO @ TechFlow Global",
                quote: "A Plata Digital transformou nossa operação. Em apenas 3 meses, nosso ROI saltou de 1.2 para 5.8 com automação total de leads.",
                src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&auto=format&fit=crop"
              },
              {
                name: "Juliana Costa",
                designation: "Head de Marketing @ ProMarket",
                quote: "A precisão dos funis 3D e a inteligência de dados da Plata são de outro nível. É o marketing do futuro aplicado hoje.",
                src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop"
              },
              {
                name: "Marcus Volper",
                designation: "Founder @ ScaleX",
                quote: "Finalmente encontramos um parceiro que fala a língua dos dados. A transparência e os resultados globais são impecáveis.",
                src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop"
              }
            ]}
            colors={{
              name: "#ffffff",
              designation: "#3b82f6",
              testimony: "#94a3b8",
              arrowBackground: "rgba(255,255,255,0.05)",
              arrowForeground: "#ffffff",
              arrowHoverBackground: "#2563eb"
            }}
            fontSizes={{
              name: "2rem",
              designation: "0.75rem",
              quote: "1.25rem"
            }}
          />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto bg-slate-900 border border-white/10 p-12 md:p-24 rounded-[4rem] text-center relative z-10 overflow-hidden">
          {/* Internal Orbs */}
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-600/10 blur-[100px] rounded-full"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight">Seu negócio está pronto para crescer em nível global?</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Se você faturou mais de R$ 50k no último mês e quer dobrar esse número com processos previsíveis, fale conosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-3xl font-bold text-xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 group">
                <span className="flex items-center gap-3">
                  Quero Falar com um Especialista <MessageSquare className="w-6 h-6" />
                </span>
              </button>
            </div>
            <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" /> Atendimento exclusivo para empresas com potencial de escala
            </p>
          </motion.div>
        </div>
      </section>

      {/* LEAD CAPTURE SECTION */}
      <section id="contato" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Fale com um especialista agora.</h2>
            <p className="text-slate-400 text-lg">Deixe seus dados e nosso time de escala entrará em contato para fazer um diagnóstico gratuito do seu negócio.</p>
            <div className="space-y-4">
               <div className="flex items-center gap-4 text-slate-300">
                  <CheckCircle2 className="w-6 h-6 text-blue-500" />
                  <span>Diagnóstico personalizado de funil</span>
               </div>
               <div className="flex items-center gap-4 text-slate-300">
                  <CheckCircle2 className="w-6 h-6 text-blue-500" />
                  <span>Análise de teto de escala de anúncios</span>
               </div>
               <div className="flex items-center gap-4 text-slate-300">
                  <CheckCircle2 className="w-6 h-6 text-blue-500" />
                  <span>Acesso exclusivo ao Plata CRM</span>
               </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative"
            >
              <LeadCaptureForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tighter">PLATA DIGITAL</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              Especialistas em performance global, automação estratégica e crescimento exponencial de negócios digitais.
            </p>
            <div className="flex gap-4">
               {/* Simplified Social Icons */}
               <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                 <Target className="w-5 h-5" />
               </div>
               <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                 <Zap className="w-5 h-5" />
               </div>
            </div>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold uppercase text-[10px] tracking-widest text-slate-500">Módulos</h5>
            <div className="flex flex-col gap-4 text-slate-400 font-medium">
              <a href="#" className="hover:text-white transition-colors">Aquisição</a>
              <a href="#" className="hover:text-white transition-colors">Automação</a>
              <a href="#" className="hover:text-white transition-colors">Funis VSL</a>
              <a href="#" className="hover:text-white transition-colors">Consultoria</a>
            </div>
          </div>
          <div className="space-y-6 text-right md:text-left">
            <h5 className="font-bold uppercase text-[10px] tracking-widest text-slate-500">Global Office</h5>
            <div className="text-slate-400 space-y-2">
              <p>São Paulo, Brasil</p>
              <p>Lisboa, Portugal</p>
              <p className="pt-4 text-white font-bold">contact@platadigital.com</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <p>© 2026 Plata Digital • All Rights Reserved</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Growth</a>
            </div>
        </div>
      </footer>
      
      {/* Floating WhatsApp - Quick Action */}
      <button className="fixed bottom-10 right-10 z-[100] bg-emerald-500 hover:bg-emerald-400 text-white w-16 h-16 rounded-full shadow-2xl shadow-emerald-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-90 group">
        <MessageSquare className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-slate-900 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Falar com Estrategista
        </span>
      </button>
    </div>
  );
};

const SolutionCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => {
  return (
    <div className="group p-8 bg-slate-900/40 border border-white/5 rounded-[2.5rem] hover:bg-slate-900 hover:border-blue-500/20 transition-all duration-500 cursor-pointer">
      <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-4 tracking-tight group-hover:text-blue-400 transition-colors">{title}</h4>
      <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">{desc}</p>
    </div>
  );
};

const LeadCaptureForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, {
        ...formData,
        origin: 'Landing Page'
      });
      setSuccess(true);
    } catch (err) {
      console.error('Error submitting lead:', err);
      alert('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-bold">Solicitação enviada!</h3>
        <p className="text-slate-400">Obrigado {formData.name.split(' ')[0]}. Um estrategista entrará em contato em breve.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="text-blue-500 font-bold hover:underline"
        >
          Enviar outra solicitação
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nome Completo</label>
        <input 
          required
          type="text" 
          placeholder="Ex: Carlos Andrade"
          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 outline-none transition-all"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">E-mail Corporativo</label>
          <input 
            required
            type="email" 
            placeholder="carlos@empresa.com"
            className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 outline-none transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">WhatsApp / Celular</label>
          <input 
            required
            type="tel" 
            placeholder="(11) 99999-9999"
            className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 outline-none transition-all"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>
      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-6 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <span className="flex items-center gap-3">
            Garantir Meu Diagnóstico Gratuito <ArrowRight className="w-5 h-5" />
          </span>
        )}
      </button>
      <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest">
        Seus dados estão 100% protegidos e seguros.
      </p>
    </form>
  );
};
