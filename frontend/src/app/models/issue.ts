import {Severities} from "../enums/severities";
import {Status} from "../enums/status";

export interface Issue {
  title: string;
  description: string;
  severity: Severities;
  status: Status;

}
