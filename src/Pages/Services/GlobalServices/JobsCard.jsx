/* eslint-disable react/prop-types */
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

import { FaBriefcase, FaWallet, FaCalendarAlt, FaUserTie } from 'react-icons/fa';
import { dateTimestampFormat } from "../../../utils";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";


const JobsCard = ({ job }) => {


    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    
    const { _id, createdAt, applicants, created_by, deadline, max_salary, min_salary, title, type } = job;

    

    const handleViewDetails = () =>{
        if (!user) {
            toast.error('You have to log in first to view details');
            navigate('/signin')
        }
    }
    

    return (
        <Card className="mt-6 p-2 md:p-4 border shadow-xl mx-auto">

        <CardBody>
            <Typography variant="h6" color="light-blue" className="mb-12 text-right font-fontTitle default-color">
                by {created_by.name}
            </Typography>

            <Typography variant="h5" color="blue-gray" className="mb-2 font-medium text-2xl">
                {title}
            </Typography>
            {/* <Typography className="py-6">
                This is the Job description if have any The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to
            </Typography> */}

            <div className="py-6 flex gap-3 mx-auto flex-col md:flex-row justify-between">
                
                    <span className=" font-medium underline text-[#0191D0] flex gap-2 my-auto"><FaWallet className="my-auto text-lg"></FaWallet>Salary Range: ${min_salary} to ${max_salary}</span>
                <span className=" font-medium underline text-[#0191D0] flex gap-2 my-auto"><FaUserTie className="my-auto text-lg"></FaUserTie>Total Applicants: {applicants}</span>
            </div>

            <hr />

                <div className="py-12 flex flex-col md:flex-row justify-between  gap-4
            ">

               


                    <div className="">
                    <Typography variant="h6" color="gray" className="mb-3 font-medium text-base uppercase flex gap-1 md:gap-3 justify-center">
                        <FaCalendarAlt className="my-auto text-lg"></FaCalendarAlt> Posted
                    </Typography>
                    <Typography variant="h6" color="gray" className="mb-2 pt-3 font-medium text-xl text-center">
                        {dateTimestampFormat(createdAt)}
                    </Typography>
                    </div>
                    <div className="">
                    <Typography variant="h6" color="gray" className="mb-3 font-medium text-base uppercase flex gap-1 md:gap-3 justify-center ">
                        <FaBriefcase className="my-auto text-lg "></FaBriefcase> Job Type
                        </Typography>
                    <Typography variant="h6" color="gray" className="mb-2 pt-3 font-medium text-xl text-center">
                        {type?.split("_").join(" ").toUpperCase()}
                        </Typography>
                    </div>


                <div className="">
                    <Typography variant="h6" color="gray" className="mb-3 font-medium text-base uppercase flex gap-1 md:gap-3 justify-center">
                        <FaCalendarAlt className="my-auto text-lg"></FaCalendarAlt> Deadline
                    </Typography>
                    <Typography variant="h6" color="gray" className="mb-2 pt-3 font-medium text-xl text-center">
                    {dateTimestampFormat(deadline)}
                    </Typography>
                </div>

            </div>
            <hr />


        </CardBody>
        <CardFooter className="pt-0 flex justify-end">
            {/* <Typography variant="h6" color="gray" className="mb-2 pt-3 font-light text-sm">
                Posted: 05th Nov, 2023
            </Typography> */}
                <Link to={`/jobs/${_id}`}>
                <Button onClick={handleViewDetails}  color="light-blue" className="rounded-2xl normal-case text-sm ">View Details</Button>
                </Link>
        </CardFooter>
    </Card>
    );
};

export default JobsCard;