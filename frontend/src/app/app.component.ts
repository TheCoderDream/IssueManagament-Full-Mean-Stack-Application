import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from "./services/loading.service";
import {AlertService} from "./services/alert.service";
import {Alert} from "./models/alert";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  alerts: Alert[] = [];
  public loading = false;
  constructor(
    public loadingService: LoadingService,
    public alertService: AlertService
  ) {

  }

  ngOnInit() {
    this.subscriptions.push(
      this.alertService.alerts.subscribe(alert => {
        this.alerts.push(alert);
      })
    )

    this.subscriptions.push(
      this.loadingService.isLoading.subscribe(isLoading => {
        this.loading = isLoading;
      })
    )

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
