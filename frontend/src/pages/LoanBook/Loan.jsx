import React, { useState } from "react";
import { useSelector } from "react-redux";

function LoanBook() {
  const user = useSelector((state) => state.auth);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [customPeriod, setCustomPeriod] = useState("");
  const [bookCode, setBookCode] = useState("");
  const [error, setError] = useState("");

  const calculateReturnDate = (startDate, numberOfWeeks) => {
    const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
    const returnDate = new Date(
      startDate.getTime() + numberOfWeeks * millisecondsInAWeek
    );
    return returnDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPeriod) {
      setError("Choose a period, please.");
      return;
    }
    const loanDate = new Date();
    const numberOfWeeks = parseInt(selectedPeriod);
    const returnDate = calculateReturnDate(loanDate, numberOfWeeks);
    const loan = {
      returnDate: returnDate,
      loanDate: loanDate,
      clientId: user._id,
      bookId: bookCode,
    };

    try {
      const res = await fetch("http://localhost:3004/api/v1/loan/addLoan", {
        method: "POST",
        body: JSON.stringify(loan),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) {
        const dataRes = await res.json();
        setError(dataRes.error);
      } else {
        // Handle successful loan
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handlePeriodChange = (event) => {
    const { value } = event.target;
    setSelectedPeriod(value);
    if (value === "other") {
      setCustomPeriod("");
    }
  };

  return (
    <div>
      <div className="grid sm:grid-cols-1 items-center gap-16 my-6 mx-auto max-w-4xl bg-white text-[#333] font-[sans-serif]">
        <div>
          <h1 className="text-3xl font-extrabold">Let's Enjoy</h1>
          <p className="text-sm text-gray-400 mt-3">
            Embark on a literary journey with us. Borrow a book, lend your mind
            to the realms of imagination.
          </p>
        </div>
        <form className="ml-auo space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Book Code"
            value={bookCode}
            onChange={(e) => setBookCode(e.target.value)}
            className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-[#007bff]"
          />
          <input
            type="text"
            placeholder="Delivery Address"
            className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-[#007bff]"
          />
          <label
            htmlFor="borrowing-period"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Select Borrowing Period
          </label>
          <select
            id="borrowing-period"
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="bg-[#007bff] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select period</option>
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
            <option value="3 weeks">3 weeks</option>
            <option value="1 month">1 month</option>
            <option value="other">Other</option>
          </select>
          {selectedPeriod === "other" && (
            <input
              type="text"
              value={customPeriod}
              onChange={(e) => setCustomPeriod(e.target.value)}
              placeholder="Number of weeks you want"
              className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-[#007bff]"
            />
          )}
          <button
            type="submit"
            className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-3 w-full"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoanBook;
