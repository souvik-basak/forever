import React from "react";

const NewsLetterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
  }
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off!
      </p>
      <p className="text-gray-600 text-sm mt-3">
        Be the first to know about new arrivals, sales & promos!
      </p>
      <form onSubmit={handleSubmit} action="" className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none"
          required
        />
        <button className="bg-black text-sm text-white px-10 py-4" type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
