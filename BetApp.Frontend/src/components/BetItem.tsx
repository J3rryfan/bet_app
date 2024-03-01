import { Bet } from '@/types/bet';
import { Button } from './ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { useDeleteBet } from '@/hooks/bets';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import EditBetForm from './EditForm';

export default function BetItem({ bet }: { bet: Bet }) {
  const { deleteBet, isDeleting } = useDeleteBet();

  const handleDelete = async () => {
    await deleteBet(bet.id);
  };

  console.log('This is a test for git hub .');

  return (
    <Card className=' flex items-center justify-between p-4 '>
      <CardHeader>
        <CardTitle>
          <h1 className='text-3xl font-semibold'>{bet.item}</h1>
        </CardTitle>
      </CardHeader>

      <CardContent className=' grid grid-cols-1 '>
        <p className='text-1xl font-semibold'>Current Bid: ${bet.highestBid}</p>
        <p className='text-1xl font-semibold'>Owner: {bet.user.username}</p>
      </CardContent>

      <CardFooter className=' flex items-center space-x-3'>
        <EditBetForm />
        <Button size='icon' variant='destructive' onClick={handleDelete}>
          {isDeleting ? (
            <span className='animate-spin'>
              <Loader2 />
            </span>
          ) : (
            <Trash2 />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
