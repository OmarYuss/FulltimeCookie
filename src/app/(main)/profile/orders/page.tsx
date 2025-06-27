"use client";

import { mockOrders } from '@/lib/data';
import type { Order, OrderStatus } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/context/i18n-context';

const statusVariantMap: Record<OrderStatus, 'default' | 'secondary' | 'destructive'> = {
  'Pending': 'secondary',
  'AwaitingUserApproval': 'secondary',
  'Accepted': 'default',
  'inCreation': 'default',
  'inWait': 'default',
  'inDelivery': 'default',
  'isDone': 'secondary',
  'Rejected': 'destructive',
  'Cancelled': 'destructive',
};

export default function MyOrdersPage() {
    const { t } = useI18n();
  return (
    <div className="container py-12 md:py-16">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>View the status and details of all your past and current orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.itemsSummary}</TableCell>
                  <TableCell>₪{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[order.status] || 'secondary'}>{order.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {mockOrders.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                        You have no orders yet.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
