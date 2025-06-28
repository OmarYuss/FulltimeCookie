"use client";

import { useState, useMemo } from 'react';
import { mockOrders } from '@/lib/data';
import { type Order, type OrderStatus, ORDER_STATUSES } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/context/i18n-context';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';

const statusVariantMap: Record<OrderStatus, 'default' | 'secondary' | 'destructive'> = {
  'Pending': 'secondary',
  'Accepted': 'default',
  'inCreation': 'default',
  'inWait': 'default',
  'inDelivery': 'default',
  'isDone': 'secondary',
  'inOffer': 'secondary',
  'aOffer': 'default',
  'rOffer': 'destructive',
  'Cancelled': 'destructive',
};

type SortKey = keyof Order | null;

export default function MyOrdersPage() {
    const { t } = useI18n();
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' });

    const sortedOrders = useMemo(() => {
        let sortableItems = [...mockOrders];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key!];
                const bValue = b[sortConfig.key!];
                
                let comparison = 0;
                if (sortConfig.key === 'date' && typeof aValue === 'string' && typeof bValue === 'string') {
                    comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
                } else if (sortConfig.key === 'status' && typeof aValue === 'string' && typeof bValue === 'string') {
                    comparison = ORDER_STATUSES.indexOf(aValue as OrderStatus) - ORDER_STATUSES.indexOf(bValue as OrderStatus);
                } else {
                   if (aValue! < bValue!) {
                        comparison = -1;
                    }
                    if (aValue! > bValue!) {
                        comparison = 1;
                    }
                }

                return sortConfig.direction === 'asc' ? comparison : -comparison;
            });
        }
        return sortableItems;
    }, [sortConfig]);

    const requestSort = (key: SortKey) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: SortKey) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <ChevronsUpDown className="ml-2 h-4 w-4 opacity-30" />;
        }
        if (sortConfig.direction === 'asc') {
            return <ArrowUp className="ml-2 h-4 w-4" />;
        }
        return <ArrowDown className="ml-2 h-4 w-4" />;
    };

  return (
    <div className="container py-12 md:py-16">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>View and sort your past and current orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead className="cursor-pointer" onClick={() => requestSort('date')}>
                    <div className="flex items-center">
                        Date
                        {getSortIcon('date')}
                    </div>
                </TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="cursor-pointer" onClick={() => requestSort('status')}>
                    <div className="flex items-center">
                        Status
                        {getSortIcon('status')}
                    </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOrders.map((order) => (
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
