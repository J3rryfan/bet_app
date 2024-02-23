import {useState, useEffect} from 'react';


interface User {
  id: number;
  username: string;
}

type Bet = {
  id: number;
  item: string;
  highestBid: number;
  userId: number;
  user: User;
}

export default function BetItems() {
  const [bets, setBets] = useState<Bet[]>([]);


   // get the list of bets
   useEffect(() => {

    async function fetchBet() {
      const result = await fetch("/api/bet");
     const bets = await result.json();
     setBets(bets);
     console.log(bets);
    }
     fetchBet();
   },[])

  return (
    <div>
          {bets.map((bet) => (
          <div key={bet.id} className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
        <span>{bet.item}</span>
        </div>
        <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold">${bet.highestBid}</span>
        <span className="text-sm text-gray-500">by {bet.user.username}</span>
        </div>
        </div>
        ))}
     </div>
    
  )
}



