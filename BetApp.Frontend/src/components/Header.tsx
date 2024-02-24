import { CircleDollarSign } from "lucide-react";



export default function Header() {
  return (
    <div>
       <header className="bg-gray-50 py-2 border-b dark:bg-gray-900">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <div className=" flex items-center space-x-2">
          <CircleDollarSign className="w-8 h-8" />
          <span className=" text-2xl font-semibold tracking-tighter">Betting App</span>
          </div>
        </div>
      </header>

    </div>
  )
}