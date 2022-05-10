export interface Client {
  uid?: string;
  nome?: string;
  cnpj?: string;
  inscricaoEstadual?: string;
  dataInicioContrato?: string;
  site?: string;
  email?: string;
  cep?: string;
  endereco?: string;
  numero?: number;
  bairro?: string;
  cidade?: string;
  estado?: string;
  telefone?: number;
  celular?: number;
  active?: boolean;
  deleted?: boolean;
}
