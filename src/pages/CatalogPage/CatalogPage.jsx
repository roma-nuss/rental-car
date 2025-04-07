import { Btn } from '../../components/Btn/Btn.jsx';
import { useEffect, useState } from 'react';
import { getCars, getCarsMore } from '../../redux/cars/operations.js';
import {
  selectCars,
  selectPage,
  selectTotalPages,
} from '../../redux/cars/selectors.js';
import { SearchCar } from '../../components/SearchCar/SearchCar.jsx';
import { CarList } from '../../components/CarList/CarList.jsx';
import s from './CatalogPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
const CatalogPage = () => {
  const dispatch = useDispatch();
  const catalog = useSelector(selectCars);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const [query, setQuery] = useState({});
  const [isLoadMore, setIsLoadMore] = useState(false);
  const hasMoreCars = page < totalPages;

  useEffect(() => {
    dispatch(getCars(query));
  }, [dispatch, query]);

  const handleLoadMore = () => {
    if (isLoadMore) return;
    setIsLoadMore(true);
    dispatch(getCarsMore(query)).finally(() => {
      setIsLoadMore(false);
    });
  };

  const handleFilterSearch = params => {
    setQuery(params);
  };

  return (
    <main className={s.main}>
      <SearchCar onSearch={handleFilterSearch} />
      <CarList catalog={catalog} />
      {hasMoreCars && (
        <Btn type="button" onClick={handleLoadMore} title="Load more">
          Load more
        </Btn>
      )}
    </main>
  );
};

export default CatalogPage;
