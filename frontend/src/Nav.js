import logo from './images/logo.png';
export default function Nav(){
    return(
        <nav className="navbar navbar-light">
            <a className="navbar-brand" href="">
                <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="Logo of Bill Tracker" />
            Bill Tracker
            </a>
        </nav>
    );
}