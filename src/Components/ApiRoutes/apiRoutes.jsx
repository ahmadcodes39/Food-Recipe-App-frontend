import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";
import toast from "react-hot-toast";

export const registerUser = async (formData, navigate) => {
  try {
    const { name, email, password } = formData;
    const response = await axios.post("/auth/register", {
      name,
      email,
      password,
    });

    if (response.status === 200) {
      toast.success("Account created successfully");
      navigate("/");
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 400) {
        toast.error("Invalid credentials. Please enter valid credentials.");
        navigate("/signup");
      } else if (status === 401) {
        toast.error("This email already exists.");
      } else if (status == 500) {
        toast.error("An internal server error occurred.");
      } else {
        toast.error("An unexpected error error occurred.");
      }
    }
  }
};

export const loginUser = async (formData, setUserInfo, navigate) => {
  try {
    const { email, password } = formData;
    const response = await axios.post("/auth/login", { email, password });
    if (response.status == 200) {
      setUserInfo(response.data);
      toast.success("Login successfully");
      navigate("/");
    }
  } catch (error) {
    const status = error.response.status;
    if (status === 404) {
      toast.error("No user exist with this email");
    } else if (status === 400) {
      toast.error("Wrong password");
    } else if (status === 500) {
      toast.error("Internal server error");
    }
  }
};

export const forgotPassword = async (email, navigate) => {
  try {
    await toast.promise(axios.post("/auth/forgotPassword", { email }), {
      loading: "Sending reset link...",
      success: "Check your email for the reset link!",
      error: "An error occurred. Please try again.",
    });
    navigate("/login");
  } catch (error) {
    const status = error.response.status;
    if (status === 404) {
      toast.error("This E-mail is not correct");
    } else {
      toast.error("Internal server error");
    }
  }
};

export const resetPassword = async (password, id, token, navigate) => {
  try {
    const response = await axios.post(`/auth/resetPassword/${id}/${token}`, {
      password,
    });
    if (response.status == 200) {
      toast.success("Password updated successfully");
      navigate("/login");
    }
  } catch (error) {
    toast.error("Password not updated server error");
  }
};

export const verifyProfile = async (setUserInfo) => {
    const response = await axios.get("/auth/profile");
    if (response.status === 200) {
      setUserInfo(response.data);
    }
};

export const logoutUser = async (setUserInfo, navigate) => {
  try {
    const response = await axios.post("/auth/logout");
    if (response.status === 200) {
      setUserInfo(null);
      toast.success("Logout Successfully");
      navigate("/login");
    }
  } catch (error) {
    toast.error("Error while loging out");
    navigate("/");
    if (error.response.status===500) {
      toast.error('Internal server error')
    }
  }
};

export const addRecipeData = async (formData, navigate) => {
  try {
    const response = await axios.post("/api/addRecipe", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      toast.success("Recepi added successfully");
      navigate("/");
    }
  } catch (error) {
    toast.error("Recpi not added");
    navigate("/add-recipe");
  }
};

export const getRecipes = async (setRecipeData) => {
  try {
    const response = await axios.get("/api/getRecipes");
    if (response.status === 200) {
      setRecipeData(response.data);
    } 
  } catch (error) {
    toast.error('Internal server error try again by loggining ')
  }
};

export const getSpecificRecipe = async (setRecipeData, id) => {
  try {
    const response = await axios.get(`/api/getRecipes/${id}`);
    if (response.status === 200) {
      setRecipeData(response.data);
    } 
    return response;
  } catch (error) {
    toast.error('INternal server error try again later')
  }
};

export const updateRecipe = async (formData, id, navigate) => {
  try {
    const response = await axios.put(`/api/editRecipe/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      toast.success("Recipe updated successfully");
      navigate(`/recipe/${id}`);
    } 
  } catch (error) {
    toast.error("Recipe not updated server error");
    navigate(`/editRecipe/${id}`);
  }
};

export const getMyRecipes = async (setMyRecipes) => {
  try {
    const response = await axios.get(`/api/myRecipes`);
    if (response.status === 200) {
      setMyRecipes(response.data);
    } 
  } catch (error) {
    toast.error("Not get the end point my recipes server error");
  }
};

export const deleteRecipe = async (id, navigate) => {
  try {
    const response = await axios.delete(`/api/recipe/${id}`);
    if (response.status === 200) {
      toast.success("Recipe deleted successfully");
      navigate("/");
    } 
  } catch (error) {
    toast.error("Recipe not deleted ");
    navigate(`/api/recipe/${id}`);
  }
};

export const respectiveCategoryData = async(setRecipesInfo,item)=>{
  try {
    const response = await axios.get(`/api/respectiveCategory/${item}`)
    if (response.status===200) {
      setRecipesInfo(response.data)
    }
  } catch (error) {
    toast.error('Server error try again later')
    console.log(error.response?error.response.data:error.message)
  }
}