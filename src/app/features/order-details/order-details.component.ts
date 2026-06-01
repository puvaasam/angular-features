import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Order Search with Graphql</mat-card-title>
          <mat-card-subtitle>Enter an order number to view details</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <!-- Search Section -->
          <div class="search-section">
            <mat-form-field appearance="fill" class="search-input">
              <mat-label>Order Number</mat-label>
              <input 
                matInput 
                [(ngModel)]="orderNumber" 
                placeholder="e.g., ORD-992831"
                (keyup.enter)="searchOrder()"
              >
            </mat-form-field>
            <button 
              mat-raised-button 
              color="primary" 
              (click)="searchOrder()"
              [disabled]="orderResource.isLoading()"
            >
              Search
            </button>
          </div>

          <!-- Loading State -->
          @if (orderResource.isLoading()) {
            <div class="loading">
              <mat-spinner diameter="40"></mat-spinner>
              <p>Loading order details...</p>
            </div>
          }

          <!-- Error State -->
          @if (orderResource.error()) {
            <div class="error">
              <p>Failed to fetch order details. Please try again.</p>
            </div>
          } @else if (searchTrigger() && orderResource.value() === null && !orderResource.isLoading()) {
            <div class="error">
              <p>Order not found</p>
            </div>
          }

          <!-- Order Details -->
          @if (orderResource.value(); as order) {
            <div class="order-details">
              <h3>Order Details - {{ order.orderId }}</h3>

              <mat-card class="detail-card">
                <mat-card-title>Customer Information</mat-card-title>
                <mat-card-content>
                  <p><strong>Name:</strong> {{ order.customer.name }}</p>
                  <p><strong>ID:</strong> {{ order.customer.id }}</p>
                  <p><strong>Shipping Address:</strong></p>
                  <p>{{ order.customer.shippingAddress.street }}</p>
                  <p>{{ order.customer.shippingAddress.city }}, {{ order.customer.shippingAddress.state }} {{ order.customer.shippingAddress.zip }}</p>
                </mat-card-content>
              </mat-card>

              <mat-card class="detail-card">
                <mat-card-title>Payment Information</mat-card-title>
                <mat-card-content>
                  <p><strong>Method:</strong> {{ order.payment.method }}</p>
                  <p><strong>Status:</strong> {{ order.payment.status }}</p>
                  <p><strong>Transaction ID:</strong> {{ order.payment.transactionId }}</p>
                </mat-card-content>
              </mat-card>

              <mat-card class="detail-card">
                <mat-card-title>Logistics Information</mat-card-title>
                <mat-card-content>
                  <p><strong>Logistics ID:</strong> {{ order.logistics.logisticsId }}</p>
                  <p><strong>Warehouse:</strong> {{ order.logistics.fulfillment.warehouseId }}</p>
                  <p><strong>Status:</strong> {{ order.logistics.fulfillment.status }}</p>
                </mat-card-content>
              </mat-card>
            </div>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './order-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent {
  private readonly orderService = inject(OrderService);

  orderNumber = '';
  readonly searchTrigger = signal<string | null>(null);

  readonly orderResource = rxResource({
    params: () => this.searchTrigger(),
    stream: ({ params }) => {
      if (!params) return of(undefined);
      return this.orderService.getOrderById(params);
    }
  });

  searchOrder(): void {
    if (!this.orderNumber.trim()) {
      return;
    }
    this.searchTrigger.set(this.orderNumber.trim());
  }
}
