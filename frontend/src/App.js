import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ErrorPage from "./pages/ErrorPage";
import { useSelector } from "react-redux";
import CreatePost from "./pages/CreatePost";
import EditPage from "./pages/EditPage";

function App() {

  const loggedUser = useSelector((state) => state.user.loggedUser);

  return (
    <>

      {/* Routes for various pages */}
      <Routes>
        <Route path='/' element={<Home />} />
        {!loggedUser && <Route path='/signup' element={<SignUp />} />}
        {!loggedUser && <Route path='/signin' element={<SignIn />} />}
        {loggedUser && <Route path='/createpost' element={<CreatePost />} />}
        {loggedUser && <Route path='/edit/:id' element={<EditPage />} />}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
