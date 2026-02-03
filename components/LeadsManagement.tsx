
import React, { useState, useMemo } from 'react';
import { Lead, SaleStatus } from '../types';

interface LeadsManagementProps {
  leads: Lead[];
  onEditLead: (lead: Lead) => void;
  onOpenModal: () => void;
  initialFilter?: string;
}

export const LeadsManagement: React.FC<LeadsManagementProps> = ({ leads, onEditLead, onOpenModal, initialFilter = 'all' }) => {
  const [filter, setFilter] = useState<SaleStatus | 'all'>(initialFilter as any);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesStatus = filter === 'all' || lead.status === filter;
      const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           lead.document.includes(searchQuery) ||
                           lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [leads, filter, searchQuery]);

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
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Leads</h1>
          <p className="text-slate-500">Lista completa e detalhada de todos os clientes em prospecção.</p>
        </div>
        <button 
          onClick={onOpenModal}
          className="bg-blue-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Adicionar Novo
        </button>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>Todos</FilterButton>
            <FilterButton active={filter === SaleStatus.WAITING_DOCS} onClick={() => setFilter(SaleStatus.WAITING_DOCS)}>Documentação</FilterButton>
            <FilterButton active={filter === SaleStatus.SCHEDULED} onClick={() => setFilter(SaleStatus.SCHEDULED)}>Agendados</FilterButton>
            <FilterButton active={filter === SaleStatus.ISSUED} onClick={() => setFilter(SaleStatus.ISSUED)}>Emitidos</FilterButton>
          </div>
          
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Buscar por nome, e-mail ou doc..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lead / Contato</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Certificado</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Origem</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Expiração</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{lead.name}</div>
                    <div className="text-xs text-slate-500 mb-1">{lead.document}</div>
                    <div className="text-xs font-medium text-blue-600">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-800">{lead.type}</div>
                    <div className="text-xs text-slate-500">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{lead.origin}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(lead.expirationDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button onClick={() => onEditLead(lead)} className="text-blue-600 hover:text-blue-800 font-bold text-sm">Editar</button>
                      <button className="text-slate-400 hover:text-rose-600 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <span className="text-slate-500 font-medium">Nenhum lead encontrado com estes critérios.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FilterButton: React.FC<{ active: boolean, onClick: () => void, children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${active ? 'bg-blue-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
  >
    {children}
  </button>
);
