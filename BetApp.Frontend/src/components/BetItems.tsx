import { useDeleteBet } from '@/hooks/bets';
import { Bet } from '@/types/types';
import { Button } from './ui/button';
import { Loader2, Trash2 } from 'lucide-react';


export default function BetItems({ bet }:  { bet: Bet }) {
  const {deleteBet, isDeleting} = useDeleteBet();

  const handleDelete = async () => {
    await deleteBet(bet.id);
  }

  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{bet.item}</h2>
            <p className="text-sm font-semibold text-gray-400">${bet.highestBid}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-600 ">{bet.user.username}</span>
          <Button size="icon" variant="destructive" onClick={handleDelete}>
            {isDeleting ? (
              <span className="animate-spin">
                <Loader2 />
              </span>
            ) : (
              <Trash2 />
            )}
        </Button>
        </div>
      </div>
     </div>
  )
}



