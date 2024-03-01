import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

import useSignalR from './hooks/useSignalR';

import Header from './components/Header';
import Bets from './components/Bets';
import { Bet } from './types/bet';

import { toast } from 'sonner';

import { Toaster } from '@/components/ui/sonner';
import MainPage from './components/Main-page';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  const { connection } = useSignalR('/r/betHub');

  useEffect(() => {
    if (!connection) {
      return;
    }

    // listen for bets from the server
    connection.on('ReceiveBet', (bet: Bet) => {
      // from the server
      queryClient.setQueryData(['bets'], (old: Bet[] | undefined) => {
        if (!old) return [bet];
        return [...old, bet];
      });

      // show a toast
      toast('New Bet', {
        description: `from ${bet.user.username} for ${bet.item} at $${bet.highestBid}`,
        action: {
          label: 'View',
          onClick: () => {
            console.log('clicked');
          },
        },
      });

      console.log('WTF', bet);
    });

    return () => {
      connection.off('ReceiveBet');
    };
  }, [connection]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <div>
          <h1>SignalR Bet</h1>
          <p>{connection ? '✅' : '❌'}</p>
        </div>
        <MainPage />
        <Bets />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
