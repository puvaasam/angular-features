import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserPayload } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  imports: [ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent {
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);

  protected readonly users = signal<User[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly editingUserId = signal<number | null>(null);
  protected readonly buttonLabel = computed(() =>
    this.editingUserId() === null ? 'Save User' : 'Update User'
  );

  protected readonly userForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    gender: this.fb.nonNullable.control<'Male' | 'Female'>('Male', [Validators.required]),
    password: ['', [Validators.required, Validators.minLength(6)]],
    addressId: [0, [Validators.required, Validators.min(1)]]
  });

  constructor() {
    this.loadUsers();
  }

  protected onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const payload: UserPayload = this.userForm.getRawValue();
    this.errorMessage.set('');

    const activeId = this.editingUserId();
    if (activeId === null) {
      this.userService.create(payload).subscribe({
        next: () => {
          this.userForm.reset();
          this.loadUsers();
        },
        error: () => this.errorMessage.set('Unable to create user. Please try again.')
      });
      return;
    }

    this.userService.update({ userId: activeId, ...payload }).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadUsers();
      },
      error: () => this.errorMessage.set('Unable to update user. Please try again.')
    });
  }

  protected editUser(user: User): void {
    if (user.userId === undefined) {
      this.errorMessage.set('Selected user has no valid identifier.');
      return;
    }

    this.editingUserId.set(user.userId);
    this.userForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      password: user.password,
      addressId: user.addressId
    });
  }

  protected deleteUser(id: number | undefined): void {
    if (id === undefined) {
      this.errorMessage.set('Unable to delete user with missing identifier.');
      return;
    }

    const isConfirmed = window.confirm('Delete this user?');
    if (!isConfirmed) {
      return;
    }

    this.userService.delete(id).subscribe({
      next: () => {
        if (this.editingUserId() === id) {
          this.cancelEdit();
        }
        this.loadUsers();
      },
      error: () => this.errorMessage.set('Unable to delete user. Please try again.')
    });
  }

  protected cancelEdit(): void {
    this.editingUserId.set(null);
    this.userForm.reset();
  }

  protected hasFieldError(field: keyof UserPayload): boolean {
    const control = this.userForm.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }

  private loadUsers(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.userService.getAll().subscribe({
      next: (users) => {
        this.users.set(users);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set(
          'Unable to load users from API. Ensure backend is running on port 8098.'
        );
        this.isLoading.set(false);
      }
    });
  }
}
