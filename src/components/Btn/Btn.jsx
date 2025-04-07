import clsx from 'clsx';
import s from './Btn.module.css';

export const Btn = ({ title, type, onClick, children }) => {
  const classes = mainClass => {
    return clsx(mainClass, {
      [s.btnHomePage]: title === 'View Catalog',
      [s.btnListItem]: title === 'Read more',
      [s.btnSearch]: title === 'Search',
      [s.btnSend]: title === 'Send',
      [s.btnLoadMore]: title === 'Load more',
    });
  };

  return (
    <button
      type={type}
      onClick={title === 'Load more' ? onClick : undefined}
      className={classes(s.btn)}
    >
      {children}
    </button>
  );
};
