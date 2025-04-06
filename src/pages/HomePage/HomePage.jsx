import { Link } from 'react-router-dom';
import { Btn } from '../../components/Btn/Btn.jsx';
import s from './HomePage.module.css';

const HomePage = () => {
  return (
    <main className={s.main}>
      <div className={s.contentWrapper}>
        <h1>Find Your Perfect Rental Car</h1>
        <h2>Reliable and Budget-Friendly Rentals for Every Journey</h2>
        <Link to="/catalog">
          <Btn title="Browse Catalog" type="button">
            Browse Catalog
          </Btn>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
