export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Customer {
  id: number;
  name: string;
  shippingAddress: ShippingAddress;
}

export interface Payment {
  method: string;
  status: string;
  transactionId: string;
}

export interface Fulfillment {
  warehouseId: string;
  status: string;
}

export interface Logistics {
  id: string;
  logisticsId: string;
  orderId: string;
  fulfillment: Fulfillment;
}

export interface Order {
  id: string;
  orderId: string;
  customer: Customer;
  payment: Payment;
  logistics: Logistics;
}

export interface OrderQueryResponse {
  data: {
    orderById: Order;
  };
}
