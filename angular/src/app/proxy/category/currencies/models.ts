
export interface CreateUpdateCurrencyDTO {
  code?: string;
  title?: string;
  exchangeRate: number;
  modifiedBy?: string;
}

export interface CurrencyDto {
  id: number;
  code?: string;
  title?: string;
  exchangeRate: number;
  modifiedBy?: string;
}
