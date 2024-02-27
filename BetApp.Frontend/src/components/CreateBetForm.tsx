import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateBet, useUpdateBet } from "@/hooks/bets";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  item: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters long",
    })
    .max(50, {
      message: "Title must be at least 50 characters short",
    }),
    highestBid: z.number()
    .int({ message: "Highest bid must be a number" })
    .min(1, {
      message: "Highest bid must be at least $1",
    })
    .max(10000, {
      message: "Highest bid must be at most 10000",
    }),

    // username: z.string().min(2, {
    //   message: "Username must be at least 2 characters long",
    // }).max(50, {
    //   message: "Username must be at least 50 characters short",
    // })
});

export type FormSchema = z.infer<typeof formSchema>;

export default function CreateBetForm() {


  const { createBet, error, isCreating } = useCreateBet();


    const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        item: "",
        highestBid: 0,
      },
    });

  async function onSubmit(values: FormSchema) {
    const bet = {...values, userId: 1}
    await createBet(bet);
    console.log("Bet created!", values);
    form.reset();
  }



  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button className="w-full">Create Bet</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Bet</DialogTitle>
        </DialogHeader>


        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {error && (
              <div className=" text-destructive text-sm font-medium text-center ">
                {error.message}
              </div>
            )}

            {/* <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="item"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item</FormLabel>
                    <FormControl>
                      <Input placeholder="Eggs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="highestBid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input 
                      type="number"
                      placeholder="Enter amount" 
                      min={0}
                      {...field}
                      onChange={e => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : parseFloat(value));
                      }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={isCreating}>
                {isCreating ? <p>It is creating</p> : "create"}
              </Button>
            </form>
        </Form>
      </DialogContent>
  </Dialog>

  )
}