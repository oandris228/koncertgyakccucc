import { NavLink } from 'react-router-dom'
import '../navbar.css'

export function NavBar() {
    return <>
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <li className="active"><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/add">Új koncert</NavLink></li>
                </ul>
            </div>
        </nav>
    </>
}