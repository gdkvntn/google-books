import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api_key = process.env.REACT_APP_API_KEY;
const URL = "https://www.googleapis.com/books/v1/volumes";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async function (_, { rejectWithValue, getState }) {
    const { books } = getState();
    const obj = books.searchBooks;
    try {
      const response = await fetch(
        `${URL}?q=${obj.text}+subject:${obj.category}&orderBy=${obj.sort}&maxResults=30&key=${api_key}`
      );
      if (!response.ok) {
        throw new Error("Error!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const paginateBooks = createAsyncThunk(
  "books/paginateBooks",
  async function (_, { rejectWithValue, getState }) {
    const { books } = getState();
    const obj = books.searchBooks;

    try {
      const response = await fetch(
        `${URL}?q=${obj.text}+subject:${obj.category}&orderBy=${obj.sort}&maxResults=30&startIndex=${books.startIndex}&key=${api_key}`
      );
      if (!response.ok) {
        throw new Error("Error!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const getTom = createAsyncThunk(
//   "books/getTom",
//   async function (id, { rejectWithValue, getState }) {
//     const { books } = getState();
//     console.log(books);
//     try {
//       const response = await fetch(`${URL}/${books.idTom}?key=${api_key}`);
//       if (!response.ok) {
//         throw new Error("Error!");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

const initialState = {
  books: [],
  searchBooks: {},
  startIndex: 0,
  idTom: "",
  status: null,
  error: null,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    infoSearch: (state, action) => {
      state.searchBooks = action.payload;
    },
    setIdTom: (state, action) => {
      state.idTom = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.startIndex = 30;
      state.books = action.payload;
    },
    [fetchBooks.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [paginateBooks.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [paginateBooks.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.startIndex += 30;
      state.books.items = [...state.books.items, ...action.payload.items];
    },
    [paginateBooks.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    // [getTom.rejected]: (state, action) => {
    //   state.status = "rejected";
    //   state.error = action.payload;
    // },
  },
});

export const { infoSearch, setIdTom, setStatus } = booksSlice.actions;

export default booksSlice.reducer;
