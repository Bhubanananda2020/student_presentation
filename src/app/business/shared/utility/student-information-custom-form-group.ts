import { cloneDeep } from 'lodash';

import { Student } from '../models/student';
import { FormGroup } from '@angular/forms';

export abstract class StudentInformationCustomFormGroup extends FormGroup {
  student: Student;
  setFormStudentData(student: Student): void {
    this.student = cloneDeep(student);
  }
}
