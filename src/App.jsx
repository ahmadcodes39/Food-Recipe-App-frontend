import "./App.css";
import LandingPage from "./Components/Pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import LoginPage from "./Components/Pages/LoginPage";
import SignUpPage from "./Components/Pages/SignUpPage";
import ForgotPage from "./Components/Pages/ForgotPage";
import ResetPage from "./Components/Pages/ResetPage";
import { UserContextProvider } from "./Components/UseContext/userContext";
import AddRecipe from "./Components/RecpieOperations/AddRecpie";
import ViewRecipe from "./Components/RecpieOperations/ViewRecipe";
import EditRecipe from "./Components/RecpieOperations/EditRecipes"
import MyRecipes from "./Components/RecpieOperations/MyRecipes";
import { QueryContextProvider } from "./Components/UseContext/searchQuery";
import  { Toaster } from 'react-hot-toast';
import RespectiveCategory from "./Components/RecpieOperations/RespectiveCategory";


function App() {
  return (
    <>
    <QueryContextProvider>
      <UserContextProvider>
        <Toaster position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgotPassword" element={<ForgotPage />} />
              <Route path="/resetPassword/:id/:token" element={<ResetPage />} />
              <Route path="/add-recipe" element={<AddRecipe />} />
              <Route path="/recipe/:id" element={<ViewRecipe />} />
              <Route path="/editRecipe/:id" element={<EditRecipe />} />
              <Route path="/my-recipe" element={<MyRecipes />} />
              <Route path="/category/:item" element={<RespectiveCategory />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </QueryContextProvider>
    </>
  );
}

export default App;
