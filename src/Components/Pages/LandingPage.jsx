import React, { useState, useEffect } from "react";
import landingImg from "../../assets/landingImg.jpg";
import FoodCategories from "../FoodCategories";
import { getRecipes } from "../ApiRoutes/apiRoutes";
import CategoryItems from "../CategoryItems";
const LandingPage = () => {
  const [foodCategories, setFoodCategories] = useState([]);

  const fetchRecipes = async () => {
    await getRecipes(setFoodCategories);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (!foodCategories) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="landingContent titleStyle">
        <h1 className="text-light fs-2 text-center">
          Learn.Cook.Share.Make Cooking Easy
        </h1>
       
        <div className="maintext">
          <p className="text-light lh-2">
          Your recipe is now part of FlavorFusion! Thanks for sharing. Explore more recipes or add more of your culinary creations.
            <mark className="text-danger">Happy cooking!</mark>
          </p>
        </div>
      </div>
      <div className="img">
        <img src={landingImg} alt="" className="img-fluid w-100 landingImg" />
      </div>

      <FoodCategories foodCategories={foodCategories} />

      <CategoryItems CategoryItems={foodCategories} />
    </>
  );
};

export default LandingPage;
