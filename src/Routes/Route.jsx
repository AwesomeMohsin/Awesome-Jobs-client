import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import ErrorPage from "../Layouts/ErrorPage";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/AccountServices/SignIn";
import SignUp from "../Pages/AccountServices/SignUp";
import Test from "../Pages/AccountServices/Test";
import Jobs from "../Pages/Services/GlobalServices/Jobs";
import AddJob from "../Pages/Services/UserServices/AddJob";
import MyJobs from "../Pages/Services/UserServices/MyJobs";
import AppliedJobs from "../Pages/Services/UserServices/AppliedJobs";
import Blogs from "../Pages/Services/GlobalServices/Blogs";
import PrivateRoute from "./PrivateRoute";
import JobCardDetails from "../Pages/Services/GlobalServices/JobCardDetails";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signin',
                element: <SignIn></SignIn>
            },
            {
                path: '/signup',
                element:<SignUp></SignUp>
            },
            {
                path: '/jobs',
                element: <Jobs></Jobs>
            },
            {
                path: '/jobs/:id',
                element: <PrivateRoute><JobCardDetails></JobCardDetails></PrivateRoute>,
                loader: ({params}) => fetch(`https://63-awesome-jobs-server.vercel.app/jobs/${params.id}`)
            },
            {
                path: '/addjob',
                element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
            },
            {
                path: '/myjobs',
                element: <PrivateRoute><MyJobs></MyJobs></PrivateRoute>
            },
            {
                path: '/appliedjobs',
                element: <PrivateRoute><AppliedJobs></AppliedJobs></PrivateRoute>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/test',
                element: <Test></Test>
            }
            
            
        ]
    },
]);


export default router;