
import React, { useState, useEffect } from 'react';
import { Lead, CertificateType, SaleStatus } from '../types';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: Partial<Lead>) => void;
  initialData?: Lead | null;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<Lead>>({
    name: '',
    document: '',
    type: CertificateType.A1,
    phone: '',
    email: '',
    origin: '',
    status: SaleStatus.WAITING_DOCS,
    expirationDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        document: '',
        type: CertificateType.A1,
        phone: '',
        email: '',
        origin: '',
        status: SaleStatus.WAITING_DOCS,
        expirationDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">
            {initialData ? 'Editar Lead' : 'Cadastrar Novo Lead'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nome Completo / Razão Social</label>
              <input 
                type="text" required
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">CPF ou CNPJ</label>
              <input 
                type="text" required
                placeholder="000.000.000-00"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.document}
                onChange={e => setFormData({...formData, document: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Tipo de Certificado</label>
              <select 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as CertificateType})}
              >
                <option value={CertificateType.A1}>A1 - Arquivo (1 ano)</option>
                <option value={CertificateType.A3}>A3 - Cartão/Token (3 anos)</option>
                <option value={CertificateType.CLOUD}>Nuvem - Remoto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">WhatsApp / Telefone</label>
              <input 
                type="tel" required
                placeholder="(00) 00000-0000"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">E-mail</label>
              <input 
                type="email" required
                placeholder="contato@empresa.com"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Origem do Lead</label>
              <input 
                type="text"
                placeholder="Ex: Instagram, Indicação..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.origin}
                onChange={e => setFormData({...formData, origin: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Data de Expiração (Estimada)</label>
              <input 
                type="date"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.expirationDate}
                onChange={e => setFormData({...formData, expirationDate: e.target.value})}
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-900/20"
            >
              {initialData ? 'Atualizar Dados' : 'Cadastrar Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
