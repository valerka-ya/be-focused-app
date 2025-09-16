"use client";

import { useEffect, useState } from "react";
// import { getAccount, ID } from "@/services/appwrite";

type Mode = "login" | "register";
// const account = getAccount();

export default function Auth() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);

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

  const loadCurrentUser = async () => {
    // try {
    //   const user = await account.get();
    //   setCurrentUserName(user.name || user.email);
    // } catch {
    //   setCurrentUserName(null);
    // }
  };

  useEffect(() => {
    (async () => {
      try {
        await loadCurrentUser();
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    // try {
    //   setLoading(true);
    //   await account.deleteSession("current");
    //   setCurrentUserName(null);
    //   setMessage("Вы вышли из аккаунта");
    //   setMode("login");
    //   resetForm();
    // } catch (err: unknown) {
    //   const errorMessage =
    //     err instanceof Error ? err.message : "Не удалось выйти";
    //   setMessage(errorMessage);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setMessage("");

    // if (mode === "login") {
    //   if (!email || !password) {
    //     setMessage("Пожалуйста, заполните email и пароль.");
    //     return;
    //   }

    //   try {
    //     setLoading(true);
    //     await account.createEmailPasswordSession(email, password);
    //     await loadCurrentUser();
    //     setMessage(`Успешный вход: ${email}`);
    //   } catch (err: unknown) {
    //     const errorMessage =
    //       err instanceof Error ? err.message : "Не удалось войти";
    //     setMessage(errorMessage);
    //   } finally {
    //     setLoading(false);
    //   }
    //   return;
    // }

    // // register
    // if (!name || !email || !password || !confirmPassword) {
    //   setMessage("Пожалуйста, заполните все поля.");
    //   return;
    // }
    // if (password.length < 6) {
    //   setMessage("Пароль должен быть не короче 6 символов.");
    //   return;
    // }
    // if (password !== confirmPassword) {
    //   setMessage("Пароли не совпадают.");
    //   return;
    // }

    // try {
    //   setLoading(true);
    //   await account.create(ID.unique(), email, password, name);
    //   await account.createEmailPasswordSession(email, password);
    //   await loadCurrentUser();
    //   setMessage(`Регистрация успешна: ${name} (${email})`);
    // } catch (err: unknown) {
    //   const errorMessage =
    //     err instanceof Error ? err.message : "Не удалось зарегистрироваться";
    //   setMessage(errorMessage);
    // } finally {
    //   setLoading(false);
    // }
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">Загрузка...</p>
      </div>
    );
  }

  if (currentUserName) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-semibold mb-2">
            Привет, {currentUserName}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Вы уже авторизованы.
          </p>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className={`inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-rose-600 hover:bg-rose-700"
            }`}
          >
            {loading ? "Выход..." : "Выйти"}
          </button>
          {message && (
            <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

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
              disabled={loading}
              className={`mt-2 w-full rounded-md text-white font-medium py-2 transition-colors ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading
                ? "Пожалуйста, подождите..."
                : mode === "login"
                ? "Войти"
                : "Зарегистрироваться"}
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
