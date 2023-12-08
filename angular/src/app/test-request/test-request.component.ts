import { ConfirmationService } from '@abp/ng.theme.shared';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripInformationService } from '@proxy/business-trip';
import { CategoryType, CreateUpdateCategoryDTO, SystemCategoryService } from '@proxy/category';
import { CurrencyDto, CurrencyService } from '@proxy/category/currencies';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-request',
  templateUrl: './test-request.component.html',
  styleUrls: ['./test-request.component.scss']
})
export class TestRequestComponent implements OnInit {
  parentForm: FormGroup;
  isSubmitClicked: boolean = false;
  isButtonDisabled_save: boolean = true;
  tripItemCreated: boolean[] = [];
  interface_Department: CreateUpdateCategoryDTO[];
  interface_LegalEntity: CreateUpdateCategoryDTO[];
  interface_ExpenseCode: CreateUpdateCategoryDTO[];
  interface_currency: CurrencyDto[];

  constructor(
    private fb: FormBuilder,
    private SystemCategoryService: SystemCategoryService,
    private InformationTripService: TripInformationService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmation: ConfirmationService,
    private toastr: ToastrService,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.parentForm = this.fb.group({
      operaterName: ['', Validators.required],
      requestNumber: ['', Validators.required],
      requestedDate: ['', Validators.required],
      legalID: [0, Validators.required],
      departmentID: [0, Validators.required],
      verifierUsername: ['', Validators.required],
      expenseCodeID: [0, Validators.required],
      businessType: ['', Validators.required],
      verifierName: ['', Validators.required],
      notes: ['', Validators.required],
      total: [0, Validators.required],
      tripExpenses: this.fb.array([]),
    });

    this.addTripExpense();

    this.SystemCategoryService.getList(CategoryType.LegalEntity).subscribe((result_LegalEntity) => {
      this.interface_LegalEntity = result_LegalEntity;
    });

    this.SystemCategoryService.getList(CategoryType.Department).subscribe((result_Department) => {
      this.interface_Department = result_Department;
    });

    this.SystemCategoryService.getList(CategoryType.ExpenseCode).subscribe((result_ExpenseCode) => {
      this.interface_ExpenseCode = result_ExpenseCode;
    });

    this.currencyService.getList().subscribe((result_currency) => {
      this.interface_currency = result_currency;
    })

  }

  removetripExpense(index: number) {
    if (index > 0) {
      this.tripExpenses.removeAt(index);
    }
  }

  get tripExpenses(): FormArray {
    return this.parentForm.get('tripExpenses') as FormArray;
  }

  addTripExpense(): void {
    this.tripExpenses.push(this.fb.group({
      purpose: ['', Validators.required],
      destination: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      totalNight: [0, Validators.required],
      totalAmount: [0, Validators.required],
      tripItems: this.fb.array([]),
    }));
  }

  removeTripExpense(index: number): void {
    this.tripExpenses.removeAt(index);
  }

  getTripItems(tripExpense: FormGroup): FormArray {
    return tripExpense.get('tripItems') as FormArray;
  }

  showTotalAmount: EventEmitter<boolean> = new EventEmitter<boolean>();

  addTripItem(tripExpense: FormGroup): void {
    this.getTripItems(tripExpense).push(this.fb.group({
      item: [''],
      specification: [''],
      originalCurrency: [''],
      originalUnit: [0],
      volume: [0],
      originalAmount: [0],
      equivalentInVND: [0],
      notes: [''],
    }));
    this.showTotalAmount.emit(true);
  }

  removeTripItem(tripExpenseIndex: number, tripItemIndex: number): void {
    this.getTripItems(this.tripExpenses.at(tripExpenseIndex) as FormGroup).removeAt(tripItemIndex);
  }

  check_data_form() {
    this.InformationTripService.checkTripInformation(this.parentForm.value).subscribe((result) => {
      this.isButtonDisabled_save = !result;
    });
  }

  Submit() {
    this.InformationTripService.checkTripInformation(this.parentForm.value).subscribe((result) => {
      if (result == true) {
        this.isSubmitClicked = true;
      }
    });
  }

  Save() {
    const formData = this.parentForm.value;

    this.InformationTripService.createList(formData).subscribe(() => {
      this.router.navigate(['/Views']);
    });
  }




  limitToTwoDecimalPlaces(event: any) {
    const value = event.target.value;
    const decimalParts = value.split('.');
    if (decimalParts[1] && decimalParts[1].length > 2) {
      event.target.value = decimalParts[0] + '.' + decimalParts[1].substring(0, 2);
    }
  }



  calculateTotalNights(i: number) {
    const category = this.tripExpenses.at(i);
    const checkInDate = moment(category.get('checkIn').value, 'YYYY-MM-DD');
    const checkOutDate = moment(category.get('checkOut').value, 'YYYY-MM-DD');

    if (checkInDate.isValid() && checkOutDate.isValid()) {
      const totalNights = checkOutDate.diff(checkInDate, 'days');
      if (totalNights > 0) {
        category.get('totalNight').setValue(totalNights);
      } else {
        this.confirmation.warn('::Ngày check-out phải lớn hơn ngày check-in', '::Check-out date must be greater than check-in date').subscribe((message) => {
        });
      }
    }
    else {
      category.get('totalNight').setValue(null);
    }
  }

  calculateTotalAmount(section: FormGroup) {
    const originalUnit = section.get('originalUnit').value;
    const volume = section.get('volume').value;
    const originalCurrency = section.get('originalCurrency').value;

    // Lấy tỷ giá tương ứng từ danh sách currencies (bạn đã định nghĩa)
    const selectedCurrency = this.interface_currency.find(currency => currency.code === originalCurrency);

    if (originalUnit && volume && selectedCurrency) {
      // Thực hiện tính toán
      const totalAmount = (originalUnit + volume) * selectedCurrency.exchangeRate;

      // Cập nhật giá trị vào form control "ORIGINAL_AMOUNT"
      section.get('originalAmount').setValue(totalAmount);
    } else {
      // Xử lý khi một số thông tin không tồn tại
    }
  }


  calculate_Total_EQUIVALENT_IN_VND(section: FormGroup) {
    const originalUnit = section.get('originalUnit').value;
    const volume = section.get('volume').value;
    const originalCurrency = section.get('originalCurrency').value;

    // Lấy tỷ giá tương ứng từ danh sách currencies (bạn đã định nghĩa)
    const selectedCurrency = this.interface_currency.find(currency => currency.code === originalCurrency);

    if (originalUnit && volume && selectedCurrency) {
      // Thực hiện tính toán
      const totalAmount = (originalUnit + volume) * selectedCurrency.exchangeRate;
      return parseFloat(totalAmount.toFixed(0))

    }
  }


  calculate_Total_Equivalent_In_VND(i: number): number {
    let total = 0;
    const sectionArray = this.tripExpenses.at(i).get('tripItems') as FormArray;

    sectionArray.controls.forEach((section: FormGroup) => {
      const equivalentInVND = section.get('equivalentInVND').value;
      if (equivalentInVND) {
        total += equivalentInVND;
      }
    });

    return total;
  }

  calculateTotalEquivalentInVNDForAllTables(): number {
    let total = 0;
    // Duyệt qua tất cả các dòng trong FormArray "children"
    this.tripExpenses.controls.forEach((tripExpense: FormGroup, i: number) => {
      // Sử dụng hàm calculate_Total_Equivalent_In_VND để tính tổng cho mỗi dòng
      const subtotalForTable = this.calculate_Total_Equivalent_In_VND(i);
      total += subtotalForTable;
    });

    return total;
  }


}
