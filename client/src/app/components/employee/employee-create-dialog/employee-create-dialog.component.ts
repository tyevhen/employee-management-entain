import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Employee, Office, Tag } from '../../../shared/interfaces';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-employee-create-dialog',
  imports: [
    MatIconModule,
    MatChipsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './employee-create-dialog.component.html',
  styleUrl: './employee-create-dialog.component.scss',
})
export class EmployeeCreateDialogComponent {
  createEmployeeForm: FormGroup;
  offices: Office[];
  tags: Tag[];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    public dialogRef: MatDialogRef<EmployeeCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.offices = data.offices;
    this.tags = data.tags;

    this.createEmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required],
      officeId: ['', Validators.required],
      tags: [[]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.createEmployeeForm.invalid) {
      this.createEmployeeForm.markAllAsTouched();
      return;
    }

    const newEmployee = this.createEmployeeForm.value;
    this.dataService.createEmployee(newEmployee).subscribe({
      next: (response) => {
        console.log('Employee created successfully:', response);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error creating employee:', error);
        alert('Failed to create employee. Please try again later.');
      },
    });
  }
}
