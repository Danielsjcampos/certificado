
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LeadsManagement } from './components/LeadsManagement';
import { LeadModal } from './components/LeadModal';
import { Login } from './components/Login';
import { Settings } from './components/Settings';
import { Lead, AppView, CertificateType, SaleStatus } from './types';

// Mock Initial Data
const INITIAL_LEADS: Lead[] = [
  {
    id: '1',
    name: 'João Silva Tech ME',
    document: '12.345.678/0001-90',
    type: CertificateType.A1,
    phone: '(11) 98888-7777',
    email: 'contato@joaosilva.com.br',
    origin: 'Google Ads',
    status: SaleStatus.WAITING_DOCS,
    expirationDate: '2025-05-20',
    createdAt: '2024-03-01'
  },
  {
    id: '2',
    name: 'Maria Oliveira CPF',
    document: '123.456.789-00',
    type: CertificateType.A3,
    phone: '(21) 97777-6666',
    email: 'maria.oliveira@gmail.com',
    origin: 'Indicação',
    status: SaleStatus.SCHEDULED,
    expirationDate: '2025-10-15',
    createdAt: '2024-03-05'
  },
  {
    id: '3',
    name: 'Advocacia Santos S/A',
    document: '98.765.432/0001-21',
    type: CertificateType.CLOUD,
    phone: '(31) 99999-1234',
    email: 'juridico@santos.adv.br',
    origin: 'Site Direto',
    status: SaleStatus.ISSUED,
    expirationDate: '2024-11-12',
    createdAt: '2024-01-10'
  }
];

const App: React.FC = () => {
  const [rootView, setRootView] = useState<'landing' | 'login' | 'app'>('landing');
  const [appView, setAppView] = useState<AppView>('overview');
  const [user, setUser] = useState<any>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    if (user) {
      fetchLeads();
    }
  }, [user]);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leads`);
      // Map API fields if they are snake_case to camelCase
      const mappedLeads = response.data.map((l: any) => ({
        ...l,
        certificateType: l.certificate_type,
        expirationDate: l.expiration_date,
        createdAt: l.created_at
      }));
      setLeads(mappedLeads);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const handleSaveLead = (leadData: Partial<Lead>) => {
    if (editingLead) {
      setLeads(leads.map(l => l.id === editingLead.id ? { ...l, ...leadData } : l));
    } else {
      const newLead: Lead = {
        ...leadData as Lead,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };
      setLeads([newLead, ...leads]);
    }
    setIsModalOpen(false);
    setEditingLead(null);
  };

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const openNewModal = () => {
    setEditingLead(null);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    setLeads([]);
    setRootView('landing');
  };

  if (rootView === 'landing') {
    return <LandingPage onEnterApp={() => setRootView('login')} />;
  }

  if (rootView === 'login') {
    return (
      <Login 
        onLogin={(loggedUser) => {
          setUser(loggedUser);
          setRootView('app');
        }} 
      />
    );
  }

  const renderContent = () => {
    switch (appView) {
      case 'overview':
        return <Dashboard leads={leads} onOpenModal={openNewModal} onEditLead={openEditModal} />;
      case 'leads':
        return <LeadsManagement leads={leads} onOpenModal={openNewModal} onEditLead={openEditModal} />;
      case 'renewals':
        const today = new Date();
        const oneYearFromNow = new Date();
        oneYearFromNow.setDate(today.getDate() + 365);
        const renewalLeads = leads.filter(l => {
          const expDate = new Date(l.expirationDate);
          return expDate <= oneYearFromNow && l.status === SaleStatus.ISSUED;
        });
        return (
          <div className="flex-1 overflow-auto">
            <div className="p-8 pb-4">
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl mb-6">
                <p className="text-rose-800 text-sm font-medium">
                  <strong>Atenção:</strong> Abaixo estão listados os certificados que expiram nos próximos 365 dias. Priorize o contato para renovação.
                </p>
              </div>
            </div>
            <LeadsManagement leads={renewalLeads} onOpenModal={openNewModal} onEditLead={openEditModal} initialFilter={SaleStatus.ISSUED} />
          </div>
        );
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard leads={leads} onOpenModal={openNewModal} onEditLead={openEditModal} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentView={appView} onNavigate={setAppView} onLogout={handleLogout} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Nav */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <span>CertSync CRM</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-900 font-bold capitalize">{appView === 'overview' ? 'Visão Geral' : appView}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-blue-900 transition relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-6 bg-slate-200"></div>
            <button 
              onClick={handleLogout}
              className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          {renderContent()}
        </div>
      </main>

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingLead(null); }}
        onSave={handleSaveLead}
        initialData={editingLead}
      />
    </div>
  );
};

export default App;
