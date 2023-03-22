import { Link, NavLink } from "react-router-dom";

import logo from '../../assets/logo/InStock-Logo.svg'
import './Header.scss'

export default function Header() {
    return (
        <header className="header">
            <div className="header__content">
                <Link className="header__logo" to="/"><img src={logo} alt="site logo"/></Link>
                <div className="header__nav-list">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                        isActive ? "header__nav-link--active" : "header__nav-link"}>
                        Warehouses</NavLink>
                    <NavLink
                        to="/inventory"
                        className={({ isActive }) =>
                        isActive ? "header__nav-link--active" : "header__nav-link"}>
                        Inventory</NavLink>
                </div>
            </div>
        </header>
    )
}