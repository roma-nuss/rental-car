// import { Link } from 'react-router-dom';
// import { Btn } from '../../components/Btn/Btn.jsx';
// import s from './HomePage.module.css';

// const HomePage = () => {
//   return (
//     <main className={s.main}>
//       <div className={s.contentWrapper}>
//         <h1>Find Your Perfect Rental Car</h1>
//         <h2>Reliable and Budget-Friendly Rentals for Every Journey</h2>
//         <Link to="/catalog">
//           <Btn title="Browse Catalog" type="button">
//             Browse Catalog
//           </Btn>
//         </Link>
//       </div>
//     </main>
//   );
// };

// export default HomePage;

import { Link } from 'react-router-dom';
import { Btn } from '../../components/Btn/Btn.jsx';
import s from './HomePage.module.css';

const HomePage = () => {
  return (
    <main className={s.main}>
      <div className={s.container}>
        <h1>Find your perfect rental car</h1>
        <h2>Reliable and budget-friendly rentals for any journey</h2>
        <Link to="/catalog">
          <Btn title="View Catalog" type="button">
            View Catalog
          </Btn>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
