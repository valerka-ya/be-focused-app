import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const changeNameHandler = (text: string) => {
    setName(text);
  };

  const changeEmailHandler = (text: string) => {
    setEmail(text);
  };

  return (
    <>
      <h1>Hello my new friend, {name}!</h1>
      <p>What's Your name?</p>
      <input
        value={name}
        type="text"
        onChange={(e) => changeNameHandler(e.target.value)}
      />
      <p>What's Your email?</p>
      <input
        value={email}
        type="email"
        onChange={(e) => changeEmailHandler(e.target.value)}
      />
    </>
  );
}

export default App;
