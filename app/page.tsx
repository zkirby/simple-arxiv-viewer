import PapersList from "../components/PapersList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <h1 className="text-xl font-bold mb-10">Your Daily Dose of Arxiv</h1>
      <PapersList />
    </main>
  );
}
