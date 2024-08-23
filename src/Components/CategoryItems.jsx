import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { QueryContext } from "./UseContext/searchQuery";
import { TbMoodConfuzed } from "react-icons/tb";
const CategoryItems = ({ CategoryItems }) => {
  const { query, isQuery } = useContext(QueryContext);
  const categories = [...new Set(CategoryItems.map((item) => item.category))];

  const searchItems = CategoryItems.filter(
    (food) =>
      food.name.toLowerCase().includes(query.toLowerCase()) ||
      food.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-center mt-4 mb-4">
        Select Category that seems you best
      </h2>
      {searchItems.length>0 ?
      categories.map((category, index) => (
        <>
          <div className="items" key={index}>
            <div>
              {isQuery && (
                <>
                  <h4 className="categoryName">{category}</h4>
                  <hr className="text-success" />
                </>
              )}
            </div>
            <div className="row justify-content-center justify-lg-content-left  gap-2">
              {searchItems
                .filter((item) => item.category === category)
                .slice(0,4)
                .map((items, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="card col-12 col-sm-6 col-md-3 mb-2 border-0 p-0 rounded"
                    style={{ width: "16.5rem" }}
                  >
                    <Link to={`/recipe/${items._id}`}>
                      <img
                        src={"http://localhost:3000/" + items.coverImg}
                        className="card-img-top rounded"
                        alt="..."
                        style={{ height: "50vh", objectFit: "cover" }}
                      />
                    </Link>
                    <div className="card-body">
                      <p className="card-text text-center fw-bold fs-6">
                        {items.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )):
      (
        <div className="mt-5">
          <p className="fs-2 text-secondary text-center mt-3 mb-5 ">No item found <TbMoodConfuzed className="fs-1 text-danger mb-2"/> </p>
        </div>
      )}
    </div>
  );
};

export default CategoryItems;
