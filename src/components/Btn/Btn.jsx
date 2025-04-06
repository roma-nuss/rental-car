import clsx from 'clsx';
import s from './Btn.module.css';

export const Btn = ({ variant, type = 'button', onClick, children }) => {
  const variantClasses = {
    catalog: s.btnHomePage,
    readMore: s.btnListItem,
    search: s.btnSearch,
    send: s.btnSend,
    loadMore: s.btnLoadMore,
  };

  const getButtonClassName = () =>
    clsx(s.btn, variant && variantClasses[variant]);

  return (
    <button type={type} onClick={onClick} className={getButtonClassName()}>
      {children}
    </button>
  );
};
