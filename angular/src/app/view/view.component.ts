import { ListService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripInformationDTO, TripInformationService } from '@proxy/business-trip';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [ListService],
})
export class ViewComponent implements OnInit, DoCheck {

  islisting = true;
  interface_trip: TripInformationDTO[];

  constructor(
    public readonly list: ListService,
    private business_trip_service: TripInformationService,
    private confirmation: ConfirmationService,
    private router: Router
  ) { }

  ngDoCheck(): void {
    let currenturl = this.router.url;
    if (currenturl == '/Views') {
      this.islisting = true;
    } else {
      this.islisting = false;
    }
  }

  ngOnInit(): void {
    this.business_trip_service.getList().subscribe((result) => {
      this.interface_trip = result;
    });
  }


  deteleTrip(id: string) {
    this.confirmation.warn('::Are You Sure To Delete', '::AreYouSure').subscribe((message) => {
      if (message === Confirmation.Status.confirm) {
        this.business_trip_service.deleteList(id).subscribe(() => {
          this.ngOnInit()
        })
      }
    });
  }

  editBusinessTrip(id: any) {
    this.router.navigate(['Views/editView/', id]);
  }
}