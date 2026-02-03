import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Target, 
  BarChart3, 
  Phone, 
  Mail, 
  MapPin, 
  Image as ImageIcon,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [settings, setSettings] = useState({
    logo_url: '',
    icon_url: '',
    meta_title: '',
    meta_description: '',
    schema_markup: '',
    pixel_code: '',
    google_tag: '',
    google_analytics: '',
    client_email: '',
    client_phone: '',
    client_address: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/settings`);
      if (response.data) {
        setSettings(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError('Erro ao carregar configurações.');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    setError(null);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/settings`, settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Erro ao salvar configurações.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-slate-50/50 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
              <SettingsIcon className="w-8 h-8 text-blue-600" />
              Configurações do Sistema
            </h1>
            <p className="text-slate-500 mt-1">Gerencie a identidade, SEO e integrações do seu CRM e Landing Page.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-5 h-5" />
            Configurações salvas com sucesso!
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Branding */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-indigo-500" />
                Branding e Identidade
              </CardTitle>
              <CardDescription>URLs das imagens de logo e favicon.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo_url">URL do Logo</Label>
                <Input 
                  id="logo_url" 
                  name="logo_url" 
                  placeholder="https://exemplo.com/logo.png" 
                  value={settings.logo_url || ''} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon_url">URL do Ícone (Favicon)</Label>
                <Input 
                  id="icon_url" 
                  name="icon_url" 
                  placeholder="https://exemplo.com/favicon.ico" 
                  value={settings.icon_url || ''} 
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-500" />
                Informações de Contato
              </CardTitle>
              <CardDescription>Dados exibidos no rodapé e páginas de contato.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client_email">E-mail Comercial</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input 
                    id="client_email" 
                    name="client_email" 
                    className="pl-10"
                    placeholder="contato@empresa.com" 
                    value={settings.client_email || ''} 
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="client_phone">Telefone/WhatsApp</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input 
                    id="client_phone" 
                    name="client_phone" 
                    className="pl-10"
                    placeholder="+55 11 99999-9999" 
                    value={settings.client_phone || ''} 
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="client_address">Endereço Completo</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input 
                    id="client_address" 
                    name="client_address" 
                    className="pl-10"
                    placeholder="Rua Exemplo, 123 - Cidade, Estado" 
                    value={settings.client_address || ''} 
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card className="border-slate-200 shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Configurações de SEO e Meta Dados
              </CardTitle>
              <CardDescription>Otimize como os buscadores e IAs enxergam seu site.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Título da Página (Meta Title)</Label>
                  <Input 
                    id="meta_title" 
                    name="meta_title" 
                    placeholder="Título principal para o Google" 
                    value={settings.meta_title || ''} 
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Descrição (Meta Description)</Label>
                  <Textarea 
                    id="meta_description" 
                    name="meta_description" 
                    placeholder="Breve resumo do site para os resultados de busca." 
                    className="h-32"
                    value={settings.meta_description || ''} 
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="schema_markup">Script de Schema / Dados Estruturados (JSON-LD)</Label>
                <Textarea 
                  id="schema_markup" 
                  name="schema_markup" 
                  placeholder='{"@context": "https://schema.org", "@type": "Organization", ...}' 
                  className="h-[210px] font-mono text-xs"
                  value={settings.schema_markup || ''} 
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tracking & Analytics */}
          <Card className="border-slate-200 shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-rose-500" />
                Pixels e Analytics
              </CardTitle>
              <CardDescription>Códigos de rastreamento para marketing e análise de dados.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pixel_code" className="flex items-center gap-2">
                  Facebook Pixel ID
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 uppercase font-bold tracking-tighter">Pixel</span>
                </Label>
                <Input 
                  id="pixel_code" 
                  name="pixel_code" 
                  placeholder="Ex: 123456789012345" 
                  value={settings.pixel_code || ''} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google_tag" className="flex items-center gap-2">
                  Google Meta Tag
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 uppercase font-bold tracking-tighter">Verify</span>
                </Label>
                <Input 
                  id="google_tag" 
                  name="google_tag" 
                  placeholder="Ex: google-site-verification=..." 
                  value={settings.google_tag || ''} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google_analytics" className="flex items-center gap-2">
                  Google Analytics ID
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 uppercase font-bold tracking-tighter">GA4</span>
                </Label>
                <Input 
                  id="google_analytics" 
                  name="google_analytics" 
                  placeholder="Ex: G-XXXXXXXXXX" 
                  value={settings.google_analytics || ''} 
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
