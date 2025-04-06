// import { Btn } from '../../components/Btn/Btn.jsx';
// import { useEffect, useState } from 'react';
// import { fetchCars, fetchMoreCars } from '../../redux/cars/operations.js';
// import {
//   selectCarCatalog,
//   selectCurrentPage,
//   selectTotalPageCount,
// } from '../../redux/cars/selectors.js';
// import { SearchCar } from '../../components/SearchCar/SearchCar.jsx';
// import { CarList } from '../../components/CarList/CarList.jsx';
// import s from './CatalogPage.module.css';
// import { useDispatch, useSelector } from 'react-redux';

// const CatalogPage = () => {
//   const dispatch = useDispatch();
//   const carList = useSelector(selectCarCatalog);
//   const currentPage = useSelector(selectCurrentPage);
//   const totalPagesCount = useSelector(selectTotalPageCount);
//   const [searchParams, setSearchParams] = useState({});
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const canLoadMore = currentPage < totalPagesCount;

//   useEffect(() => {
//     dispatch(fetchCars(searchParams));
//   }, [dispatch, searchParams]);

//   const handleLoadMoreCars = () => {
//     if (isLoadingMore) return;
//     setIsLoadingMore(true);
//     dispatch(fetchMoreCars(searchParams)).finally(() => {
//       setIsLoadingMore(false);
//     });
//   };

//   const handleSearchFilter = params => {
//     setSearchParams(params);
//   };

//   return (
//     <main className={s.main}>
//       <SearchCar onSearch={handleSearchFilter} />
//       <CarList catalog={carList} />
//       {canLoadMore && (
//         <Btn type="button" onClick={handleLoadMoreCars} title="Load more">
//           Load more
//         </Btn>
//       )}
//     </main>
//   );
// };

// export default CatalogPage;

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
