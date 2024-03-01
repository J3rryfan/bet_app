import { FlagIcon } from "lucide-react";


export default function Header() {
  return (
    <header className="py-2 border-b ">
          <div className="container flex items-center justify-start px-4 md:px-6">
              <FlagIcon className="w-6 h-6" />
              <span className="text-xl font-semibold tracking-tighter pl-2">BetBlitz</span>
          </div>
    </header>
  )
}