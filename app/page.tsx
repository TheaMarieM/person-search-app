import UserSearch from './components/user-search';
import { TechnicalOverview } from './components/technical-overview';
import { UserDialog } from './components/user-dialog';
import SignInCard from './components/sign-in-card';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export default async function Home({ searchParams }: { searchParams: Promise<{ userId?: string }> }) {
  const session = await getServerSession(authOptions as any)

  if (!session) {
    return (
      <div className="container mx-auto px-4">
        <SignInCard />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Search</h1>
      <UserSearch searchParams={searchParams} />
      <UserDialog />
      <TechnicalOverview />
    </div>
  );
}
