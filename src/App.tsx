import { useState } from "react";
import "./App.css";

type Mode = "login" | "register";

function App() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setMessage("");
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (mode === "login") {
      if (!email || !password) {
        setMessage("Пожалуйста, заполните email и пароль.");
        return;
      }
      setMessage(`Успешный вход: ${email}`);
      return;
    }

    // register
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Пожалуйста, заполните все поля.");
      return;
    }
    if (password.length < 6) {
      setMessage("Пароль должен быть не короче 6 символов.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Пароли не совпадают.");
      return;
    }
    setMessage(`Регистрация успешна: ${name} (${email})`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Be Focused</h1>

        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`px-4 py-2 rounded-md transition-colors ${
              mode === "login"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            Вход
          </button>
          <button
            type="button"
            onClick={() => switchMode("register")}
            className={`px-4 py-2 rounded-md transition-colors ${
              mode === "register"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            Регистрация
          </button>
        </div>

        <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md shadow-xl rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <form onSubmit={handleSubmit} className="grid gap-4">
            {mode === "register" && (
              <label className="grid gap-1">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Имя
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите имя"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
            )}

            <label className="grid gap-1">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Пароль
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Минимум 6 символов"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            {mode === "register" && (
              <label className="grid gap-1">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Подтверждение пароля
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Повторите пароль"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
            )}

            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 transition-colors"
            >
              {mode === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-emerald-600 dark:text-emerald-400">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
