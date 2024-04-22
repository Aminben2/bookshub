import React from "react";
import { Link } from "react-router-dom";

function Book({ _id, code, title, description, author, cover }) {
  return (
    <>
      <Link to={"/books/" + _id}>
        <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative group">
          <img
            src="https://readymadeui.com/Imagination.webp"
            // src={"http://localhost:3002/uploads/" + cover[0]}
            alt="Blog Post 1"
            className="w-full h-96 object-cover"
          />
          <div className="p-6 absolute bottom-0 left-0 right-0 bg-white opacity-90">
            <span className="text-sm block text-gray-600 mb-2 uppercase">
              BY {author}
            </span>
            <h3 className="text-xl font-bold text-[#333]">{title}</h3>
            <div className="flex flex-col gap-4 h-0 overflow-hidden group-hover:h-fit group-hover:mt-4 transition-all duration-300">
              <p className="text-gray-600 text-sm">{description}</p>
              <div>
                <button
                  type="button"
                  className="px-6 py-2 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-blue-500 bg-blue-500 hover:bg-transparent hover:text-black transition-all duration-300"
                >
                  Borrow
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Book;
