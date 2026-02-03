
-- Estrutura de Banco de Dados Sugerida (Supabase / PostgreSQL)

-- 1. Tabela de Leads
CREATE TABLE leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    document VARCHAR(18) NOT NULL, -- Suporta CPF e CNPJ formatados
    certificate_type TEXT CHECK (certificate_type IN ('A1', 'A3', 'Nuvem')),
    phone VARCHAR(20),
    email TEXT,
    origin TEXT,
    status TEXT DEFAULT 'Aguardando Documentação' CHECK (status IN ('Aguardando Documentação', 'Agendado', 'Emitido')),
    expiration_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Índice para busca rápida por documento
CREATE INDEX idx_leads_document ON leads(document);

-- 3. Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- 4. View para Alertas de Renovação (Próximos 365 dias)
CREATE VIEW view_renewal_alerts AS
SELECT * FROM leads
WHERE expiration_date <= CURRENT_DATE + INTERVAL '365 days'
AND status = 'Emitido';
