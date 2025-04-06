import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { selectBrands } from '../../redux/cars/selectors.js';
import { getCarsBrand } from '../../redux/cars/operations.js';
import {
  setBrandFilter,
  setRentalPriceFilter,
  setMinMileageFilter,
  setMaxMileageFilter,
} from '../../redux/filters/slice.js';
import {
  selectedBrand,
  selectedRentalPrice,
  selectedMinMileage,
  selectedMaxMileage,
} from '../../redux/filters/selectors.js';
import { Btn } from '../Btn/Btn.jsx';
import sprite from '/icons/sprite1.svg';
import s from './SearchCar.module.css';
import toast from 'react-hot-toast';

export const SearchCar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [isBrandDropdownVisible, setIsBrandDropdownVisible] = useState(false);
  const selectBrand = useSelector(selectedBrand);
  const [isPriceDropdownVisible, setIsPriceDropdownVisible] = useState(false);
  const selectedPrice = useSelector(selectedRentalPrice);
  const minMileage = useSelector(selectedMinMileage);
  const maxMileage = useSelector(selectedMaxMileage);
  const carBrands = useSelector(selectBrands);

  const priceOptions = Array.from({ length: 17 }, (_, i) => ({
    value: (i + 3) * 10,
    label: `${(i + 3) * 10}`,
  }));

  const brandOptions = carBrands.map(brand => ({ value: brand, label: brand }));

  useEffect(() => {
    dispatch(getCarsBrand());
  }, [dispatch]);

  const handleMinMileageChange = event => {
    const value = event.target.value.replace(/,/g, '');
    const parsedValue = value === '' ? '' : parseInt(value, 10);
    dispatch(setMinMileageFilter(parsedValue));

    if (isNaN(parsedValue) && value !== '') {
      toast.error('Please enter a valid number for Minimum Mileage.');
      dispatch(setMinMileageFilter(''));
      event.target.value = '';
    }
  };

  const handleMaxMileageChange = event => {
    const value = event.target.value.replace(/,/g, '');
    const parsedValue = value === '' ? '' : parseInt(value, 10);
    dispatch(setMaxMileageFilter(parsedValue));

    if (isNaN(parsedValue) && value !== '') {
      toast.error('Please enter a valid number for Maximum Mileage.');
      dispatch(setMaxMileageFilter(''));
      event.target.value = '';
    }
  };

  const handleSubmitFilter = event => {
    event.preventDefault();
    const filterData = {
      brand: selectBrand.value,
      price: selectedPrice.value,
      minMileage:
        minMileage === ''
          ? ''
          : Math.round(Number(minMileage) / 1.60934).toString(),
      maxMileage:
        maxMileage === ''
          ? ''
          : Math.round(Number(maxMileage) / 1.60934).toString(),
    };
    onSearch(filterData);
    dispatch(setBrandFilter(''));
    dispatch(setRentalPriceFilter(''));
    dispatch(setMinMileageFilter(''));
    dispatch(setMaxMileageFilter(''));
  };

  const toggleBrandDropdown = () =>
    setIsBrandDropdownVisible(prevState => !prevState);
  const togglePriceDropdown = () =>
    setIsPriceDropdownVisible(prevState => !prevState);

  const formatNumber = number =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <form className={s.form} onSubmit={handleSubmitFilter}>
      <div className={s.filterSection}>
        <label htmlFor="brandSelect">Select Car Brand</label>
        <div className={s.selectWrapper} onClick={toggleBrandDropdown}>
          <Select
            id="brandSelect"
            placeholder="Choose a brand"
            value={selectBrand}
            isClearable
            onChange={selectedOption =>
              dispatch(setBrandFilter(selectedOption))
            }
            options={brandOptions}
            styles={{
              control: provided => ({
                ...provided,
                width: '100%',
                height: '44px',
                borderColor: 'rgba(18, 20, 23, 0.2)',
                borderRadius: '12px',
                backgroundColor: 'var(--input-background)',
                padding: '12px 16px',
                fontSize: '16px',
              }),
              option: (styles, { isFocused }) => ({
                ...styles,
                padding: '12px 16px',
                backgroundColor: isFocused ? 'var(--hover-bg)' : 'transparent',
                color: isFocused
                  ? 'var(--text-color)'
                  : 'var(--secondary-text-color)',
              }),
            }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null,
              ClearIndicator: () => null,
            }}
            menuIsOpen={isBrandDropdownVisible}
          />
          <svg className={s.chevronIcon}>
            <use
              href={
                isBrandDropdownVisible
                  ? sprite + '#icon-chevron-up'
                  : sprite + '#icon-chevron-down'
              }
            />
          </svg>
        </div>
      </div>

      <div className={s.filterSection}>
        <label htmlFor="priceSelect">Price Per Hour</label>
        <div className={s.selectWrapper} onClick={togglePriceDropdown}>
          <Select
            id="priceSelect"
            placeholder="Choose a price"
            value={selectedPrice}
            isClearable
            onChange={selectedOption =>
              dispatch(setRentalPriceFilter(selectedOption))
            }
            options={priceOptions}
            styles={{
              control: provided => ({
                ...provided,
                width: '100%',
                height: '44px',
                borderColor: 'rgba(18, 20, 23, 0.2)',
                borderRadius: '12px',
                backgroundColor: 'var(--input-background)',
                padding: '12px 16px',
                fontSize: '16px',
              }),
            }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null,
              ClearIndicator: () => null,
            }}
            menuIsOpen={isPriceDropdownVisible}
          />
          <svg className={s.chevronIcon}>
            <use
              href={
                isPriceDropdownVisible
                  ? sprite + '#icon-chevron-up'
                  : sprite + '#icon-chevron-down'
              }
            />
          </svg>
        </div>
      </div>

      <div className={`${s.filterSection} ${s.mileageInputs}`}>
        <label>Car Mileage (in km)</label>
        <div>
          <input
            className={s.mileageInput}
            type="text"
            value={formatNumber(minMileage)}
            onChange={handleMinMileageChange}
          />
          <input
            className={s.mileageInput}
            type="text"
            value={formatNumber(maxMileage)}
            onChange={handleMaxMileageChange}
          />
          <p className={s.fromLabel}>From</p>
          <p className={s.toLabel}>To</p>
        </div>
      </div>

      <Btn type="submit" title="Apply Filter">
        Apply Filter
      </Btn>
    </form>
  );
};
