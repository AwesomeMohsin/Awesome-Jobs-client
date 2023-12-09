import { useContext, useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  Spinner,
  Dialog,
  DialogBody,
  Textarea,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import client from "../../../api";
import { useQuery } from "@tanstack/react-query";
import { dateTimestampFormat } from "../../../utils";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";




const MyJobs = () => {

  const { user } = useContext(AuthContext);
  const [selectType, setSelectType] = useState();
  const [deadlineDate, setDeadlineDate] = useState();


  const today = new Date();
  const [editedData, setEditedData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['/my/jobs'],
    queryFn: () => client.get(`/my/jobs?email=${user?.email}`).then(({ data }) => data.result),
  });

  // const TABS = [
  //   {
  //     label: "All",
  //     value: "all",
  //   },
  //   {
  //     label: "On Site Job",
  //     value: "onsite",

  //   },
  //   {
  //     label: "Remote Job",
  //     value: "remote",

  //   },
  //   {
  //     label: "Hybrid",
  //     value: "hybrid",

  //   },
  //   {
  //     label: "Full Time",
  //     value: "full_time",

  //   },
  //   {
  //     label: "Part Time",
  //     value: "part_time",

  //   },
  // ];

  const TABLE_HEAD = ["Employer", "Job Info", "Type", "Deadline", "Salary Range", ""];



  const handleUpdate = (id) => {
    const filteredData = data.find((el) => el._id === id);
    
    setEditedData(filteredData);
    setOpen(true);
  }

  const handleSubmitData = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const photo = form.photo.value;
    const min_salary = form.min_salary.value;
    const max_salary = form.max_salary.value;
    const description = form.description.value;
    const company_name = form.company_name.value;
    const company_logo = form.company_logo.value;

    

    const formData = {
      title: title,
      type: selectType,
      deadline: deadlineDate === "" ? editedData.deadline : deadlineDate,
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

    client
      .patch(`/my/jobs/${editedData?._id}?email=${user.email}`, formData)
      .then(() => {
        toast.success("Job updated successfully");
        refetch();
        handleOpen();
      });
  };



  const handleDeleteMyJob = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {

      if (result.isConfirmed) {
        console.log(_id);

        client.delete(`/my/jobs/${_id}?email=${user.email}`).then(({ data }) => {

          refetch();
          console.log(data.result);
          Swal.fire({
            title: "Deleted!",
            text: "Your job has been deleted.",
            icon: "success"
          });

        })

      }
    });

  }




  useEffect(() => {
    document.title = 'My Jobs | Awesome Jobs';
  }, [])

  if (isLoading) {
    return <div className="flex items-end gap-8 justify-center py-40 xl:py-80">
      <Spinner className="h-8 w-8" />
    </div>;
  }



  return (
    <div>
      {data?.length === 0 ?
        (
          <h2 className="text-center text-3xl font-semibold mt-20">
            No job has been posted yet!
          </h2>
        ) : (
          <>
            <div className="md:container mx-auto py-20">
              <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                  <div className="mb-8 flex items-center justify-between gap-8">
                    <div className="text-center mx-auto lg:text-left lg:mx-0">
                      <Typography variant="h4" color="blue-gray">
                        My Jobs
                      </Typography>
                      <Typography color="gray" className="mt-1 font-normal">
                        See information about your created Jobs
                      </Typography>
                    </div>


                  </div>

                </CardHeader>

                <CardBody className="overflow-scroll">
                  <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      
                      {data?.map(
                        ({ _id, createdAt, applicants, created_by, deadline, max_salary, min_salary, title, type }, index) => {
                          const isLast = index === data?.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                          return (
                            <tr key={_id}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <div className="flex flex-col">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {created_by.name}
                                    </Typography>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal opacity-70"
                                    >
                                      {dateTimestampFormat(createdAt)}
                                    </Typography>
                                  </div>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {title}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal opacity-70"
                                  >
                                    Applicants : {applicants}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="w-max">
                                  <Chip
                                    className="capitalize"
                                    variant="ghost"
                                    size="sm"
                                    value={type?.split("_").join(" ").toLowerCase()}
                                    color={type ? "light-blue" : "blue"}
                                  />
                                </div>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {dateTimestampFormat(deadline)}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography>${min_salary} - ${max_salary}</Typography>
                              </td>
                              <td className={`${classes} flex gap-2`}>

                                <Button onClick={() => handleUpdate(_id)} color="light-blue" variant="gradient">
                                  Update
                                </Button>

                                <Button onClick={() => handleDeleteMyJob(_id)} variant="gradient" color="red">Delete</Button>

                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </CardBody>
              </Card>

            </div>
          </>
        )}

      <Dialog size="xxl" open={open} handler={handleOpen} className="bg-white min-h-full">
        <DialogBody className="bg-white">
          <CardHeader
            color="light-blue"
            variant="gradient"
            floated={false}
            shadow={false}
            className="m-0 grid place-items-center px-4 py-8 text-center"
          >

            <Typography variant="h5" color="white">
              Update this Job
            </Typography>
          </CardHeader>

          <form onSubmit={handleSubmitData} className="mt-12 flex flex-col gap-4 bg-white">
            {/* <div>
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
              </div> */}

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
                defaultValue={editedData?.title}
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
                defaultValue={editedData?.banner}
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
                    label="Click to change the Job type"  >
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
                    defaultValue={editedData?.min_salary}
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
                    defaultValue={editedData?.max_salary}
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
                      defaultValue={editedData?.company.name}
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
                      defaultValue={editedData?.company.logo}
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
                        selected={
                          deadlineDate === ""
                            ? new Date(editedData?.deadline)
                            : deadlineDate
                        }
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
                  defaultValue={editedData?.description}
                  variant="outlined" name="description" label="Short Description" className="w-full" />
              </div>

            </div>
            <Button color="light-blue"
              variant="gradient" type="submit" size="lg">Update this Job</Button>

          </form>

        </DialogBody>
      </Dialog>


    </div>
  );
};

export default MyJobs;