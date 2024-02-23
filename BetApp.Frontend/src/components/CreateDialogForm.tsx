import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { useState } from "react";

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
      message: "Highest bid must be at least 1",
    })
    .max(10000, {
      message: "Highest bid must be at most 10000",
    })
});

export type FormSchema = z.infer<typeof formSchema>;

export default function CreateDialogForm() {  

    const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        item: "",
        highestBid: 0,
      },
    });

  function onSubmit(values: FormSchema) {
    console.log(values);
  }


  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button className="w-full">Create Button</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Bet</DialogTitle>
        </DialogHeader>


        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      {...field}
                      onChange={e => {
                        const value = e.target.value;
                        field.onChange(value === "" ? null : parseFloat(value));
                      }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full">
                Submit
              </Button>
            </form>
        </Form>
      </DialogContent>
  </Dialog>

  )
}