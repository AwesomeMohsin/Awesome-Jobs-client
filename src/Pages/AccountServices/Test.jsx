import {
    Card,
    Avatar,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

import { FaBriefcase, FaWallet, FaCalendarAlt, FaUserTie } from 'react-icons/fa';


const Test = () => {

    // - Name who posted the job,
    // - Job Title
    // - Job Posting Date
    // - Application Deadline
    // - Salary range
    // - Job Applicants Number
    // - View Details Button

    return (
        <Card className="mt-6 xl:w-2/5 p-2 md:p-4 border shadow-xl mx-auto">

            <CardBody>
                <Typography variant="h6" color="teal" className="mb-6 text-right font-fontTitle">
                    by Awesome Corp
                </Typography>

                <Typography variant="h5" color="blue-gray" className="mb-2 font-medium text-2xl">
                    Job Title Developer
                </Typography>
                <Typography className="py-6">
                    This is the Job description if have any The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to
                </Typography>

                <div className="py-6 flex">
                    <Avatar
                        size="md"
                        variant="circular"
                        alt="tania andrew"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        className="border-2 border-white hover:z-10"
                    />
                    <Avatar
                        size="md"
                        variant="circular"
                        alt="tania andrew"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        className="border-2 border-white hover:z-10"
                    />
                    <Avatar
                        size="md"
                        variant="circular"
                        alt="tania andrew"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        className="border-2 border-white hover:z-10"
                    />
                    <Avatar
                        size="md"
                        variant="circular"
                        alt="tania andrew"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        className="border-2 border-white hover:z-10"
                    />
                    <span className="pl-6 font-medium underline text-[#1D8D96] flex gap-2 my-auto"><FaUserTie className="my-auto text-lg"></FaUserTie>Total Applicants: 12</span>
                </div>


                <hr />


                <div className="py-6 flex justify-between">

                    <div className="">
                        <Typography variant="h6" color="gray" className="mb-3 font-medium text-base uppercase flex gap-1 md:gap-3">
                            <FaBriefcase className="my-auto text-lg"></FaBriefcase> Job Type
                        </Typography>
                        <Typography variant="h6" color="gray" className="mb-2 pt-3 font-medium text-xl">
                            Remote
                        </Typography>
                    </div>

                    <div className="">
                        <Typography variant="h6" color="gray" className="mb-3 font-medium text-base uppercase flex gap-1 md:gap-3">
                            <FaWallet className="my-auto text-lg"></FaWallet> Salary
                        </Typography>
                        <Typography variant="h6" color="gray" className="mb-2 pt-3 font-medium text-xl">
                            $2500 / year
                        </Typography>
                    </div>

                    <div className="">
                        <Typography variant="h6" color="gray" className="mb-3 font-medium text-base uppercase flex gap-1 md:gap-3">
                            <FaCalendarAlt className="my-auto text-lg"></FaCalendarAlt> Deadline
                        </Typography>
                        <Typography variant="h6" color="gray" className="mb-2 pt-3 font-medium text-xl">
                            15th Nov, 2023
                        </Typography>
                    </div>

                </div>
                <hr />


            </CardBody>
            <CardFooter className="pt-0 flex justify-between">
                <Typography variant="h6" color="gray" className="mb-2 pt-3 font-light text-sm">
                    Posted: 05th Nov, 2023
                </Typography>
                <Button color="teal" className="rounded-2xl normal-case text-sm">View Details</Button>
            </CardFooter>
        </Card>

    );
};

export default Test;