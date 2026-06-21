import MainLayout from "../../layouts/MainLayout";
import Login from "../auth/Login";
import Register from "../auth/Register";


const Home = () => {
  return ( 
    <MainLayout>
        <h1 className="text-center">Home Page</h1>
        <h1 className="text-center">Login Page</h1>
        <h1 className="text-center">Register Page</h1>

    </MainLayout>

  )
};

export default Home;