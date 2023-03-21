import { Link, NavLink } from "react-router-dom";

import './Header.scss'

export default function Header() {
    return (
        <header className="header">
            <Link className="header__logo" to="/"><img alt="site logo"/></Link>
            <div className="header__nav-list">
                <NavLink className="header__nav-link" activeClassName="header__nav-link--active" to="/">Warehouses</NavLink>
                <NavLink className="header__nav-link" activeClassName="header__nav-link--active" to="/inventory">Inventory</NavLink>
            </div>
        </header>
    )
}