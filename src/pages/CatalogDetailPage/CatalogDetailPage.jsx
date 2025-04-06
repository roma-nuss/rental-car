import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCarById } from '../../redux/cars/operations.js';
import { Loader } from '../../components/Loader/Loader.jsx';
import { Form } from '../../components/Form/Form.jsx';
import sprite from '/icons/sprite1.svg';
import s from './CarDetailsPage.module.css';

const CatalogDetailPage = () => {
  const { carId } = useParams();
  const [carDetails, setCarDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setIsLoading(true);
        const details = await fetchCarById(carId);
        setCarDetails(details);
      } catch (error) {
        setErrorMessage(`Error fetching car details: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarDetails();
  }, [carId]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  const {
    accessories,
    location,
    brand,
    description,
    engineCapacity,
    fuelEfficiency,
    features,
    imageUrl,
    mileageInMiles,
    model,
    rentalTerms,
    rentalPrice,
    carType,
    manufacturingYear,
  } = carDetails;

  const [city, country] = location.split(',').slice(1, 3);
  const mileageInKm = Math.round(
    Number(mileageInMiles) * 1.60934
  ).toLocaleString();
  const imageId = imageUrl.split('/').pop().replace('-ai.jpg', '');

  return (
    <main className={s.main}>
      <div className={s.detailsContainer}>
        <div className={s.imageForm}>
          <div className={s.carImage}>
            <img src={imageUrl} alt={`${brand} ${model}`} />
          </div>
          <div>
            <Form />
          </div>
        </div>
        <div className={s.carInfo}>
          <div className={s.carMainInfo}>
            <div className={s.idBrandModel}>
              <h2>
                {brand === 'Land Rover' ? 'Land' : brand} {`${model}`}{' '}
                {`, ${manufacturingYear}`}
              </h2>
              <p>{`ID: ${imageId}`}</p>
            </div>
            <div className={s.locationMileage}>
              <p>
                <svg className={s.icon}>
                  <use href={`${sprite}#icon-Location`} />
                </svg>
                {`${city}, ${country}`}
              </p>
              <p>{`Mileage: ${mileageInKm} km`}</p>
            </div>
            <p className={s.carPrice}>{`$${rentalPrice}`}</p>
            <p className={s.carDescription}>{description}</p>
          </div>
          <div className={s.rentalConditions}>
            <h3>Rental Conditions:</h3>
            <ul>
              {rentalTerms.map(term => (
                <li key={term}>
                  <svg className={s.icon}>
                    <use href={`${sprite}#icon-check-circle`} />
                  </svg>
                  {term}
                </li>
              ))}
            </ul>
          </div>
          <div className={s.carSpecifications}>
            <h3>Car Specifications:</h3>
            <ul>
              <li>
                <svg className={s.icon}>
                  <use href={`${sprite}#icon-calendar`} />
                </svg>
                {`Year: ${manufacturingYear}`}
              </li>
              <li>
                <svg className={s.icon}>
                  <use href={`${sprite}#icon-car`} />
                </svg>
                {`Type: ${carType}`}
              </li>
              <li>
                <svg className={s.icon}>
                  <use href={`${sprite}#icon-fuel-pump`} />
                </svg>
                {`Fuel Efficiency: ${fuelEfficiency}`}
              </li>
              <li>
                <svg className={s.icon}>
                  <use href={`${sprite}#icon-gear`} />
                </svg>
                {`Engine Capacity: ${engineCapacity}`}
              </li>
            </ul>
          </div>
          <div className={s.carFeatures}>
            <h3>Accessories and Features:</h3>
            <ul>
              {accessories.map(feature => (
                <li key={feature}>
                  <svg className={s.icon}>
                    <use href={`${sprite}#icon-check-circle`} />
                  </svg>
                  {feature}
                </li>
              ))}
              {features.map(feature => (
                <li key={feature}>
                  <svg className={s.icon}>
                    <use href={`${sprite}#icon-check-circle`} />
                  </svg>
                  {feature}
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
