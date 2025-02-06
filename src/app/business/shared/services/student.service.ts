import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl = 'http://localhost:8080/api/students';

  constructor(protected readonly httpClient: HttpClient) {}

  createStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(`${this.baseUrl}/`, student);
  }
  getStudents(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/`);
  }

  getStudentByName(studentName: string): Observable<Student> {
    return this.httpClient.get<Student>(
      `${this.baseUrl}/get-by-name/${studentName}`
    );
  }

  updateStudent(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${this.baseUrl}/`, student);
  }

  deleteStudent(studentName: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${studentName}`);
  }
}
