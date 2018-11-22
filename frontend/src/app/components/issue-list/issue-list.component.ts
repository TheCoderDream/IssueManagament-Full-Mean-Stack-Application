import { Component, OnInit } from '@angular/core';
import {IssueService} from "../../services/issue.service";
import {Issue} from "../../models/issue";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  issues: Issue[];
  constructor(
    private issueService: IssueService
  ) { }


  ngOnInit() {
    this.issueService.getIssues().subscribe(data => {
      this.issues = data.issues;
    })
  }

}
