import { useLoaderData } from "react-router-dom";
import emailjs from '@emailjs/browser';

import {
    Button,
    Dialog,
    Input,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    DialogFooter,
} from "@material-tailwind/react";

import { dateTimestampFormat } from "../../../utils";

import { FaBriefcase, FaCalendarAlt, FaUserTie, FaBuilding, FaUser } from 'react-icons/fa';
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import client from "../../../api";


const JobCardDetails = () => {
    const form = useRef();
    const job = useLoaderData()
    const { user } = useContext(AuthContext);

    const { _id, createdAt, applicants, created_by, deadline, max_salary, banner, min_salary, title, type, company, candidates, description } = job.result;

    console.log(job.result);

    const matchedEmail = candidates.filter(candidate => candidate.email === user.email);

    console.log(matchedEmail.length);
    


    const sendEmail = () => {

        emailjs.sendForm('service_date55q', 'template_3yidyqr', form.current, 'KiIaTZOiWnXgm4NpR')
            .then((result) => {
                toast.success('Check email for confirmation mail.')
                console.log(result.text);
                window.location.reload();
            }, (error) => {
                console.log(error.text);
            });
    };




    const today = Date.now();
    const deadlineDate = Date.parse(deadline);

    const [open, setOpen] = useState(false);

    const handleCancel = () => {
        setOpen(!open);
    }

    const handleOpen = () => {
        if (today > deadlineDate) {
            toast.error('Application Deadline is over');
        }
        else if (user.email === created_by.email) {
            toast.error('You cannot apply to your own job');
        }
        else if (matchedEmail.length > 0 ) {
            toast.error('You already applied for this job');
        }
          
        else {
            setOpen(!open);
            // sendEmail();

        }
    };


    const handleApplyJob = (e) => {
        e.preventDefault();
        const form = e.target;

        const payload = {
            name: user?.displayName,
            email: user?.email,
            resume: form.resume.value,
        };

        client
            .patch(`/applied-job/${_id}`, payload)
            .then(() => {
                toast.success('Successfully applied for this Job')
                sendEmail();
                form.reset();
                setOpen(false);
                
            })
            .catch((error) => {
                if (error.response.status == 409) {
                    setOpen(false);
                    toast.error("You have already applied this job");
                }
            });

    }

    useEffect(() => {
        document.title = 'Job Details | Awesome Jobs';
      }, [])


    return (
        <div className="max-w-7xl mx-auto py-20">

            <figure className="relative h-96 w-full">
                <img
                    className="h-full w-full rounded-xl object-cover object-center"
                    src={banner ? banner : "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"}
                    alt="nature image"
                />
                <figcaption className="absolute bottom-4 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                    <div>
                        <Typography variant="h4" >
                            {title}
                        </Typography>
                        <Typography color="black" className="mt-2 font-medium">
                            Salary Range: ${min_salary} to ${max_salary}
                        </Typography>
                    </div>
                    <Typography variant="h5" color="blue-gray">
                        Deadline: {dateTimestampFormat(deadline)}
                    </Typography>
                </figcaption>
            </figure>


            <div>


                <Card color="transparent" variant="gradient" className="w-full p-8">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center "
                    >
                        <Typography
                            variant="h1"
                            color="black"
                            className="font-normal uppercase text-3xl "
                        >
                            <span className="text-xl my-auto">by</span>  {
                                company?.name ? company?.name : created_by.name
                            }
                            <Avatar className="ml-4 border-black border" src={company?.logo ? company.logo : "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"} alt="Company Logo" />
                        </Typography>

                        <Typography
                            variant="h1"
                            color="black"
                            className="mt-10 flex flex-col  justify-center gap-1  lg:text-7xl font-normal"
                        >
                            <span className=" my-auto text-2xl pr-2">Seeking</span>
                            {title}{" "}

                        </Typography>
                    </CardHeader>


                    <CardBody className="p-0 flex flex-col md:flex-row">

                        <ul className="flex flex-col  gap-4 flex-1 ">
                            <Typography variant="h4" className="pb-4 pl-2">Details:</Typography>
                            <li className="flex items-center gap-1">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <FaBuilding className="text-lg" />
                                </span>
                                <Typography className="font-normal">Employer Name: <span className="font-bold">{
                                    company?.name ? company?.name : created_by.name
                                }</span></Typography>
                            </li>
                            <li className="flex items-center gap-1">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <FaUserTie className="text-lg" />
                                </span>
                                <Typography className="font-normal">Job Poster Name: <span className="font-bold">{created_by.name}</span></Typography>
                            </li>
                            <li className="flex items-center gap-1">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <FaCalendarAlt className="text-lg" />
                                </span>
                                <Typography className="font-normal">Posted on: <span className="font-bold">{dateTimestampFormat(createdAt)}</span></Typography>
                            </li>

                            <li className="flex items-center gap-1">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <FaBriefcase className="text-lg" />
                                </span>
                                <Typography className="font-normal">Job Types: <span className="font-bold ">{type?.split("_").join(" ").toLowerCase()}</span></Typography>
                            </li>
                            <li className="flex items-center gap-1">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <FaUser className="text-lg" />
                                </span>
                                <Typography className="font-normal">Applied Applicants: <span className="font-bold">{applicants}</span></Typography>
                            </li>

                            <li className="flex items-center gap-1">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <FaCalendarAlt className="text-lg" />
                                </span>
                                <Typography className="font-normal">Deadline: <span className="font-bold">{dateTimestampFormat(deadline)}</span></Typography>
                            </li>
                        </ul>



                        <Typography variant="paragraph" className="flex-1">
                            <Typography variant="h4" className="py-8 md:pt-0">Description:</Typography>

                            {
                                description ? description : "N/A"
                            }
                        </Typography>

                    </CardBody>
                    <CardFooter className="mt-12 p-0">
                        <Button
                            size="lg"
                            color="light-blue"
                            variant="gradient"
                            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                            ripple={false}
                            fullWidth={true}
                            onClick={handleOpen}
                        >
                            Apply Now
                        </Button>
                        <Dialog
                            open={open}
                            handler={handleOpen}
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0.9, y: -100 },
                            }}
                        >
                            <CardHeader
                                color="light-blue"
                                variant="gradient"
                                floated={false}
                                shadow={false}
                                className="m-0 grid place-items-center px-4 py-8 text-center rounded-lg"
                            >

                                <Typography variant="h5" color="white">
                                    Apply for this Job
                                </Typography>
                            </CardHeader>
                            <CardBody className="-mt-8 px-12">

                                <div value="addjob" className="p-0">
                                    <form ref={form} onSubmit={handleApplyJob} className="mt-12 flex flex-col gap-4">
                                        <div>
                                            <Typography
                                                variant="paragraph"
                                                color="blue-gray"
                                                className="mb-4 font-medium"
                                            >
                                                Applicant Details
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="mb-2 font-medium"
                                            >
                                                Applicant Name
                                            </Typography>
                                            <Input

                                                type="text"
                                                name="name"
                                                readOnly
                                                defaultValue={user.displayName}
                                                placeholder="Full name"
                                                className=" mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                            />
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="mb-2 mt-2 font-medium"
                                            >
                                                Email address
                                            </Typography>
                                            <Input

                                                type="email"
                                                name="email"
                                                readOnly
                                                defaultValue={user.email}
                                                placeholder="name@mail.com"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                            />
                                        </div>
                                        {/* job info */}
                                        <div className="my-6">
                                            <Typography
                                                variant="paragraph"
                                                color="blue-gray"
                                                className="mb-4 font-medium"
                                            >
                                                Requirements
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="mb-2 font-medium"
                                            >
                                                Resume Link
                                            </Typography>
                                            <Input
                                                required
                                                type="text"
                                                name="resume"
                                                placeholder="Resume Link"
                                                className=" mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                            />
                                        </div>
                                        <DialogFooter className="mx-auto">
                                            <Button
                                                variant="gradient"
                                                color="red"
                                                onClick={handleCancel}
                                                className="mr-1"
                                            >
                                                <span>Cancel</span>
                                            </Button>
                                            <Button type="submit"  variant="gradient" color="light-blue">
                                                <span>Apply</span>
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </div>

                            </CardBody>

                        </Dialog>
                    </CardFooter>
                </Card>

            </div>

        </div>
    );
};

export default JobCardDetails;