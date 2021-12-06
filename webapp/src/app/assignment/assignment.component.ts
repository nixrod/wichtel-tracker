import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Assignment } from '../model/assignment';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  accessId: string;
  assignment: Assignment;
  assignmentForm: FormGroup;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.assignment = new Assignment();

    this.assignmentForm = new FormGroup({
      assignmentWishlist: new FormControl({value: this.assignment.assignment_wishes, disabled: false}),
    });
  }

  ngOnInit(): void {
    this.accessId = this.activatedRoute.snapshot.queryParamMap.get('accessId');

    this.userService.getUserAssignment(this.accessId)
      .subscribe(assignment => {
        this.assignment = assignment;
      });
  }

}
