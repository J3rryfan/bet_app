import CreateBetForm from './CreateBetForm';
import { TypewriterEffectSmooth } from './typewriter-effect';

export default function MainPage() {
  const words = [
    {
      text: 'Place',
      className: 'text-blue-500 dark:text-blue-500',
    },
    {
      text: 'your',
      className: 'text-blue-500 dark:text-blue-500',
    },
    {
      text: 'bet',
      className: 'text-blue-500 dark:text-blue-500',
    },
  ];

  return (
    <main className='flex flex-col items-center justify-center h-[40rem]'>
      <p className=' dark:text-neutral-200 text-xs sm:text-base  '>
        Unleash Winning Opportunities
      </p>
      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4'>
        <div className='w-full max-w-sm space-y-3 text-center'>
          <TypewriterEffectSmooth words={words} />
          <p className=''>Enter your bet details below</p>

          <CreateBetForm />
        </div>
      </div>
    </main>
  );
}
