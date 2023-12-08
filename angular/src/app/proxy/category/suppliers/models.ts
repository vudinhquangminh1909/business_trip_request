
export interface CreateUpdateSupplierDto {
  legalID: number;
  vendorAccount?: string;
  vendorName?: string;
  vendorHold?: string;
  beneficiaryName?: string;
  beneficiaryAccount?: string;
  beneficiaryBankName?: string;
  phone?: string;
  email?: string;
  taxCode?: string;
  importBy?: string;
}

export interface SupplierDto {
  legalEntityCode?: string;
  legalEntityDescription?: string;
  legalEntityImportBy?: string;
  legalID: number;
  vendorAccount?: string;
  vendorName?: string;
  vendorHold?: string;
  beneficiaryName?: string;
  beneficiaryAccount?: string;
  beneficiaryBankName?: string;
  phone?: string;
  email?: string;
  taxCode?: string;
  importBy?: string;
}
