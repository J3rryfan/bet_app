import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormSchema as BetTodo } from "@/components/CreateBetForm";
import { Bet } from "@/types/bet";


// get a list of bets
export function useBets() {
  const { data, error, isPending } = useQuery({
    queryKey: ["bets"],
    queryFn: async () => {
      const response = await fetch("/api/bet");
      const bets: Bet[] = await response.json();
      return bets;
    }
  });

  return { bets: data, error, isPending };
}


// Create a bet
export function useCreateBet() {
  const queryClient = useQueryClient();

  const { mutateAsync, error, isPending } = useMutation({
     mutationFn: async (bet: BetTodo) => {
      const response = await fetch("/api/bet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(bet)
      })
      return response.json();
     },
     onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["bets"] });
    },
  })

  return { createBet: mutateAsync, error, isCreating: isPending };
}



// delete a bet

export function useDeleteBet () {
  const queryClient = useQueryClient();

  const { mutateAsync, error, isPending} = useMutation({
    mutationFn: async (id: Bet["id"]) => {
      await fetch(`/api/bet/${id}`, {
        method: "DELETE"
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["bets"] });
    },
  });
  return { deleteBet: mutateAsync, error, isDeleting: isPending };
}