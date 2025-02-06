import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { Student } from '../../shared/models/student';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../../shared/services/student.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-students',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  displayedColumns = ['name', 'age', 'studentClass', 'phone', 'actions'];
  formFieldAppearance = 'outline';
  isLoading: boolean;

  searchInput = new FormControl('');
  dataSource: any;

  students: Student[] = [];

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadStudents();
  }

  loadStudents() {
    this.studentService
      .getStudents()
      .pipe(
        take(1),
        map(({ data }) => {
          return data;
        })
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.students = data;
      });
  }
  createStudent() {
    this.router.navigate([`create`], {
      relativeTo: this.activatedRoute,
    });
  }

  viewStudentDetails(student: Student) {
    this.router.navigate([`details`], {
      relativeTo: this.activatedRoute,
      queryParams: { e: student.name },
    });
  }

  deleteStudent(element) {
    this.studentService.deleteStudent(element.name).subscribe(() => {
      this.loadStudents();
    });
  }
}
