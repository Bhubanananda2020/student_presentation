import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { StudentInformationCustomFormGroup } from '../utility/student-information-custom-form-group';

export class StudentInformationForm extends StudentInformationCustomFormGroup {
  name: FormControl;
  age: FormControl;
  studentClass: FormControl;
  phone: FormControl;

  constructor() {
    super({
      name: new FormControl(),
      age: new FormControl(),
      studentClass: new FormControl(),
      phone: new FormControl(),
    });
    // Explicitly assign the form controls
    this.name = this.get('name') as FormControl;
    this.age = this.get('age') as FormControl;
    this.studentClass = this.get('studentClass') as FormControl;
    this.phone = this.get('phone') as FormControl;
  }

  loadForm() {
    if (this.student) {
      this.name.setValue(this.student.name);
      this.age.setValue(this.student.age);
      this.studentClass.setValue(this.student.studentClass);
      this.phone.setValue(this.student.phone);
    }
  }

  addBusinessRules() {
    this.name.setValidators([
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
      this.noWhitespaceValidator,
    ]);

    this.phone.setValidators([Validators.required]);
    this.age.setValidators([Validators.required]);
    this.studentClass.setValidators([
      Validators.required,
      this.noWhitespaceValidator,
    ]);
  }

  noWhitespaceValidator(control: AbstractControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
