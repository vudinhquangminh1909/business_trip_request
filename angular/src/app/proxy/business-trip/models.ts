
export interface CreateUpdateTripExpenseDTO {
  purpose?: string;
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  totalNight: number;
  totalAmount: number;
  tripItems: CreateUpdateTripItemDTO[];
}

export interface CreateUpdateTripInformationDTO {
  legalID: number;
  departmentID: number;
  expenseCodeID: number;
  operaterName?: string;
  requestNumber?: string;
  requestedDate?: string;
  businessType?: string;
  verifierUsername?: string;
  verifierName?: string;
  notes?: string;
  total: number;
  tripExpenses: CreateUpdateTripExpenseDTO[];
}

export interface CreateUpdateTripItemDTO {
  item?: string;
  specification?: string;
  originalCurrency?: string;
  originalUnit: number;
  volume: number;
  originalAmount: number;
  equivalentInVND: number;
  notes?: string;
}

export interface TripExpenseDTO {
  id?: string;
  tripInformationID?: string;
  purpose?: string;
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  totalNight: number;
  totalAmount: number;
  tripItems: TripItemDTO[];
}

export interface TripInformationDTO {
  id?: string;
  legalID: number;
  legalEntityCode?: string;
  legalEntityDescription?: string;
  departmentID: number;
  departmentCode?: string;
  departmentDescription?: string;
  expenseCodeID: number;
  expenseCodeCode?: string;
  expenseCodeDescription?: string;
  operaterName?: string;
  requestNumber?: string;
  requestedDate?: string;
  businessType?: string;
  verifierUsername?: string;
  verifierName?: string;
  notes?: string;
  total: number;
  tripExpenses: TripExpenseDTO[];
}

export interface TripItemDTO {
  id?: string;
  tripExpenseID?: string;
  item?: string;
  specification?: string;
  originalCurrency?: string;
  originalUnit: number;
  volume: number;
  originalAmount: number;
  equivalentInVND: number;
  notes?: string;
}
