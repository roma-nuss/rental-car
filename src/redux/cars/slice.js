// import { createSlice } from '@reduxjs/toolkit';
// import { fetchCars, fetchCarBrands, fetchMoreCars } from './operations.js';

// const initialState = {
//   carCatalog: [],
//   carBrands: [],
//   favoriteCarList: [],
//   currentPage: 1,
//   itemsPerPage: 12,
//   totalCars: null,
//   totalPageCount: null,
//   errors: null,
//   loadingState: false,
// };

// const handlePending = state => {
//   state.loadingState = true;
//   state.errors = null;
// };

// const carSlice = createSlice({
//   name: 'cars',
//   initialState,
//   reducers: {
//     addCarToFavorites: (state, action) => {
//       const carExists = state.carCatalog.find(
//         car => car.id === action.payload.id
//       );
//       if (carExists) state.favoriteCarList.push(action.payload);
//     },
//     removeCarFromFavorites: (state, action) => {
//       state.favoriteCarList = state.favoriteCarList.filter(
//         car => car.id !== action.payload
//       );
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchCars.pending, handlePending)
//       .addCase(fetchCars.fulfilled, (state, action) => {
//         state.loadingState = false;
//         state.carCatalog = action.payload.cars;
//         state.currentPage = 1;
//         state.totalCars = action.payload.totalCars;
//         state.totalPageCount = action.payload.totalPages;
//       })
//       .addCase(fetchCars.rejected, (state, action) => {
//         state.errors = action.error.message;
//         state.loadingState = false;
//       })
//       .addCase(fetchMoreCars.pending, handlePending)
//       .addCase(fetchMoreCars.fulfilled, (state, action) => {
//         state.loadingState = false;
//         state.carCatalog = [...state.carCatalog, ...action.payload.cars];
//         state.currentPage += 1;
//         state.totalCars = action.payload.totalCars;
//         state.totalPageCount = action.payload.totalPages;
//       })
//       .addCase(fetchMoreCars.rejected, (state, action) => {
//         state.errors = action.error.message;
//         state.loadingState = false;
//       })
//       .addCase(fetchCarBrands.pending, handlePending)
//       .addCase(fetchCarBrands.fulfilled, (state, action) => {
//         state.carBrands = action.payload;
//       })
//       .addCase(fetchCarBrands.rejected, (state, action) => {
//         state.errors = action.error.message;
//         state.loadingState = false;
//       });
//   },
// });

// export const { addCarToFavorites, removeCarFromFavorites } = carSlice.actions;

// export const carsReducer = carSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { getCars, getCarsBrand, getCarsMore } from './operations.js';

const initialState = {
  catalog: [],
  brands: [],
  favoriteCars: [],
  page: 1,
  limit: 12,
  totalCars: null,
  totalPages: null,
  errors: null,
  loading: false,
};

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const slice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addFavoriteCar: (state, action) => {
      const carFind = state.catalog.find(car => car.id === action.payload.id);
      if (carFind) state.favoriteCars.push(action.payload);
    },
    removeFavoriteCar: (state, action) => {
      state.favoriteCars = state.favoriteCars.filter(
        car => car.id !== action.payload
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCars.pending, handlePending)
      .addCase(getCars.fulfilled, (state, action) => {
        state.loading = false;
        state.catalog = action.payload.cars;
        state.page = 1;
        state.totalCars = action.payload.totalCars;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.errors = action.error.message;
        state.loading = false;
      })
      .addCase(getCarsMore.pending, handlePending)
      .addCase(getCarsMore.fulfilled, (state, action) => {
        state.loading = false;
        state.catalog = [...state.catalog, ...action.payload.cars];
        state.page += 1;
        state.totalCars = action.payload.totalCars;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getCarsMore.rejected, (state, action) => {
        state.errors = action.error.message;
        state.loading = false;
      })
      .addCase(getCarsBrand.pending, handlePending)
      .addCase(getCarsBrand.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(getCarsBrand.rejected, (state, action) => {
        state.errors = action.error.message;
        state.loading = false;
      });
  },
});

export const { addFavoriteCar, removeFavoriteCar } = slice.actions;

export const carsReducer = slice.reducer;
