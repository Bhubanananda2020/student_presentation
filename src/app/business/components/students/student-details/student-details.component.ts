import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../../shared/angular-material.module';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../../../shared/services/student.service';
import { Student } from '../../../shared/models/student';
import { finalize } from 'rxjs';
import { StudentInformationForm } from '../../../shared/forms/strudent-information-form';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { NumberOnlyDirective } from '../../../shared/directive/number-only.directive';

@Component({
  selector: 'app-student-details',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NumberOnlyDirective,
  ],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss',
})
export class StudentDetailsComponent implements OnInit {
  isLoading = false;
  studentName: string;
  student: Student;
  form: StudentInformationForm;
  formFieldAppearance: MatFormFieldAppearance = 'fill';
  isCreatePage = false;
  studentData: Student;
  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly studentService: StudentService
  ) {
    this.activatedRoute.url.subscribe((segments) => {
      if (segments.length > 1 && segments[1].path === 'create') {
        this.isCreatePage = true;
      }
    });

    this.form = new StudentInformationForm();
    this.form.addBusinessRules();
  }

  ngOnInit(): void {
    this.initializeRoute();
    this.loadData();

    if (!this.isCreatePage) {
      this.form.get('name').disable();
    }
  }

  initializeRoute(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.studentName = params['e'];
    });
  }

  loadData(): void {
    if (this.studentName) {
      this.isLoading = true;

      this.studentService
        .getStudentByName(this.studentName)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((response: any) => {
          this.student = response.data;
          this.form.setFormStudentData(this.student);
          this.form.loadForm();
        });
    }
  }

  makeEntity(): void {
    if (this.isCreatePage) {
      this.studentData = new Student();
    } else {
      this.studentData = this.student;
    }
    this.studentData.name = this.form.name.value;
    this.studentData.age = this.form.age.value;
    this.studentData.studentClass = this.form.studentClass.value;
    this.studentData.phone = this.form.phone.value;
  }

  saveOrUpdateStudent(): void {
    if (!this.form.valid) {
      return;
    }
    this.makeEntity();

    this.isLoading = true;
    if (this.isCreatePage) {
      this.studentService
        .createStudent(this.studentData)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((response: any) => {
          this.navigateToDashBoard(response);
        });
    } else {
      this.studentService
        .updateStudent(this.studentData)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((response: any) => {
          this.navigateToDashBoard(response);
        });
    }
  }

  navigateToDashBoard(response): void {
    console.log();
    if (response.data) {
      this.router.navigate(['students']);
    }
  }
}
