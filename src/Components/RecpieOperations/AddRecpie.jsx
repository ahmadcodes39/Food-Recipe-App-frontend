import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { categoryOption } from "./CategoriesData/selectCategories";
import { addRecipeData } from "../ApiRoutes/apiRoutes";
import { Link, useNavigate } from "react-router-dom";

const AddRecpie = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState([""]);
  const [itemData, setItemData] = useState({
    recipe_name: "",
    description: "",
    category: "",
  });

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files);
    }
  };

  const handle_ItemData_Change = (e) => {
    const { name, value } = e.target;
    setItemData((preV) => {
      return {
        ...preV,
        [name]: value,
      };
    });
  };
  const adddIngredientsInput = (e) => {
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
    formData.set("name", itemData.recipe_name);
    formData.set("description", itemData.description);
    formData.set("ingredients", ingredients);
    formData.set("category", itemData.category);
    if (file) {
      formData.set("file", file[0]);
    }
    await addRecipeData(formData,navigate);
  };

  return (
    <div>
      <h1 className="text-center mt-2 mb-4">Add Your New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fs-5">
            Recpie Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            required
            name="recipe_name"
            className="form-control border border-secondary"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={itemData.recipe_name}
            onChange={handle_ItemData_Change}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fs-5">
            Description <span className="text-danger">*</span>
          </label>
          <br />
          <textarea
            name="description"
            rows={4}
            required
            className="form-control border border-secondary"
            placeholder="Enter complete Recipe Procedure..."
            value={itemData.description}
            onChange={handle_ItemData_Change}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fs-5">
            Ingredients <span className="text-danger">*</span>
          </label>
          {ingredients.map((item, index) => (
            <input
              key={index}
              type="text"
              required
              className="form-control border border-secondary"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="E.g: ice Cream"
              value={item}
              onChange={(event) => handleIngredientsInput(index, event)}
            />
          ))}
          <button
            className="btn btn-outline-primary border border-2 border-primary mt-4"
            onClick={adddIngredientsInput}
          >
            <FaPlus /> Add ingredients
          </button>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fs-5">
            Recipe Category <span className="text-danger">*</span>
          </label>
          <select
            className="form-select border border-1 border-secondary"
            required
            name="category"
            value={itemData.category}
            onChange={handle_ItemData_Change}
            aria-label="Default select example"
          >
            <option value="">choose category</option>
            {categoryOption.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fs-5">
            Choose an Image <span className="text-danger">*</span>
          </label>
          <input
            type="file"
            required
            onChange={handleFileChange}
            className="form-control border border-secondary"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3 mt-5">
          <button type="submit" className="btn btn-primary w-100 fs-5">
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecpie;
