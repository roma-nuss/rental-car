import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo.jsx';
import s from './Nav.module.css';
import clsx from 'clsx';

export const Nav = () => {
  const getLinkClass = ({ isActive }) => clsx(s.link, isActive && s.active);

  return (
    <header className={s.header}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <nav className={s.nav}>
        <NavLink className={getLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={getLinkClass} to="/catalog">
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};
