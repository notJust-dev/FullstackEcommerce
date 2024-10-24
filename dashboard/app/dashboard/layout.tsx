import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const token = cookies().get('token')?.value;

  if (!token) {
    return redirect('/login');
  }

  return <div>{children}</div>;
}
