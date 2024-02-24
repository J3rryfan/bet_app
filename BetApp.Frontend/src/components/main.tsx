import CreateBetForm from "./CreateBetForm";

export default function Main() {
  return (
    <main className="flex-1 grid items-center justify-center min-h-[calc(100vh_-_3rem)] py-10">
      <div className="container flex flex-col items-center px-4 md:px-6 space-y-4">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">Place Your Bet</h1>
      <div>
        <CreateBetForm />
      </div>
      </div>
    </main>
  )
}