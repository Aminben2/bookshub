import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://localhost:3002/api/v1/book";

export const getBooks = createAsyncThunk("books/getBooks", async () => {
  const user = JSON.parse(localStorage.getItem("login"));
  try {
    const res = await fetch(url + "/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (!res.ok) throw new Error("Could not fetch data from book service");
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
});

export const getBook = createAsyncThunk("books/getBook", async (id) => {
  const user = JSON.parse(localStorage.getItem("login"));
  try {
    const res = await fetch(url + `/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (!res.ok) throw new Error("Could not fetch the book from book service");
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
});
const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    book: {},
    isLoading: false,
  },
  reducers: {
    addBook: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    });
    builder.addCase(getBook.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBook.rejected, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.book = action.payload;
    });
  },
});

export const { addBook } = bookSlice.actions;
export default bookSlice;
