export default async function CategoryPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const items = Array.from({length: 4}).map((_, i) => ({
    id: i,
    name: `Modèle ${i + 1}`,
    price: `${20 + i * 5}€`
  }));

  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold capitalize">{slug}</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border p-4 shadow-sm bg-white dark:bg-zinc-800"
          >
            <div className="mb-2 h-32 rounded bg-gray-200 dark:bg-zinc-700" />
            <h2 className="font-medium">{item.name}</h2>
            <p className="text-sm text-gray-600 dark:text-zinc-400">{item.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
