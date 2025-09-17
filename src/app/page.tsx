"use client";

import Link from "next/link";

export default function Home() {
  const handleStartFocus = () => {
    console.log("TODO: start focus session");
  };

  const handleAddTask = () => {
    console.log("TODO: open add-task modal");
  };

  const handleOpenSettings = () => {
    console.log("TODO: open settings");
  };

  return (
    <div className="min-h-screen px-6 py-10 flex flex-col items-center">
      <header className="w-full max-w-3xl flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold">Be Focused</h1>
        <nav className="flex items-center gap-3">
          <Link
            href="/auth"
            className="text-sm text-indigo-600 hover:underline"
          >
            Auth
          </Link>
          <button
            type="button"
            onClick={handleOpenSettings}
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            Settings
          </button>
        </nav>
      </header>

      <main className="w-full max-w-3xl grid gap-8">
        <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-6">
          <h2 className="text-xl font-medium mb-2">Focus session</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Plan your next focus block. Use tasks list below or start a quick
            session.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleStartFocus}
              className="rounded-md bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium"
            >
              Start focus
            </button>
            <button
              type="button"
              onClick={handleAddTask}
              className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm"
            >
              Add task
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-6">
          <h2 className="text-xl font-medium mb-3">Your tasks</h2>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between rounded-md border border-gray-200 dark:border-gray-800 px-3 py-2">
              <span className="text-sm">Task example #1</span>
              <button
                type="button"
                onClick={() => console.log("TODO: select task #1")}
                className="text-xs text-indigo-600 hover:underline"
              >
                Select
              </button>
            </li>
            <li className="flex items-center justify-between rounded-md border border-gray-200 dark:border-gray-800 px-3 py-2">
              <span className="text-sm">Task example #2</span>
              <button
                type="button"
                onClick={() => console.log("TODO: select task #2")}
                className="text-xs text-indigo-600 hover:underline"
              >
                Select
              </button>
            </li>
            <li className="flex items-center justify-between rounded-md border border-gray-200 dark:border-gray-800 px-3 py-2">
              <span className="text-sm">Task example #3</span>
              <button
                type="button"
                onClick={() => console.log("TODO: select task #3")}
                className="text-xs text-indigo-600 hover:underline"
              >
                Select
              </button>
            </li>
          </ul>
        </section>
      </main>

      <footer className="w-full max-w-3xl mt-12 text-xs text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Be Focused</p>
      </footer>
    </div>
  );
}
