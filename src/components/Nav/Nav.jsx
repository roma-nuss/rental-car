import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo.jsx';
import s from './Nav.module.css';
import clsx from 'clsx';

export const Nav = () => {
  const getLinkClass = ({ isActive }) => clsx(s.navLink, isActive && s.active);

  return (
    <header className={s.header}>
      <NavLink to="/" className={s.logoLink}>
        <Logo />
      </NavLink>
      <nav className={s.navMenu}>
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={getLinkClass}>
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};
