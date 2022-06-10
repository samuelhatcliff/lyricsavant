import { NavLink, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import './App.css'

const NavBar = () => {
    return (
        <nav>
            <AppBar position="fixed" className="appBar">
                <Toolbar className="navigation">
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink exact to="/contribute">Contribute</NavLink>
                    <NavLink to="/grid">Grid</NavLink>
                </Toolbar>

            </AppBar>

        </nav>
    )
}

export default NavBar