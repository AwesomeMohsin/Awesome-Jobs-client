import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useEffect } from "react";
import client from "../../api";


const SignUp = () => {

    const { createUser, editProfile, googleLogin, setLoading } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";


    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;
        console.log(name, email, password, photo);


        // password validation
        if (password.length < 6) {
            toast.error('Password should be at least 6 characters', {
                duration: 5000,
            });
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain at least 1 UPPERCASE character', {
                duration: 5000,
            });
            return;
        }
        // eslint-disable-next-line no-useless-escape
        else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
            toast.error('Password must contain at least 1 special character', {
                duration: 5000,
            });
            return;
        }

        // .then((result) => {
        //     client.post('/jwt', { email: result.user.email })
        //         .then(() => {

        //             // update name and photoURL
        //             updateProfile(auth.currentUser, {
        //                 displayName: name,
        //                 photoURL: photo
        //             })
        //                 .then(() => {
        //                     setLoading(false);
        //                     toast.success('Registration successfully')
        //                     navigate(from, { replace: true });
        //                     window.location.reload();
        //                 })
        //         })
        // })

        // .catch(error => {
        //     setLoading(false)
        //     console.log(error);
        //     if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        //         toast.error('Account with this email already exist', {
        //             duration: 5000,
        //         });
        //     }
        // })

        // Create user

        createUser(email, password)
            .then((result) => {
                client.post("/jwt", {
                    email: result.user.email,
                });
            })
            .then(() => {
                editProfile({ displayName: name, photoURL: photo }).then(() => {
                    toast.success("Account created successfully!");
                    navigate(from, { replace: true });
                    window.location.reload();
                    
                });
            })
            .catch((error) => {
                setLoading(false)
                console.log(error);
                if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                    toast.error('Account with this email already exist')
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
        document.title = 'Sign Up | Awesome Jobs';
    }, [])

    return (
        <div className="flex justify-center md:container mx-auto">
            <div className="m-0 sm:m-10 lg:shadow-lg sm:rounded-lg flex justify-center flex-1 ">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12  rounded-xl">
                    <div>

                    </div>
                    <div className="flex flex-col items-center">

                        <div className="w-full flex-1 mt-8">


                            <Card color="transparent" shadow={false} className=" mx-auto ">
                                <Typography variant="h4" color="blue-gray" className="text-5xl  text-center">
                                    Sign Up
                                </Typography>

                                <form onSubmit={handleRegister} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                                    <div className="mb-1 flex flex-col gap-6">

                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Your Name
                                        </Typography>
                                        <Input
                                            size="lg"
                                            name="name"
                                            required
                                            placeholder="Full Name"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Your Email
                                        </Typography>
                                        <Input
                                            size="lg"
                                            name="email"
                                            required
                                            placeholder="name@mail.com"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Password
                                        </Typography>
                                        <Input
                                            type="password"
                                            name="password"
                                            required
                                            size="lg"
                                            placeholder="********"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />

                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Photo URL
                                        </Typography>
                                        <Input
                                            size="lg"
                                            name="photo"
                                            required
                                            placeholder="Photo URL"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                    </div>
                                    <Checkbox
                                        label={
                                            <Typography
                                                variant="small"
                                                color="gray"
                                                className="flex items-center font-normal"
                                            >
                                                I agree the Terms and Conditions
                                            </Typography>
                                        }
                                        containerProps={{ className: "-ml-2.5" }}
                                    />
                                    {/* <Button
                                    type="submit" variant="gradient"
                                    className="mt-6" fullWidth>
                                    Sign Up
                                    </Button> */}

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="gradient" className="flex items-center gap-3 w-full justify-center mt-6 py-2">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        Sign Up
                                    </Button>


                                    <Typography color="gray" className="mt-4 text-center font-normal">
                                        Already have an account?{" "}
                                        <Link to="/signin" className="font-medium text-gray-900">
                                            Sign In
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

                                <Button variant="outlined" className="flex items-center gap-3 w-full justify-center" onClick={handleGoogleLogin}>
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

export default SignUp;