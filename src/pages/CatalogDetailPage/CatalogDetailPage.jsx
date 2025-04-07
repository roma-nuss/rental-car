import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../../redux/cars/operations.js';
import { Loader } from '../../components/Loader/Loader.jsx';
import { Form } from '../../components/Form/Form.jsx';
import sprite from '/icons/sprite1.svg';
import s from './CatalogDetailPage.module.css';

const CatalogDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCarDetails = async () => {
      try {
        setLoading(true);
        const data = await getCarById(id);
        setCar(data);
      } catch (error) {
        setError(`Error getting car details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getCarDetails();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const {
    accessories,
    address,
    brand,
    description,
    engineSize,
    fuelConsumption,
    functionalities,
    img,
    mileage,
    model,
    rentalConditions,
    rentalPrice,
    type,
    year,
  } = car;

  const city = address.split(',')[1];
  const country = address.split(',')[2];
  const km = Math.round(Number(mileage) * 1.60934).toLocaleString();
  const arrImg = img.split('/');
  const idCar = arrImg[arrImg.length - 1].replace('-ai.jpg', '');

  return (
    <main className={s.main}>
      <div className={s.container}>
        <div className={s.form}>
          <div className={s.carImg}>
            <img src={img} alt={`${brand} ${model}`} />
          </div>
          <div>
            <Form />
          </div>
        </div>
        <div className={s.carInfo}>
          <div className={s.carMainInfo}>
            <div className={s.model}>
              <h2>
                {brand === 'Land Rover' ? 'Land' : brand} {`${model}`}
                {`, ${year}`}
              </h2>
              <p>{`id: ${idCar}`}</p>
            </div>
            <div className={s['location-mileage']}>
              <p>
                <svg className={s.icon}>
                  <use href={sprite + '#icon-Location'} />
                </svg>
                {`${city}, ${country}`}
              </p>
              <p>{`Mileage: ${km} km`}</p>
            </div>
            <p className={s.carPrice}>{`$${rentalPrice}`}</p>
            <p className={s.carDescription}>{description}</p>
          </div>
          <div className={s.carCondition}>
            <h3>Rental Conditions:</h3>
            <ul>
              {rentalConditions.map(condition => (
                <li key={condition}>
                  <svg className={s.icon}>
                    <use href={sprite + '#icon-check-circle'} />
                  </svg>
                  {condition}
                </li>
              ))}
            </ul>
          </div>
          <div className={s.carSpecification}>
            <h3>Car Specifications:</h3>
            <ul>
              <li>
                <svg className={s.icon}>
                  <use href={sprite + '#icon-calendar'} />
                </svg>
                {`Year: ${year}`}
              </li>
              <li>
                <svg className={s.icon}>
                  <use href={sprite + '#icon-car'} />
                </svg>
                {`Type: ${type}`}
              </li>
              <li>
                <svg className={s.icon}>
                  <use href={sprite + '#icon-fuel-pump'} />
                </svg>
                {`Fuel Consumption: ${fuelConsumption}`}
              </li>
              <li>
                <svg className={s.icon}>
                  <use href={sprite + '#icon-gear'} />
                </svg>
                {`Engine Size: ${engineSize}`}
              </li>
            </ul>
          </div>
          <div className={s.carFunction}>
            <h3>Accessories and functionalities:</h3>
            <ul>
              {accessories.map(accessory => (
                <li key={accessory}>
                  <svg className={s.icon}>
                    <use href={sprite + '#icon-check-circle'} />
                  </svg>
                  {accessory}
                </li>
              ))}
              {functionalities.map(functionality => (
                <li key={functionality}>
                  <svg className={s.icon}>
                    <use href={sprite + '#icon-check-circle'} />
                  </svg>
                  {functionality}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CatalogDetailPage;
