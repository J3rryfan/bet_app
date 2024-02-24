import { useBets } from "@/hooks/bets";
import BetItems from "./BetItems";


export default function Bets() {
  const { bets, error, isPending } = useBets();

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ): error ? (
        <div>Error: {error.message}</div>
      ) : bets ? (
        bets.map((bet) => <BetItems key={bet.id} bet={bet} />)
      ) : (
        <div>No bets found</div>
      )}
    </div>
  )
}