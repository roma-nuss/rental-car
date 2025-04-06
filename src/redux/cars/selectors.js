// export const selectCarCatalog = state => state.cars.catalog;
// export const selectCarBrands = state => state.cars.brands;
// export const selectFavoriteCarList = state => state.cars.favoriteCars;
// export const selectTotalPageCount = state => state.cars.totalPages;
// export const selectCurrentPage = state => state.cars.page;
// export const selectItemsPerPage = state => state.cars.limit;
// export const selectLoadingState = state => state.cars.loading;

export const selectCars = state => state.cars.catalog;
export const selectBrands = state => state.cars.brands;
export const selectFavoriteCars = state => state.cars.favoriteCars;
export const selectTotalPages = state => state.cars.totalPages;
export const selectPage = state => state.cars.page;
export const selectLimit = state => state.cars.limit;
export const selectLoading = state => state.cars.loading;
