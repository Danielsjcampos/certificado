
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onLogout }) => {
  const menuItems: { label: string, icon: string, view: AppView }[] = [
    { label: 'Visão Geral', icon: '📊', view: 'overview' },
    { label: 'Todos os Leads', icon: '👤', view: 'leads' },
    { label: 'Fluxo Kanban', icon: '📋', view: 'kanban' },
    { label: 'Renovações Ativas', icon: '📅', view: 'renewals' },
    { label: 'Configurações', icon: '⚙️', view: 'settings' },
  ];

  return (
    <aside className="w-64 bg-blue-950 text-white flex flex-col shrink-0 h-screen sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-blue-900 rounded-lg flex items-center justify-center font-bold text-xl">C</div>
          <span className="text-xl font-bold tracking-tight">CertSync</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(item.view)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
              currentView === item.view 
                ? 'bg-blue-900 text-white shadow-lg shadow-blue-950/20' 
                : 'text-blue-200 hover:bg-blue-900/50 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-blue-900/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center border border-blue-700">
            <span className="text-sm font-bold">ADM</span>
          </div>
          <div>
            <div className="text-sm font-bold">Admin User</div>
            <div className="text-xs text-blue-400">Gerente de Vendas</div>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full bg-blue-900/40 hover:bg-rose-900/40 text-blue-100 hover:text-rose-100 py-2 rounded-lg text-sm font-medium transition"
        >
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
};
