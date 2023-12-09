import {
    Typography, Avatar, Card,
    CardBody,
    CardFooter,
    Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaUser, FaSearch, FaFileAlt } from "react-icons/fa";


const OurJobProcess = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-4xl md:text-6xl font-semibold font-fontTitle pb-4 pt-6">Our Job Process</h2>
                    <hr className="mx-auto w-2/5" />
                    <hr className="mx-auto w-2/5 pb-24" />


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 mx-auto lg:w-full">
                
                <Card className="mt-6 py-10 shadow-xl border">
                    <CardBody className="flex flex-col">
                    <FaUser className="mx-auto items-center mb-10 text-3xl text-[#019AD6]"></FaUser>
                        <Typography variant="h5" color="blue-gray" className="mb-6 text-center">
                            Create Account
                        </Typography>
                        <Typography className="text-center">
                        Creating an account is a quick process. Just visit our website, click 'Sign Up,' enter your email  and you're ready to go.
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-center">
                        <Link to='/signup' className="">
                            <Button size="sm" variant="gradient" color="light-blue"  className="flex items-center gap-2 ">
                                Sign Up Now!
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                <Card className="mt-6  shadow-xl py-10 border">
                    <CardBody className="flex flex-col">
                    <FaSearch className="mx-auto items-center mb-10 text-3xl text-[#019AD6]"></FaSearch>
                        <Typography variant="h5" color="blue-gray" className="mb-6 text-center">
                            Search Job
                        </Typography>
                        <Typography className="text-center">
                        Finding jobs is easy. Visit our website, click 'Jobs,' set your preferences, and click 'Search' to start your job hunt.
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-center">
                        <Link to='/jobs' className="">
                            <Button size="sm" variant="gradient" color="light-blue"  className="flex items-center gap-2 ">
                                Check all jobs
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                <Card className="mt-6 shadow-xl py-10 border">
                    <CardBody className="flex flex-col">
                    <FaFileAlt className="mx-auto items-center mb-10 text-3xl text-[#019AD6]"></FaFileAlt>
                        <Typography variant="h5" color="blue-gray" className="mb-6 text-center">
                            Upload resume
                        </Typography>
                        <Typography className="text-center">
                        Visit our website, select the job you want, click 'Apply,' and upload your resume to complete your application
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-center">
                        <Link to='/jobs' className="">
                            <Button size="sm" variant="gradient" color="light-blue" className="flex items-center gap-2 ">
                                Apply Now!
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>

        </div>
    );
};

export default OurJobProcess;