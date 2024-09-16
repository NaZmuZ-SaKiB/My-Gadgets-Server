import { TOrderStatus, TPaymentMethod } from './order.type';

export const paymentMethods: TPaymentMethod[] = [
  'cash-on-delivery',
  'stripe',
  'bank-transfer',
];

export const orderStatuses: TOrderStatus[] = [
  'pending',
  'processing',
  'completed',
  'cancelled',
];

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;
