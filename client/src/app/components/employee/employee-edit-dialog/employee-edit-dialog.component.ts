import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Employee, Office, Tag } from '../../../shared/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-employee-edit-dialog',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatChipsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './employee-edit-dialog.component.html',
  styleUrl: './employee-edit-dialog.component.scss',
})
export class EmployeeEditDialogComponent implements OnInit {
  editEmployeeForm: FormGroup;
  employee: Employee;
  offices: Office[];
  tags: Tag[];

  employeeTags: Tag[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    public dialogRef: MatDialogRef<EmployeeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employee = data.employee;
    this.offices = data.offices;
    this.tags = data.tags;

    this.editEmployeeForm = this.fb.group({
      firstName: [this.employee.firstName, Validators.required],
      lastName: [this.employee.lastName, Validators.required],
      birthDate: [this.employee.birthDate, Validators.required],
      phone: [this.employee.phone, Validators.required],
      officeId: [this.employee.office.id, Validators.required],
      tags: [this.employee.tags.map((tag: Tag) => tag.name)],
    });
  }

  ngOnInit(): void {
    this.editEmployeeForm.valueChanges.subscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.editEmployeeForm.invalid) {
      this.editEmployeeForm.markAllAsTouched();
      return;
    }

    const office = this.offices.find(
      (office) => office.id === this.editEmployeeForm.value.officeId
    );

    const updatedEmployee = {
      ...this.editEmployeeForm.value,
      officeId: office?.id,
    };

    this.dataService
      .updateEmployee(this.employee.id, updatedEmployee)
      .subscribe({
        next: (response) => {
          console.log('Employee updated successfully:', response);
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          alert('Failed to update employee. Please try again later.');
        },
      });
  }
}
