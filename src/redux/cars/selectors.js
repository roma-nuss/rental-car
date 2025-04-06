export const selectCarCatalog = state => state.cars.catalog;
export const selectCarBrands = state => state.cars.brands;
export const selectFavoriteCarList = state => state.cars.favoriteCars;
export const selectTotalPageCount = state => state.cars.totalPages;
export const selectCurrentPage = state => state.cars.page;
export const selectItemsPerPage = state => state.cars.limit;
export const selectLoadingState = state => state.cars.loading;
