import '../navbar.css'

export function NavBar() {
    return <>
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <li className="active"><a href="/">Home</a></li>
                    <li><a href="/add">Új koncert</a></li>
                </ul>
            </div>
        </nav>
    </>
}