
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Bets from "./components/Bets";
import Header from "./components/Header";
import Main from "./components/main";



// Create a client
const queryClient = new QueryClient()

export default function App() {

  return(
    <QueryClientProvider client={queryClient}>
    <div className=" flex flex-col min-h-screen">
    <Header />
      <Main />
      <Bets />
    </div>
    </QueryClientProvider>
  )
}