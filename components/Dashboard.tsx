
import React, { useMemo } from 'react';
import { Lead, SaleStatus, DashboardStats } from '../types';

interface DashboardProps {
  leads: Lead[];
  onOpenModal: () => void;
  onEditLead: (lead: Lead) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ leads, onOpenModal, onEditLead }) => {
  const stats: DashboardStats = useMemo(() => {
    const today = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setDate(today.getDate() + 365);

    return {
      totalLeads: leads.length,
      pendingDocs: leads.filter(l => l.status === SaleStatus.WAITING_DOCS).length,
      scheduled: leads.filter(l => l.status === SaleStatus.SCHEDULED).length,
      issued: leads.filter(l => l.status === SaleStatus.ISSUED).length,
      renewalsSoon: leads.filter(l => {
        const expDate = new Date(l.expirationDate);
        return expDate <= oneYearFromNow && l.status === SaleStatus.ISSUED;
      }).length
    };
  }, [leads]);

  const recentLeads = useMemo(() => {
    return [...leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  }, [leads]);

  const getStatusColor = (status: SaleStatus) => {
    switch (status) {
      case SaleStatus.WAITING_DOCS: return 'bg-amber-100 text-amber-800 border-amber-200';
      case SaleStatus.SCHEDULED: return 'bg-blue-100 text-blue-800 border-blue-200';
      case SaleStatus.ISSUED: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="flex-1 overflow-auto p-8 bg-slate-50">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Visão Geral</h1>
          <p className="text-slate-500">Métricas e acompanhamento rápido do funil de vendas.</p>
        </div>
        <button 
          onClick={onOpenModal}
          className="bg-blue-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Novo Lead
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total Leads" value={stats.totalLeads} color="blue" />
        <StatCard label="Aguardando Docs" value={stats.pendingDocs} color="amber" />
        <StatCard label="Agendados" value={stats.scheduled} color="indigo" />
        <StatCard label="Emitidos" value={stats.issued} color="emerald" />
        <StatCard 
          label="Renovação (365d)" 
          value={stats.renewalsSoon} 
          color="rose" 
          highlight={stats.renewalsSoon > 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-900">Atividades Recentes</h2>
            <button className="text-sm text-blue-600 font-semibold hover:underline">Ver todos</button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentLeads.map(lead => (
              <div key={lead.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer" onClick={() => onEditLead(lead)}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getStatusColor(lead.status)}`}>
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{lead.name}</div>
                    <div className="text-xs text-slate-500">Cadastrado em {new Date(lead.createdAt).toLocaleDateString('pt-BR')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium text-slate-700">{lead.type}</div>
                    <div className="text-xs text-slate-400">{lead.origin}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(lead.status)}`}>
                    {lead.status.split(' ')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-6">Metas do Mês</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 font-medium">Emissões Concluídas</span>
                <span className="text-slate-900 font-bold">12/20</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[60%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 font-medium">Captação de Leads</span>
                <span className="text-slate-900 font-bold">45/50</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[90%]"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Dica de Produtividade</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Você tem <span className="text-blue-600 font-bold">{stats.pendingDocs}</span> processos aguardando documentação. Que tal enviar um lembrete automático via WhatsApp?
            </p>
            <button className="mt-4 w-full py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition">
              Ações em Massa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: number, color: string, highlight?: boolean }> = ({ label, value, color, highlight }) => {
  const colors: Record<string, string> = {
    blue: 'border-blue-200 bg-blue-50 text-blue-700',
    amber: 'border-amber-200 bg-amber-50 text-amber-700',
    indigo: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    rose: 'border-rose-200 bg-rose-50 text-rose-700'
  };

  return (
    <div className={`p-4 rounded-xl border-2 transition hover:scale-[1.02] ${colors[color]} ${highlight ? 'animate-pulse ring-2 ring-rose-300' : ''}`}>
      <div className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">{label}</div>
      <div className="text-3xl font-extrabold">{value}</div>
    </div>
  );
};
