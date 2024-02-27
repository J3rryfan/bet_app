import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormSchema as CreateBet} from "@/components/CreateBetForm";
import { Bet } from "@/types/types";


// get bets from the server
export function useBets() {
  const {data, error, isPending} = useQuery({
    queryKey: ["bets"],
    queryFn: async () => {
      const response = await fetch("/api/Bet")
      const bets: Bet[] = await response.json();
      return bets;
    }
  })
  return { bets: data, error, isPending };
}

// create a bet

export function useCreateBet() {
  const queryClient = useQueryClient();

  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: async (bet: CreateBet & {
      userId: number;
    
    }) => {
      await fetch("/api/bet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bet),
      });
     
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["bets"] });
    },
  });

  return { createBet: mutateAsync, error, isCreating: isPending };
}


// delete a bet

export function useDeleteBet() {
  const queryClient = useQueryClient();

  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: async (id: Bet["id"]) => {
      await fetch(`/api/bet/${id}`, {
        method: "DELETE",
      })
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["bets"] });
    },
  });

  return { deleteBet: mutateAsync, error, isDeleting: isPending };
}



// update a bet
export function useUpdateBet() {
  const queryClient = useQueryClient();

  const {mutateAsync, error, isPending } = useMutation({
    mutationFn: async (bet: Bet) => {
      await fetch(`/api/bet/${bet.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bet),
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["bets"] });
    },
  })

  return { updateBet: mutateAsync, updateError :error, isUpdating: isPending };
}