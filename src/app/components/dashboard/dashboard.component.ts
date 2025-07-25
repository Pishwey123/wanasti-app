
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any = null;
  currentView: string = 'edit-profile';
  profileForm: FormGroup;
  isUpdating = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      firstName: ['TEST', [Validators.required]],
      lastName: ['TEST', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['+965 1234567890', [Validators.required]],
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData);
      this.profileForm.patchValue({
        firstName: 'TEST',
        lastName: 'TEST',
        email: this.user.email || 'test@example.com',
        phone: '+965 1234567890'
      });
    }
  }

  setCurrentView(view: string): void {
    this.currentView = view;
  }

  onUpdateProfile(): void {
    if (this.profileForm.valid) {
      this.isUpdating = true;
      
      setTimeout(() => {
        this.isUpdating = false;
        alert('Profile updated successfully!');
      }, 2000);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}