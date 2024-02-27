import { Button } from "@/components/ui/button"
import { FlagIcon } from "lucide-react"
import { Input } from "./components/ui/input"

import useSignalR from "./hook/useSignalR"



export default function App() {
  const { connection } = useSignalR("/r/betHub");
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-50 py-2 border-b dark:bg-gray-900">
        <div className="container flex items-center justify-between px-4 md:px-6">
            <FlagIcon className="w-6 h-6" />
            <span className="text-lg font-semibold tracking-tighter">BetBlitz</span>
        </div>
      </header>

      <div>
        <h1>SignalR Bet</h1>
        <p>{connection ? "✅" : "❌"}</p>
      </div>
      

      <main className="flex-1 grid items-center justify-center min-h-[calc(100vh_-_3rem)] py-10">
        <div className="container flex flex-col items-center px-4 md:px-6 space-y-4">
          <div className="w-full max-w-sm space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">Place Your Bet</h1>
          </div>
          <form className="flex w-full max-w-sm flex-col space-y-2">
            <Input className="border-gray-300" min="1" placeholder="Enter amount" type="number" />
            <Button className="self-end w-auto">Bet</Button>
          </form>
        </div>
      </main>
     
    </div>
  )
}