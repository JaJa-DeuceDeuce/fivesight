import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        Fivesight game epic :D
      </header>
    </div>
  )
}
