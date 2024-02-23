
import { CircleDollarSign } from "lucide-react"
// import { useState } from "react";
import BetItems from "./components/BetItems";
import CreateDialogForm from "./components/CreateDialogForm";


export default function App() {
  // const [amount, setAmount] = useState<number>(0);

  return(
    <div className=" flex flex-col min-h-screen">
     <header className="bg-gray-50 py-2 border-b dark:bg-gray-900">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <div className=" flex items-center space-x-2">
          <CircleDollarSign className="w-8 h-8" />
          <span className=" text-2xl font-semibold tracking-tighter">Betting App</span>
          </div>
        </div>
      </header>

      <main className="flex-1 grid items-center justify-center min-h-[calc(100vh_-_3rem)] py-10">
        <div className="container flex flex-col items-center px-4 md:px-6 space-y-4">
          <div className="w-full max-w-sm space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">Place Your Bet</h1>
            <BetItems />
          </div>
          <CreateDialogForm />
        </div>
      </main>
     
    </div>
  )
}