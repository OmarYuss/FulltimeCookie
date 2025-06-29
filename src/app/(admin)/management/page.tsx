import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManagementPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Content & User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder page for admin management tasks, such as editing products, managing users, and reviewing special orders.</p>
        </CardContent>
      </Card>
    </div>
  );
}
