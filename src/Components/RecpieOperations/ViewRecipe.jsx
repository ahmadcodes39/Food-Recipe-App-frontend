import React, { useEffect, useState, useContext } from "react";
import { getSpecificRecipe, deleteRecipe } from "../ApiRoutes/apiRoutes";
import { Link, useParams, useNavigate } from "react-router-dom";
import { userContext } from "../UseContext/userContext";
import { format } from "date-fns";

const ViewRecipe = () => {
  
  const navigate = useNavigate(); 
  const { userInfo } = useContext(userContext);
  const { id } = useParams();
  const [viewRecipeData, setViewRecipeData] = useState(null);

  const recipeData = async () => {
    await getSpecificRecipe(setViewRecipeData, id);
  };

  useEffect(() => {
    recipeData();
  }, [id]);

  if (!viewRecipeData) {
    return <p>Loading...</p>;
  }

  const { data } = viewRecipeData;
  const ingredientsItems = data.ingredients.toString();
  const updatedItems = ingredientsItems.split(",");

  const deleteMyRecipe = async () => {
    await deleteRecipe(data._id, navigate);
  };


  
  
  const captalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="d-lg-flex p-5 mt-5 justify-content-between ">
      <div className="col-12  col-lg-4">
        <img
          src={"http://localhost:3000/" + data.coverImg}
          alt="Recipe Image"
          className="img-fluid stylingSpecificImg w-100 vh-75"
        />
        {userInfo.id === data.author._id && (
          <div className="d-flex flex-column flex-sm-row  justify-content-around align-items-center mt-3">
            <Link className="btn btn-success mb-2 mb-sm-0" to={`/editRecipe/${data._id}`}>Edit Recipe</Link>
            <button className="btn btn-danger" onClick={deleteMyRecipe}>Delete Recipe</button>
          </div>
        )}
      </div>
      <div className="col-12 col-lg-8 mt-5">
        <h1 className="text-center">{data.category}</h1>
        <div className="basicInfo mt-3 d-flex justify-content-center flex-sm-row flex-column align-items-center gap-sm-3">
          <p>
            <mark className="text-dark">
              By @ {captalize(data.author.name)} &nbsp;
            </mark>
          </p>
          <p className="text-secondary" style={{ fontSize: "12px" }}>
            {format(new Date(data.createdAt), "MMM d, yyyy HH:mm")}
          </p>
        </div>
        <div className="description text-start ms-lg-5 text-break">
          <h5 className="text-center text-secondary">{data.name}</h5>
          <h4>Description:</h4>
          <p>{data.description}</p>
          <h4 className="mt-4">Ingredients:</h4>
          <ol>
            {updatedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;
