import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { categoryOption } from "./CategoriesData/selectCategories";
import { updateRecipe, getSpecificRecipe } from "../ApiRoutes/apiRoutes";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState([""]);
  const [recipeInfo, setRecipeInfo] = useState("");

  const getRecipeData = async () => {
    await getSpecificRecipe(setRecipeInfo, id);
  };

  console.log(recipeInfo);
  const { data } = recipeInfo;
  useEffect(() => {
    getRecipeData();
  }, [id]);

  useEffect(() => {
    if (recipeInfo) {
      setIngredients([...data.ingredients, ""]);
    }
  }, [data]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files);
    }
  };

  const handle_ItemData_Change = (e) => {
    const { name, value } = e.target;
    setRecipeInfo((prev) => ({
      data: {
        ...prev.data,
        [name]: value,
      },
    }));
  };

  const addIngredientsInput = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientsInput = (index, event) => {
    const newIngredient = [...ingredients];
    newIngredient[index] = event.target.value;
    setIngredients(newIngredient);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("description", data.description);
    formData.set("category", data.category);
    formData.set("ingredients", ingredients);
    if (file) {
      formData.set("file", file[0]);
    }
    await updateRecipe(formData, id, navigate);
  };
  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(ingredients);

  return (
    <div>
      <h1 className="text-center mt-2 mb-4">Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-5">
            Recipe Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            required
            name="name"
            className="form-control border border-secondary"
            id="name"
            value={data.name}
            onChange={handle_ItemData_Change}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label fs-5">
            Description <span className="text-danger">*</span>
          </label>
          <textarea
            name="description"
            rows={4}
            required
            className="form-control border border-secondary"
            placeholder="Enter complete Recipe Procedure..."
            value={data.description}
            onChange={handle_ItemData_Change}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label fs-5">
            Ingredients<span className="text-danger">*</span>{" "}
            <mark className="fs-6">
              {" "}
              (please manage each ingredient in separate field)
            </mark>
          </label>
          {ingredients.map((item, index) => (
            <input
              key={index}
              type="text"
              required
              className="form-control border border-secondary"
              placeholder="E.g: ice cream"
              value={item}
              onChange={(event) => handleIngredientsInput(index, event)}
            />
          ))}
          <button
            className="btn btn-outline-primary border border-2 border-primary mt-4"
            onClick={addIngredientsInput}
          >
            <FaPlus /> Add Ingredient
          </button>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label fs-5">
            Recipe Category <span className="text-danger">*</span>
          </label>
          <select
            className="form-select border border-1 border-secondary"
            required
            name="category"
            value={data.category}
            onChange={handle_ItemData_Change}
            aria-label="Default select example"
          >
            <option value="">Choose category</option>
            {categoryOption.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label fs-5">
            Choose an Image <span className="text-danger">*</span>
          </label>
          <input
            type="file"
            required
            onChange={handleFileChange}
            className="form-control border border-secondary"
            id="file"
          />
        </div>
        <div className="mb-3 mt-5">
          <button type="submit" className="btn btn-primary w-100 fs-5">
            Update Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipes;
