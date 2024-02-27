import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useSignalR from "./hooks/useSignalR"

import Header from "./components/Header";
import Main from "./components/Main";
import Bets from "./components/Bets";


// Create a client
const queryClient = new QueryClient();


export default function App() {
  const { connection } = useSignalR("/r/betHub");


  return (
  <QueryClientProvider client={queryClient}> 
      <div className="flex flex-col min-h-screen">
        <Header />
        <div>
          <h1>SignalR Bet</h1>
          <p>{connection ? "✅" : "❌"}</p>
        </div>

        <Main />
        <Bets />

      </div>
  </QueryClientProvider>
  )
}