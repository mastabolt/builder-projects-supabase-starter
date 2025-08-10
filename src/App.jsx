import Properties from './components/Properties'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="px-6 py-4 border-b border-gray-200 bg-white sticky top-0">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">Edit this page visually in Builder Projects.</p>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Properties />
        </div>
      </main>
    </div>
  )
}
