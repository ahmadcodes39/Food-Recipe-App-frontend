import React, { useContext, useEffect, useState } from "react";
import { getMyRecipes } from "../ApiRoutes/apiRoutes";
import { Link } from "react-router-dom";
import { QueryContext } from "../UseContext/searchQuery";

const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const { query, isQuery } = useContext(QueryContext);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        await getMyRecipes(setMyRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);
  if (!myRecipes) {
    <div>Loading...</div>;
  }
  const categories = [...new Set(myRecipes.map((item) => item.category))];

  const queryItems = myRecipes.filter(
    (food) =>
      food.name.toLowerCase().includes(query.toLowerCase()) ||
      food.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mt-5 row justify-content-lg-left justify-content-center justify-content-md-center gap-2">
      {queryItems.length > 0 ? (
        categories.map((category, index) => (
          <>
            <div className="items" key={index}>
              <div>
                {isQuery && (
                  <>
                    <h4 className="categoryName mt-4">{category}</h4>
                    <hr className="text-success" />
                  </>
                )}
              </div>
              <div className="row justify-content-center justify-lg-content-left  gap-2">
                {queryItems
                  .filter((item) => item.category === category)
                  .map((items, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="card col-12 col-sm-6 col-md-3 mb-2 border-0 p-0 rounded"
                      style={{ width: "17rem" }}
                    >
                      <Link to={`/recipe/${items._id}`}>
                        <img
                          src={"http://localhost:3000/" + items.coverImg}
                          className="card-img-top rounded rounded-3"
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
        ))
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <p className="text-secondary fs-1">
            <i>No such Items Found</i>{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
