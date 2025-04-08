import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import s from './CarItem.module.css';
import { Btn } from '../Btn/Btn.jsx';
import { addFavoriteCar, removeFavoriteCar } from '../../redux/cars/slice.js';
import { selectFavoriteCars } from '../../redux/cars/selectors.js';
import sprite from '/icons/drp_sprite_1.svg';

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
  const favoriteCarList = useSelector(selectFavoriteCars);
  const isCarFavorite = favoriteCarList.some(
    favoriteCar => favoriteCar.id === id
  );

  const handleFavoriteCarClick = () => {
    if (isCarFavorite) {
      dispatch(removeFavoriteCar(id));
    } else {
      dispatch(addFavoriteCar(car));
    }
  };

  const city = address.split(',')[1];
  const country = address.split(',')[2];
  const km = Math.round(Number(mileage) * 1.60934).toLocaleString();
  return (
    <>
      <div className={s.container} onClick={handleFavoriteCarClick}>
        {isCarFavorite ? (
          <svg className={s.icon_active}>
            <use href={sprite + '#icon-favoriteActive'} />
          </svg>
        ) : (
          <svg className={s.icons}>
            <use href={sprite + '#icon-favorite'} />
          </svg>
        )}
      </div>
      <img className={s.img} src={img} alt={`${brand} ${model}`} />

      <div className={s.model}>
        <p>
          {brand === 'Land Rover' ? 'Land' : brand} <span>{`${model}`}</span>
          {`, ${year}`}
        </p>
        <p>{`$${rentalPrice}`}</p>
      </div>
      <div className={s.location}>
        <p>{`${city} | ${country} | ${rentalCompany} |`}</p>
        <p>{`${type} | ${km} km`}</p>
      </div>

      <Link state={location} to={`/catalog/${id}`}>
        <Btn title="Read more" type="button">
          Read more
        </Btn>
      </Link>
    </>
  );
};
