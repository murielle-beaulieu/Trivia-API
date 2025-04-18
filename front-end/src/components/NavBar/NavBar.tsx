import "./NavBar.module.scss";

interface NavBarProps {
    children: React.ReactNode;
}

function NavBar({children}: NavBarProps) {

    return (
        <nav>{children}</nav>
    )
}

export default NavBar;