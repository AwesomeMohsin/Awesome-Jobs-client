import { useState, useContext, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";

import { AuthContext } from "../../../providers/AuthProvider";
import client from "../../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";





const AddJob = () => {

  const { user } = useContext(AuthContext)
  const [selectType, setSelectType] = useState('');
  const [deadlineDate, setDeadlineDate] = useState();
  const navigate = useNavigate();

  const today = new Date();
  console.log(today);

  const handleAddJob = e => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const photo = form.photo.value;
    const min_salary = form.min_salary.value;
    const max_salary = form.max_salary.value;
    const description = form.description.value;
    const company_name = form.company_name.value;
    const company_logo = form.company_logo.value;
    
    if (!selectType) {
      toast.error('Please select a Job Type')
    }
    
    const formData = {
      title: title,
      type: selectType,
      deadline: deadlineDate,
      min_salary: min_salary,
      max_salary: max_salary,
      banner: photo,
      description: description,
      company: {
        name: company_name,
        logo: company_logo,
      },
      created_by: {
        name: user.displayName,
        email: user.email,
      }

    }

    console.log(formData);


    client.post('/jobs', formData).then(() => {
      toast.success("Job added successfully");
      navigate('/jobs');

    });

  }





  useEffect(() => {
    document.title = 'Add a Job | Awesome Jobs';
  }, [])


  return (
    <div className="md:container mx-auto py-20">
      <Card className="w-full ">
        <CardHeader
          color="light-blue"
          variant="gradient"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-8 text-center"
        >

          <Typography variant="h5" color="white">
            Add a Job
          </Typography>
        </CardHeader>

        <CardBody>

          <div value="addjob" className="p-0">
            <form onSubmit={handleAddJob} className="mt-12 flex flex-col gap-4">
              <div>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="mb-4 font-medium"
                >
                  Job Poster Details
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Poster Name
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
                  New Job Information
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Job Title
                </Typography>
                <Input
                  required
                  type="text"
                  name="title"
                  placeholder="Title of the Job"
                  className=" mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 mt-4 font-medium"
                >
                  Job Banner URL
                </Typography>
                <Input
                  required
                  type="text"
                  name="photo"
                  placeholder="Photo URL of the Banner"
                  className=" mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />


                <div className="flex flex-col lg:flex-row gap-4 mx-auto ">

                  {/* job category */}
                  <div className="mx-auto w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 mt-4 font-medium"
                    >
                      Job Category
                    </Typography>
                    <Select
                      
                      name="type"
                      value={selectType}
                      onChange={(value) => {
                        setSelectType(value)
                      }}
                      variant="outlined"
                      label="Select type of the Job"  >
                      <Option value="onsite">On Site Job</Option>
                      <Option value="remote">Remote Job</Option>
                      <Option value="hybrid">Hybrid</Option>
                      <Option value="part_time">Part Time</Option>
                    </Select>
                  </div>

                  {/* applicants number */}
                  <div className="mx-auto w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 mt-4 font-medium"
                    >
                      Applicants Number
                    </Typography>
                    <Input
                      readOnly
                      type="number"
                      name="applicants"
                      defaultValue={0}
                      placeholder="Number of the Job applicants"
                      className=" mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>


                  {/* Min salary */}
                  <div className="mx-auto w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 mt-4 font-medium"
                    >
                      Minimum Salary
                    </Typography>
                    <Input
                      required
                      type="number"
                      name="min_salary"
                      placeholder="$$$$$"
                      className=" mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>



                  {/* Max salary  */}
                  <div className="mx-auto w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 mt-4 font-medium"
                    >
                      Maximum Salary
                    </Typography>
                    <Input
                      required
                      type="number"
                      name="max_salary"
                      placeholder="$$$$$"
                      className=" mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>


                </div>


                <div className="flex flex-col-reverse lg:flex-row gap-4">



                  <div className=" flex flex-col justify-center lg:flex-row gap-4 my-auto w-full">


                    <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 mt-4 font-medium"
                      >
                        Company Name
                      </Typography>
                      <Input
                        required
                        type="text"
                        name="company_name"
                        placeholder="Company name"
                        className=" mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />

                    </div>

                    <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 mt-4 font-medium"
                      >
                        Company Logo URL
                      </Typography>
                      <Input

                        type="text"
                        name="company_logo"
                        placeholder="Company Logo"
                        className=" mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />

                    </div>

                    <div className="md:flex mx-auto md:gap-12 lg:gap-4 w-full">

                      {/* posted */}
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 mt-4 font-medium "
                        >
                          Posted Date
                        </Typography>
                        <DatePicker

                          className="border-2 rounded-lg !border-t-blue-gray-200 focus:!border-t-gray-900 "
                          showIcon
                          placeholderText="Select Posting Date"
                          selected={today}
                          disabled
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 48 48"
                            >
                              <mask id="ipSApplication0">
                                <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                  <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                                  <path
                                    fill="#fff"
                                    d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                  ></path>
                                </g>
                              </mask>
                              <path
                                fill="currentColor"
                                d="M0 0h48v48H0z"
                                mask="url(#ipSApplication0)"
                              ></path>
                            </svg>
                          }
                        />
                      </div>

                      {/* deadline */}
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 mt-4 font-medium"
                        >
                          Deadline Date
                        </Typography>
                        <DatePicker
                          required
                          className="border-2 rounded-lg !border-t-blue-gray-200 focus:!border-t-gray-900"
                          showIcon
                          placeholderText="Select Deadline Date"
                          selected={deadlineDate}
                          minDate={today}
                          onChange={(date) => setDeadlineDate(date)}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 48 48"
                            >
                              <mask id="ipSApplication0">
                                <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                  <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                                  <path
                                    fill="#fff"
                                    d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                  ></path>
                                </g>
                              </mask>
                              <path
                                fill="currentColor"
                                d="M0 0h48v48H0z"
                                mask="url(#ipSApplication0)"
                              ></path>
                            </svg>
                          }
                        />
                      </div>

                    </div>

                  </div>

                </div>

                {/* description */}
                <div className="w-full">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 mt-4 font-medium"
                  >
                    Description
                  </Typography>
                  <Textarea
                    required
                    variant="outlined" name="description" label="Short Description" className="w-full" />
                </div>

              </div>
              <Button color="light-blue"
                variant="gradient" type="submit" size="lg">Add this Job</Button>

            </form>
          </div>

        </CardBody>
      </Card>
    </div>
  );
};

export default AddJob;