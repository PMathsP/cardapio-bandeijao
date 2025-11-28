import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="header">
      <div className="logo-area">
        <img
          src={dark ? "/img/logo-ifsp-dark.png" : "/img/logo-ifsp-light.png"}
          alt="IFSP"
          className="logo"
        />

      </div>

      <nav className="menu">
        <Link to="/">Cardápio</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/recarga">Pagamento</Link>
        <Link to="/admin">Admin</Link>

        <button className="dark-btn" onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </nav>
    </header>
  );
}
