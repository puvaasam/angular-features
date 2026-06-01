import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Order, OrderQueryResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly graphqlUrl = '/v1/graphql';

  getOrderById(orderId: string): Observable<Order | null> {
    const query = `
      query OrderById($orderId: String!) {
        orderById(orderId: $orderId) {
          id
          orderId
          customer {
            id
            name
            shippingAddress {
              street
              city
              state
              zip
            }
          }
          payment {
            method
            status
            transactionId
          }
          logistics {
            id
            logisticsId
            orderId
            fulfillment {
              warehouseId
              status
            }
          }
        }
      }
    `;

    return this.http.post<OrderQueryResponse>(
      this.graphqlUrl,
      {
        query,
        variables: { orderId }
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      map(response => response.data?.orderById || null)
    );
  }
}
