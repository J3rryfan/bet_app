import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEditBet } from '@/hooks/bets';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

const formSchema = z.object({
  highestBid: z
    .number()
    .int({ message: 'Highest bid must be a number' })
    .min(1, {
      message: 'Highest bid must be at least $1',
    })
    .max(10000, {
      message: 'Highest bid must be at most 10000',
    }),

  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters long",
  // }).max(50, {
  //   message: "Username must be at least 50 characters short",
  // })
});

export type FormSchema = z.infer<typeof formSchema>;

export default function EditBetForm() {
  // const { createBet, error, isCreating } = useCreateBet();
  // edit bet
  const { editBet, error, isEditing } = useEditBet();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      highestBid: 0,
    },
  });

  async function onSubmit(values: FormSchema) {
    const bet = { ...values, userId: 1 };
    await editBet(bet);
    console.log('Bet edited!', values);
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Pencil size='icon' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>How much do you want to Bet</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {error && (
              <div className=' text-destructive text-sm font-medium text-center '>
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

            {/* <FormField
              control={form.control}
              name='item'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item</FormLabel>
                  <FormControl>
                    <Input placeholder='Eggs' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name='highestBid'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter amount'
                      min={0}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === '' ? '' : parseFloat(value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' disabled={isEditing}>
              {isEditing ? <p>It is editing</p> : 'Bet'}
            </Button>
            {/* <Toaster />  */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
