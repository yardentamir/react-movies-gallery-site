import { NavLink } from "react-router-dom";
import { NAV_LINK_NAMES } from "./Header.constants";
import "./Header.css";

export default function Header() {

  return (
    <header className="nav-wrapper">
      <div className="logo-container">
        <NavLink to={NAV_LINK_NAMES[0].route}>Cellcom</NavLink>
      </div>
      <nav>
        <input className="hidden" type="checkbox" id="menuToggle" />
        <label className="menu-btn" htmlFor="menuToggle">
          <div className="menu"></div>
          <div className="menu"></div>
          <div className="menu"></div>
        </label>
        <div className="nav-container">
          <ul className="nav-tabs">
            <li className="nav-tab">
              <NavLink to={NAV_LINK_NAMES[0].route}>Home</NavLink>
            </li>
          </ul>
        </div>
      </nav>

    </header>
  )
}
