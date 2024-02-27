
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from "react";
import { Bet } from './types/types';
import useSignalR from './hooks/useSignalR';


import Bets from "./components/Bets";
import Header from "./components/Header";
import Main from "./components/main";


import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ThemeProvider } from './components/theme-provider';


// Create a client
const queryClient = new QueryClient()

export default function App() {
  const { connection } = useSignalR("/r/betHub");

  useEffect(() => {
    if(!connection) return;

   connection.on("NewBet", (bet: Bet) => {
    queryClient.setQueryData(["bets"], (old: Bet[] | undefined) => {
      if (!old) return [];
      return [...old, bet];
    });

    // Display a toast notification
    toast(`Bet created. ${bet.user.username} has placed a bet on ${bet.item} for $${bet.highestBid}!`, )
   });

    return () => { 
      connection.off("NewBet");
    }
  }, [connection])
 

  return(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider >
    
    <div className=" flex flex-col min-h-screen">
    
      <Header />
   
      <div className='dark:bg-gray-900'>
        <h1 className=" text-lg dark:text-white">SignalR Bet</h1>
        <p>{connection ? "✅" : "❌"}</p>
      </div>
      
        <Main />
        <Bets />
        <Toaster />
    </div>
    </ThemeProvider>
    </QueryClientProvider>
  )
}