import React from 'react'

export default function HeaderPage() {
  return (
    <>
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-black/70 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-2xl font-extrabold tracking-tight">
            <div className="text-2xl font-extrabold tracking-tight text-black"><span style={{color:"#10B981"}}>Sain</span>VandeBharat</div>
            </a>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">— Community • Shop • Match</span>
          </div>

          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="/" className="hover:underline">Home</a>
            {/* <a href="#join" className="hover:underline">Join Us</a> */}
            {/* <a href="#login" className="hover:underline">Login</a> */}
            <a href="#support" className="hover:underline">Support Us</a>
            <a href="/join"><button className="ml-2 rounded-md bg-emerald-600 px-4 py-2 text-white text-sm hover:bg-emerald-700" style={{color:"white"}}>Join Us</button></a>
          </nav>

          <div className="sm:hidden">
            <button aria-label="Open menu" className="rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              {/* simple hamburger icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
