import { useContext, useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Spinner,
} from "@material-tailwind/react";
import client from "../../../api";
import { useQuery } from "@tanstack/react-query";
import { dateTimestampFormat } from "../../../utils";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";



const Jobs = () => {

  // const { data: jobs, isLoading, refetch } = useQuery({
  //     queryKey: ['/jobs'],
  //     queryFn: () => client.get(`/my/jobs?email=${user.email}`).then(({ data }) => data.result),
  // });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');

  const fetch = () =>
    
    searchInput.length
      ?
      client.get(`/jobs?search=${searchInput}`).then(({ data }) => data.result)
      : client.get('/jobs').then(({ data }) => data.result);

  const { data: jobs, isLoading, refetch } = useQuery({
    queryKey: [searchInput.length ? `/jobs?search=${searchInput}` : '/jobs'],
    queryFn: () => fetch(),
  });

  if (isLoading) {
    <div className="flex items-end gap-8 justify-center py-40 xl:py-80">
      <Spinner className="h-8 w-8" />
    </div>
  } 
    

  console.log(jobs);

  const handleSearchChange = e => {
    e.preventDefault();
    setSearchInput(e.target.value);

  }
  console.log(searchInput);



  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "On Site Job",
      value: "onsite",

    },
    {
      label: "Remote Job",
      value: "remote",

    },
    {
      label: "Hybrid",
      value: "hybrid",

    },
    {
      label: "Full Time",
      value: "full_time",

    },
    {
      label: "Part Time",
      value: "part_time",

    },
  ];

  const TABLE_HEAD = ["Employer", "Job Info", "Type", "Deadline", "Salary Range", ""];

  //   const TABLE_ROWS = [
  //     {
  //       img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
  //       name: "John Michael",
  //       email: "john@creative-tim.com",
  //       job: "Manager",
  //       org: "Organization",
  //       online: true,
  //       date: "23/04/18",
  //     },
  //     {
  //       img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
  //       name: "Alexa Liras",
  //       email: "alexa@creative-tim.com",
  //       job: "Programator",
  //       org: "Developer",
  //       online: false,
  //       date: "23/04/18",
  //     },
  //     {
  //       img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
  //       name: "Laurent Perrier",
  //       email: "laurent@creative-tim.com",
  //       job: "Executive",
  //       org: "Projects",
  //       online: false,
  //       date: "19/09/17",
  //     },
  //     {
  //       img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
  //       name: "Michael Levi",
  //       email: "michael@creative-tim.com",
  //       job: "Programator",
  //       org: "Developer",
  //       online: true,
  //       date: "24/12/08",
  //     },
  //     {
  //       img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
  //       name: "Richard Gran",
  //       email: "richard@creative-tim.com",
  //       job: "Manager",
  //       org: "Executive",
  //       online: false,
  //       date: "04/10/21",
  //     },
  //   ];


  const handleViewDetails = () => {
    if (!user) {
      toast.error('You have to log in first to view details');
      navigate('/signin')
    }
  }

  useEffect(() => {
    document.title = 'All Jobs | Awesome Jobs';
  }, [])


  return (
    <div className="md:container mx-auto py-20">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div className="text-center mx-auto lg:text-left lg:mx-0">
              <Typography variant="h4" color="blue-gray">
                All Jobs
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all available Jobs
              </Typography>
            </div>

            <div className="w-full md:w-72">
              <Input
                onChange={handleSearchChange}
                label="Search"
                name="search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
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
              {jobs?.map(
                ({ _id, createdAt, applicants, created_by, deadline, max_salary, min_salary, title, type }, index) => {
                  const isLast = index === jobs?.length - 1;
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
                        <Typography>$ {min_salary} - $ {max_salary}</Typography>
                      </td>
                      <td className={classes}>
                        <Link to={`/jobs/${_id}`}>
                          <Button onClick={handleViewDetails} color="light-blue">Details</Button>
                        </Link>
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
  );
};

export default Jobs;