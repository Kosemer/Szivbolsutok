/* Ez a komponens egy bejelentkezési űrlapot jelenít meg. A felhasználó a felhasználónév és jelszó mezőkben adhatja meg adatait. Az adatokat HTTP POST kéréssel továbbítja a "http://localhost/login.php" címre. Ha a bejelentkezés sikeres, a komponens állapota megváltozik: a 'loggedIn' állapot igazra vált, és megjelenik az 'ImageUploader' komponens, amely a bejelentkezett felhasználónak képfeltöltési lehetőséget biztosít. Ha a bejelentkezés nem sikerül, a felhasználó hibajelzést kap. */

import classes from "./LoginForm.module.css";
import { useState, useEffect } from "react";
import ImageUploader from "../AdminPage/ImageUploader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function LoginForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost/backend/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setLoggedIn(true);
      setError(null);
    } else {
      setError("Hibás felhasználónév vagy jelszó");
    }
  };
  return (
    <>
      {!loggedIn && (
        <div className={classes.container}>
          <form className={classes.loginForm}>
            <div className={classes.flexRow}>
              <label className={classes.label} htmlFor="username">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="#FF7F7F"
                  class="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
              </label>
              <input
                id="username"
                className={classes.input}
                placeholder="Felhasználónév"
                type="text"
                required
              />
            </div>
            <div className={classes.flexRow}>
              <label className={classes.label} htmlFor="password">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="#FF7F7F"
                  class="bi bi-key-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
              </label>
              <input
                id="password"
                className={classes.input}
                placeholder="Jelszó"
                type="password"
                required
              />
            </div>
            {error && <p className={classes.errorMessage}>{error}</p>}
            <input
              className={classes.submit}
              type="submit"
              value="Bejelentkezés"
              onClick={handleSubmit}
            />
          </form>
        </div>
      )}
      <DndProvider backend={HTML5Backend}>
        {loggedIn && <ImageUploader setLoggedIn={setLoggedIn} />}
      </DndProvider>
    </>
  );
}

export default LoginForm;
