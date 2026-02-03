
export enum CertificateType {
  A1 = 'A1',
  A3 = 'A3',
  CLOUD = 'Nuvem'
}

export enum SaleStatus {
  NEW = 'Novo Lead',
  WAITING_DOCS = 'Aguardando Documentação',
  SCHEDULED = 'Agendado',
  ISSUED = 'Emitido',
  LOST = 'Perdido'
}

export interface Lead {
  id: string;
  name: string;
  document: string; // CPF or CNPJ
  type: CertificateType;
  phone: string;
  email: string;
  origin: string;
  status: SaleStatus;
  expirationDate: string; // ISO format
  createdAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  pendingDocs: number;
  scheduled: number;
  issued: number;
  renewalsSoon: number;
}

export type AppView = 'overview' | 'leads' | 'kanban' | 'renewals' | 'settings';
