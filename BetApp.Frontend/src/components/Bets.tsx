import { useBets } from '@/hooks/bets';
import BetItem from './BetItem';

export default function Bets() {
  const { bets, error, isPending } = useBets();

  return (
    <div className=' grid grid-cols-2 space-x-2 space-y-2'>
      {isPending ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : bets ? (
        bets.map((bet) => <BetItem key={bet.id} bet={bet} />)
      ) : (
        <div>No Bets</div>
      )}
    </div>
  );
}
