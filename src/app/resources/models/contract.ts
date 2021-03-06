import { Client } from './client';

export interface Contract {
  uuid?: string;
  clientUid?: string;
  client?: Client;
  numero?: number;
  statusId?: number;
  valor?: number;
  dataInicio?: string;
  dataAssinatura?: string;
  dataPublicacao?: string;
  dataInicioVigencia?: string;
  dataFimVigencia?: string;
  prazo?: number;
  formaContratacao?: number;
  objContracao?: string;
  pagamentos?: Payment[],
  dataCancelamento?: string;
  motivoCancelamento?: string
  active?: boolean;
  deleted?: boolean;
}

interface Payment {
  banco?: string;
  tipo?: string;
  valor?: number;
  prazo?: string;
  data?: string;
  observacao?: string;
  pago?: boolean;
}
