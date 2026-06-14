import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import AllNews from "./pages/AllNews";
import Category from "./pages/Category";
import SingleNews from "./pages/SingleNews";
import AddNews from "./pages/AddNews";
import NewsList from "./pages/NewsList";
import EditNews from "./pages/EditNews";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter> 
    <Routes>
       <Route path="/" element={<Home/>}/> 
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/> 
      <Route path="/all-news" element={<AllNews/>}/>
      <Route path="/category/:type" element={<Category/>}/>
      <Route path="/singlenews/:id" element={<SingleNews/>}/>
      <Route path="/addnews" element={<AddNews/>}/>
      <Route path="/admin/news-list" element={<NewsList/>}/>
      <Route path="/editnews/:id"element={<EditNews/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
      <ToastContainer position='top-right' autoClose={1500}/>
    </BrowserRouter>
  );
}
export default App;
