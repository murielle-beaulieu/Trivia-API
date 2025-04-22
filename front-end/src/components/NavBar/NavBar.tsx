import styles from "./NavBar.module.scss";
import trivia_logo from "../assets/trivia_logo.png";
import { Link } from "react-router-dom";

interface NavBarProps {
    children: React.ReactNode;
}

function NavBar({children}: NavBarProps) {

    return (
        <nav><Link to="/"><img src={trivia_logo} className={styles.logo}/></Link>{children}</nav>
    )
}

export default NavBar;