import {Severities} from "../enums/severities";
import {Status} from "../enums/status";

export interface Issue {
  _id: string;
  title: string;
  description: string;
  severity: Severities;
  status: Status;
  createdAt: string;
  updatedAt: string;

}
