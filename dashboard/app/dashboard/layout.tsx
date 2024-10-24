import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Text } from '@/components/ui/text';
import Link from 'next/link';
import {
  Icon,
  MenuIcon,
  MessageCircleIcon,
  StarIcon,
  ThreeDotsIcon,
} from '@/components/ui/icon';
// import { HomeIcon } from 'lucide-react-native';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const token = cookies().get('token')?.value;

  if (!token) {
    return redirect('/login');
  }

  return (
    <div className="h-screen overflow-hidden">
      {/* Header */}
      <Header />

      <HStack className="h-full">
        <Sidebar />
        <Box className="flex-1 overflow-y-auto bg-gray-100 p-3">{children}</Box>
      </HStack>

      <MobileNavbar />
    </div>
  );
}

function Header() {
  return (
    <HStack className="p-3 border-b justify-between items-center flex flex-1">
      <Heading>Dashboard</Heading>

      <Avatar>
        <AvatarFallbackText>VS</AvatarFallbackText>
      </Avatar>
    </HStack>
  );
}

function Sidebar() {
  return (
    <VStack className="p-3 pr-10 border-r gap-3 hidden md:flex">
      <Link href="/dashboard">
        <Text>Dashboard</Text>
      </Link>

      <Link href="/dashboard/products">
        <Text>Products</Text>
      </Link>

      <Link href="/dashboard/orders">
        <Text>Orders</Text>
      </Link>
    </VStack>
  );
}

function MobileNavbar() {
  return (
    <HStack className="p-3 pr-10 border-t gap-3 absolute bottom-0 left-0 right-0 bg-white justify-between md:hidden">
      <Link href="/dashboard">
        <Icon as={MenuIcon} />
      </Link>

      <Link href="/dashboard/products">
        <Icon as={StarIcon} />
      </Link>

      <Link href="/dashboard/orders">
        <Icon as={ThreeDotsIcon} />
      </Link>
    </HStack>
  );
}
