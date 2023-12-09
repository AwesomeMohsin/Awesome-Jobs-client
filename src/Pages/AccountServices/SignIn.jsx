import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import client from "../../api";

const SignIn = () => {

    const { loginUser, googleLogin } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";


    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // Login user
        loginUser(email, password)
        .then((result) => {
            client
              .post("/jwt", {
                email: result.user.email,
              })
              .then(() => {
                toast.success("Signed in successfully!");
                setTimeout(() => {
                  navigate(from, { replace: true });
                }, 1500);
              });
          })
          .catch((error) => {
              console.log(error);
              if (error.message === "Firebase: Error (auth/invalid-login-credentials).") {
                toast.error('Email or password is incorrect')
            }
          });


    }

    const handleGoogleLogin = () => {
        googleLogin()
        .then((result) => {
            client
              .post("/jwt", {
                email: result.user.email,
              })
              .then(() => {
                toast.success("Signed in successfully!");
                setTimeout(() => {
                  navigate(from, { replace: true });
                }, 1500);
              });
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect(() => {
        document.title = 'Sign In | Awesome Jobs';
    }, [])


    return (
        <div className="flex justify-center md:container mx-auto lg:py-10">
            <div className="m-0 sm:m-10 lg:shadow-lg sm:rounded-lg flex flex-row-reverse justify-center flex-1 xl:py-10">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12  rounded-xl">
                    <div>

                    </div>
                    <div className="flex flex-col items-center">

                        <div className="w-full flex-1 mt-8">


                            <Card color="transparent" shadow={false} className=" mx-auto ">
                                <Typography variant="h4" color="blue-gray" className="text-5xl  text-center">
                                    Sign In
                                </Typography>

                                <form onSubmit={handleLogin} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                                    <div className="mb-1 flex flex-col gap-6">

                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Email
                                        </Typography>
                                        <Input
                                            name="email"
                                            size="lg"
                                            placeholder="name@mail.com"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                        <Typography
                                            variant="h6"
                                            color="blue-gray" className="-mb-3">
                                            Password
                                        </Typography>
                                        <Input
                                            type="password"
                                            name="password"
                                            size="lg"
                                            placeholder="********"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />

                                    </div>


                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="gradient" className="flex items-center gap-3 w-full justify-center mt-6 py-2">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        Sign In
                                    </Button>


                                    <Typography color="gray" className="mt-4 text-center font-normal">
                                        Do not have an account?{" "}
                                        <Link to="/signup" className="font-medium text-gray-900">
                                            Sign Up
                                        </Link>
                                    </Typography>
                                </form>
                            </Card>

                            <div className="my-6 border-b text-center mx-auto">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or
                                </div>
                            </div>


                            <div className="flex flex-col items-center">

                                <Button fullWidth variant="outlined" className="flex items-center gap-3 w-full justify-center" onClick={handleGoogleLogin}>
                                    <img className="h-7" src="/icons/google.png" alt="" />
                                    Continue with Google
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1  text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('/images/login-img.png')` }}
                    >
                    </div>
                </div>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default SignIn;