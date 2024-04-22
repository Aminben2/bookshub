import React, { useEffect } from "react";
import Book from "./Book";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../store/BookSlice";

function BookList() {
  const { books } = useSelector((state) => state.book);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, []);
  return (
    <div className="bg-white font-[sans-serif] my-10 px-7">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
            LATEST BOOKS
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto">
          {books.map((book) => (
            <Book key={book._id} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookList;
