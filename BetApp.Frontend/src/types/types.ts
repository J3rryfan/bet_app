import { FormSchema } from "@/components/CreateBetForm";

interface User {
  id: number;
  username: string;
}

export type Bet = {
  id: number;
  item: string;
  highestBid: number;
  userId: number;
  user: User;
}

export type CreateBet = FormSchema;