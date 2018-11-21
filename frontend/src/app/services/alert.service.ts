import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Alert} from "../models/alert";


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alerts: Subject<Alert> = new Subject<Alert>();
  constructor() { }
}
