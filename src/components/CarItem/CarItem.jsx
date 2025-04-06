import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import s from './CarItem.module.css';
import { Btn } from '../Btn/Btn.jsx';
import {
  addCarToFavorites,
  removeCarFromFavorites,
} from '../../redux/cars/slice.js';
import { selectFavoriteCarList } from '../../redux/cars/selectors.js';
import sprite from '/icons/sprite1.svg';

export const CarItem = ({ car }) => {
  const {
    id,
    brand,
    model,
    year,
    img,
    mileage,
    rentalPrice,
    type,
    rentalCompany,
    address,
  } = car;

  const dispatch = useDispatch();
  const location = useLocation();

  const favoriteList = useSelector(selectFavoriteCarList);
  const isCarFavorite = favoriteList.some(item => item.id === id);

  const handleFavoriteToggle = () => {
    if (isCarFavorite) {
      dispatch(removeCarFromFavorites(id));
    } else {
      dispatch(addCarToFavorites(car));
    }
  };

  const [city, country] = useMemo(() => {
    const [, city = '', country = ''] = address.split(',');
    return [city.trim(), country.trim()];
  }, [address]);

  const mileageKm = useMemo(() => {
    return Math.round(Number(mileage) * 1.60934).toLocaleString();
  }, [mileage]);

  const displayedBrand = brand === 'Land Rover' ? 'Land' : brand;

  return (
    <>
      <div className={s.icon} onClick={handleFavoriteToggle}>
        <svg className={isCarFavorite ? s.icon_active : s.icon}>
          <use
            href={`${sprite}#${
              isCarFavorite ? 'icon-favoriteActive' : 'icon-favorite'
            }`}
          />
        </svg>
      </div>

      <img className={s.img} src={img} alt={`${brand} ${model}`} />

      <div className={s.model}>
        <p>
          {displayedBrand} <span>{model}</span>, {year}
        </p>
        <p>{`$${rentalPrice}`}</p>
      </div>

      <div className={s.location}>
        <p>{`${city} | ${country} | ${rentalCompany} |`}</p>
        <p>{`${type} | ${mileageKm} km`}</p>
      </div>

      <Link to={`/catalog/${id}`} state={location}>
        <Btn variant="readMore" type="button">
          Read more
        </Btn>
      </Link>
    </>
  );
};
