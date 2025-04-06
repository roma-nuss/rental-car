import { useSelector } from 'react-redux';
import s from './CarList.module.css';
import { CarItem } from '../CarItem/CarItem.jsx';
import { Loader } from '../Loader/Loader.jsx';
import { selectLoadingState } from '../../redux/cars/selectors.js';

export const CarList = ({ cars }) => {
  const isLoading = useSelector(selectLoadingState);

  const renderCarList = () => {
    if (cars.length === 0) {
      return (
        <li className={s.without}>
          <p>No cars were found matching your search criteria.</p>
          <p>Please try adjusting your search parameters.</p>
        </li>
      );
    }

    return cars.map(car => (
      <li className={s.item} key={car.id}>
        <CarItem car={car} />
      </li>
    ));
  };

  return (
    <>
      {isLoading && <Loader />}
      <ul className={s.list}>{renderCarList()}</ul>
    </>
  );
};
