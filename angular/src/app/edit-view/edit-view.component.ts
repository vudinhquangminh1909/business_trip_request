import { ConfirmationService } from '@abp/ng.theme.shared';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUpdateTripExpenseDTO, CreateUpdateTripInformationDTO, CreateUpdateTripItemDTO, TripExpenseDTO, TripInformationDTO, TripInformationService, TripItemDTO } from '@proxy/business-trip';
import { CategoryType, CreateUpdateCategoryDTO, SystemCategoryService } from '@proxy/category';
import { CurrencyDto, CurrencyService } from '@proxy/category/currencies';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: [
    './edit-view.component.scss',
    './custom-toastr.css',
  ]
})

export class EditViewComponent implements OnInit {
  editproductcode: any;
  isBoolean: boolean;
  parentForm: FormGroup;
  isSubmitClicked: boolean = false;
  isButtonDisabled_save: boolean = true;
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
    private alert: ToastrService,
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

    this.SystemCategoryService.getList(CategoryType.LegalEntity).subscribe((result_LegalEntity) => {
      this.interface_LegalEntity = result_LegalEntity;
    })

    this.SystemCategoryService.getList(CategoryType.Department).subscribe((result_Department) => {
      this.interface_Department = result_Department;
    })

    this.SystemCategoryService.getList(CategoryType.ExpenseCode).subscribe((result_ExpenseCode) => {
      this.interface_ExpenseCode = result_ExpenseCode;
    });

    this.currencyService.getList().subscribe((result_currency) => {
      this.interface_currency = result_currency;
    })

    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }

  createTripExpense(data?: CreateUpdateTripExpenseDTO): FormGroup {
    return this.fb.group({
      // Tạo FormGroup cho tripExpense
      purpose: [data ? data.purpose : ''],
      destination: [data ? data.destination : ''],
      checkIn: [data ? data.checkIn : '', Validators.required],
      checkOut: [data ? data.checkOut : '', Validators.required],
      totalNight: [data ? data.totalNight : 0, Validators.required],
      totalAmount: [data ? data.totalAmount : 0, Validators.required],
      tripItems: this.fb.array(data ? data.tripItems.map(item => this.createTripItem(item)) : []),
    });
  }

  createTripItem(data?: CreateUpdateTripItemDTO): FormGroup {
    return this.fb.group({
      item: [data ? data.item : ''],
      specification: [data ? data.specification : ''],
      originalCurrency: [data ? data.originalCurrency || '' : ''],
      originalUnit: [data ? data.originalUnit || 0 : '', Validators.required],
      volume: [data ? data.volume || 0 : '', Validators.required],
      originalAmount: [data ? data.originalAmount || 0 : '', Validators.required],
      equivalentInVND: [data ? data.equivalentInVND || 0 : '', Validators.required],
      notes: [data ? data.notes : ''],
    });
  }

  loadProduct(productId: string) {
    this.InformationTripService.getListID(productId).subscribe((product) => {
      // Điền dữ liệu vào parentForm
      this.parentForm.patchValue(product);

      const tripExpenses = this.parentForm.get('tripExpenses') as FormArray;
      tripExpenses.clear();

      // Điền dữ liệu vào tripExpenses và tripItems
      product.tripExpenses.forEach(tripExpense => {
        const tripItems = tripExpense.tripItems.map(item => this.createTripItem(item));
        const tripItemDTOs: CreateUpdateTripItemDTO[] = tripItems.map((item: FormGroup) => item.getRawValue());
        tripExpenses.push(this.createTripExpense({ ...tripExpense, tripItems: tripItemDTOs }));
      });
    });
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


  removetripExpense(index: number) {
    if (index > 0) {
      this.tripExpenses.removeAt(index);
    }
  }

  getTripItems(tripExpense: FormGroup): FormArray {
    return tripExpense.get('tripItems') as FormArray;
  }

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
  }

  removeTripItem(tripExpenseIndex: number, tripItemIndex: number): void {
    this.getTripItems(this.tripExpenses.at(tripExpenseIndex) as FormGroup).removeAt(tripItemIndex);
  }


  check_data_form() {
    this.InformationTripService.checkTripInformation(this.parentForm.value).subscribe((result) => {
      this.isBoolean = result;
      if (this.isBoolean == true) {
        this.isButtonDisabled_save = false;
      }
    })
  }

  Submit() {
    if (this.parentForm.valid) {
      if (this.parentForm.get('total').value > 20) {
        this.confirmation.warn('::Total đã lớn hơn 20 trẹo', '::Check-out date must be greater than check-in date').subscribe((message) => {
        });
      }
    }
  }



  Save() {
    this.editproductcode = this.route.snapshot.paramMap.get('id');
    this.InformationTripService.getListID(this.editproductcode).subscribe(() => {
      this.InformationTripService.updateList(this.editproductcode, this.parentForm.value).subscribe(() => {
        this.router.navigate(['/Views']);
        this.alert.error('Failed to save.', 'Invoice');
      })
    })
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

  limitToTwoDecimalPlaces(event: any) {
    const value = event.target.value;

    const decimalParts = value.split('.');
    if (decimalParts[1] && decimalParts[1].length > 2) {
      // Nếu phần thập phân có nhiều hơn 2 chữ số thập phân, giữ lại chỉ 2 chữ số thập phân
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

}

