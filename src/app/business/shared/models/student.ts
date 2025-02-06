export class Student {
  name: string;
  age: string;
  studentClass: string;
  phone: number;

  constructor(student?: Student) {
    if (student) {
      this.name = student.name;
      this.age = student.age;
      this.studentClass = student.studentClass;
      this.phone = student.phone;
    }
  }
  static fromJSON(student): Student {
    return new Student(student);
  }
}
