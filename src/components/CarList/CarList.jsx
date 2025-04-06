import { useSelector } from 'react-redux';
import s from './CarList.module.css';
import { CarItem } from '../CarItem/CarItem.jsx';
import { Loader } from '../Loader/Loader.jsx';
import { selectLoading } from '../../redux/cars/selectors.js';

export const CarList = ({ cars }) => {
  const isLoading = useSelector(selectLoading);

  if (!Array.isArray(cars)) {
    return null;
  }

  return (
    <>
      {isLoading && <Loader />}
      <ul className={s.list}>
        {cars.length === 0 ? (
          <li className={s.without}>
            <p>Unfortunately, no cars matching your selection were found.</p>
            <p>Please choose other search parameters.</p>
          </li>
        ) : (
          cars.map(car => (
            <li className={s.item} key={car.id}>
              <CarItem car={car} />
            </li>
          ))
        )}
      </ul>
    </>
  );
};
