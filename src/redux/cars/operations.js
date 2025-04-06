// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'https://car-rental-api.goit.global/';
// axios.defaults.params = {
//   limit: 12,
//   orientation: 'landscape',
// };

// export const fetchCars = createAsyncThunk(
//   'cars/fetchCars',
//   async (searchParams, thunkAPI) => {
//     try {
//       const { data } = await axios.get('/cars', {
//         params: {
//           ...searchParams,
//         },
//       });
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchMoreCars = createAsyncThunk(
//   'cars/fetchMoreCars',
//   async (searchParams, thunkAPI) => {
//     try {
//       const { cars } = thunkAPI.getState();
//       const nextPage = cars.page + 1;
//       const { data } = await axios.get('/cars', {
//         params: {
//           ...searchParams,
//           page: nextPage,
//         },
//       });
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchCarById = async carId => {
//   try {
//     const { data } = await axios.get(`/cars/${carId}`);
//     return data;
//   } catch (error) {
//     return error.message;
//   }
// };

// export const fetchCarBrands = createAsyncThunk(
//   'cars/fetchCarBrands',
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await axios.get('/brands');
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';

axios.defaults.params = {
  limit: 12,
  orientation: 'landscape',
};

export const getCars = createAsyncThunk(
  'cars/getCars',
  async (query, thunkAPI) => {
    try {
      const { data } = await axios.get('/cars', {
        params: {
          ...query,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCarsMore = createAsyncThunk(
  'cars/getCarsMore',
  async (query, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { page } = state.cars;
      const { data } = await axios.get('/cars', {
        params: {
          ...query,
          page: page + 1,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCarById = async id => {
  try {
    const { data } = await axios.get(`/cars/${id}`);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getCarsBrand = createAsyncThunk(
  'cars/getBrands',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/brands');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
