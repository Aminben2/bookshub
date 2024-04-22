import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBook } from "../../store/BookSlice";

function BookDetails() {
  const { book } = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getBook(id));
  }, [id]);
  return (
    <div className="font-[sans-serif] bg-white">
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="bg-gray-100 px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
              <img
                src="https://readymadeui.com/images/laptop5.webp"
                // src={"http:localhost:3002/api/v1/uploads/" + book.cover[0]}
                alt="Product"
                className="w-4/5 rounded object-cover"
              />
              <button type="button" className="absolute top-4 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="black"
                  className="mr-1 hover:fill-red-500"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="lg:col-span-2 mt-6">
            <h2 className="text-2xl font-extrabold text-[#333]">
              {book.title} | {book.author}
            </h2>
            <div className="flex flex-wrap gap-4 mt-6">
              <p className="text-blue-400 text-4xl font-bold">
                {book.loaned ? "Not available" : "Available"}
              </p>
              <p className="text-gray-500 text-xl">
                <span className="text-sm ml-1">In our Library</span>
              </p>
            </div>
            <div className="flex space-x-2 mt-4">
              <svg
                className="w-5 fill-[#333]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-[#333]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-[#333]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-[#333]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-[#CED5D8]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <h4 className="text-[#333] text-base">500 Reviews</h4>
            </div>
            <div className="mt-10">
              <h3 className="text-md font-bold text-gray-800">
                {book.description}
              </h3>
            </div>
            <div className="flex flex-wrap gap-4 mt-10">
              <button
                type="button"
                className="min-w-[200px] px-4 py-3 bg-[#333] hover:bg-[#111] text-white text-sm font-bold rounded"
              >
                Buy now
              </button>
              <button
                type="button"
                className="min-w-[200px] px-4 py-2.5 border border-[#333] bg-transparent hover:bg-gray-50 text-[#333] text-sm font-bold rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 className="text-lg font-bold text-[#333]">Book information</h3>
          <ul className="mt-6 space-y-6 text-[#333]">
            <li className="text-sm">
              CODE <span className="ml-4 float-right">{book.code}</span>
            </li>
            <li className="text-sm">
              TITLE <span className="ml-4 float-right">{book.title}</span>
            </li>
            <li className="text-sm">
              DESCRIPTION
              <span className="ml-4 float-right">{book.description}</span>
            </li>
            <li className="text-sm">
              AUTHOR
              <span className="ml-4 float-right">{book.author}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
