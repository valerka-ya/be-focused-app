"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getAccount, ID } from "@/shared/api/appwrite";
import type { AppUser } from "@/entities/user";
import { mapAccountUser } from "@/entities/user";

type AuthMode = "login" | "register";

export function useAuth() {
  const account = useMemo(() => getAccount(), []);

  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<AppUser | null>(null);

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  const switchMode = useCallback(
    (next: AuthMode) => {
      setMode(next);
      setMessage("");
      resetForm();
    },
    [resetForm]
  );

  const loadCurrentUser = useCallback(async () => {
    try {
      const u = await account.get();
      setUser(mapAccountUser(u));
    } catch {
      setUser(null);
    }
  }, [account]);

  useEffect(() => {
    (async () => {
      try {
        await loadCurrentUser();
      } finally {
        setInitializing(false);
      }
    })();
  }, [loadCurrentUser]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await account.deleteSession("current");
      setUser(null);
      setMessage("Вы вышли из аккаунта");
      setMode("login");
      resetForm();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Не удалось выйти";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [account, resetForm]);

  const submit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      setMessage("");

      if (mode === "login") {
        if (!email || !password) {
          setMessage("Пожалуйста, заполните email и пароль.");
          return;
        }

        try {
          setLoading(true);
          await account.createEmailPasswordSession({ email, password });
          await loadCurrentUser();
          setMessage(`Успешный вход: ${email}`);
        } catch (err: unknown) {
          const errorMessage =
            err instanceof Error ? err.message : "Не удалось войти";
          setMessage(errorMessage);
        } finally {
          setLoading(false);
        }
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

      try {
        setLoading(true);
        await account.create({ userId: ID.unique(), email, password, name });
        await account.createEmailPasswordSession({ email, password });
        await loadCurrentUser();
        setMessage(`Регистрация успешна: ${name} (${email})`);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Не удалось зарегистрироваться";
        setMessage(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [mode, name, email, password, confirmPassword, account, loadCurrentUser]
  );

  return {
    // state
    mode,
    name,
    email,
    password,
    confirmPassword,
    message,
    loading,
    initializing,
    user,
    // actions
    setMode: switchMode,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    submit,
    logout,
  } as const;
}
