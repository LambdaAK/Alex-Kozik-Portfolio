import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-extrabold text-blue-400">Tailwind is Working!</h1>
      <p className="text-lg text-gray-300">If you see this styled text, Tailwind CSS is set up correctly.</p>
      <button className="px-6 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition">Test Button</button>
    </div>
  );
}

export default App
