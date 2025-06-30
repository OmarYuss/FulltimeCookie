import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Admin!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder page for the admin dashboard. Future analytics and management tools will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
