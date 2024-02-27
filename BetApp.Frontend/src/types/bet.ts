import { FormSchema } from "@/components/CreateBetForm";

export interface User {
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

export type CreateTodo = FormSchema;
