import React from "react";
import { CategoryImages } from "./RecpieOperations/CategoriesData/CategoryImages";
import { Link } from "react-router-dom";

const FoodCategories = ({ foodCategories }) => {
  const uniqueCategories = [
    ...new Set(foodCategories.map((item) => item.category)),
  ];

  return (
    <div className="mt-5 mb-5">
      <h1 className="text-center">Huge Selection of Delicious Recipe Ideas</h1>
      <div className="foodItems row row-cols-6 mt-5">
        {uniqueCategories.map((category, index) => (
          <div key={index} className="col-4 col-sm-3 col-md-2">
            {foodCategories
              .filter((item) => item.category === category)
              .map(
                (item, itemIndex) =>
                  itemIndex === 0 && (
                    <div key={item._id}>
                      <Link to={`/category/${item.category}`}>
                        <img
                          src={CategoryImages[item.category]}
                          alt={item.category}
                          className="rounded-circle img-fluid category "
                          style={{ height: "10vh", objectFit: "cover" }}
                        />
                      </Link>
                      <p className="mt-2 text-secondary">{item.category}</p>
                    </div>
                  )
              )}
          </div>
        ))}
      </div>
      <hr className="border border-success border-1 opacity-50" />
    </div>
  );
};

export default FoodCategories;
