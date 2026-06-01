import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserPayload, UserRole } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  private readonly refreshTrigger = signal(0);
  /*
    protected readonly users = signal < User []>( this.route.snapshot.data['users'] ??[]);
*/
  protected readonly usersResource = rxResource({
    defaultValue: this.route.snapshot.data['users'] as User[] ?? [], // access all users data from resolver guard
    params: () => ({ refresh: this.refreshTrigger() }),
    stream: () => this.userService.getAll()
  });

  //protected readonly users = computed<User[]>(() => this.usersResource.value() as User[] ?? []);
  protected readonly isLoading = this.usersResource.isLoading;
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

  protected onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const payload: UserPayload = this.userForm.getRawValue();
    this.errorMessage.set('');

    const activeId = this.editingUserId();
    if (activeId === null) {
      this.userService.create(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.userForm.reset();
          this.refreshTrigger.update(v => v + 1);
        },
        error: () => this.errorMessage.set('Unable to create user. Please try again.')
      });
      return;
    }

    this.userService.update({ userId: activeId, ...payload })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        this.cancelEdit();
        this.refreshTrigger.update(v => v + 1);
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

    this.userService.delete(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        if (this.editingUserId() === id) {
          this.cancelEdit();
        }
        this.refreshTrigger.update(v => v + 1);
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
}
