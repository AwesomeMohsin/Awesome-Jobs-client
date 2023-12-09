import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    Avatar,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Tooltip,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import logo from "/icons/logo.png"
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import client from "../api";

const NavBar = () => {
    const [openNav, setOpenNav] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        client.post("/logout", { email: user?.email }).then(() => {
            logOut();
          });


    }


    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

            {/* home */}
            <Typography
                as="li"
                variant="small"
                color="black"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <NavLink
                    to="/"
                    className="font-medium flex items-center text-base justify-center hover:text-teal-600"
                >
                    Home
                </NavLink>
            </Typography>

            {/* all jobs */}
            <Typography
                as="li"
                variant="small"
                color="black"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <NavLink
                    to="/jobs"
                    className="font-medium flex items-center text-base justify-center hover:text-teal-600"
                >
                    All jobs
                </NavLink>
            </Typography>

            {/* add job */}
            <Typography
                as="li"
                variant="small"
                color="black"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <NavLink
                    to="/addjob"
                    className="font-medium flex items-center text-base justify-center hover:text-teal-600"
                >
                    Add a job
                </NavLink>
            </Typography>

            {/* my jobs */}
            <Typography
                as="li"
                variant="small"
                color="black"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <NavLink
                    to="/myjobs"
                    className="font-medium flex items-center text-base justify-center hover:text-teal-600"
                >
                    My jobs
                </NavLink>
            </Typography>

            {/* applied jobs */}
            <Typography
                as="li"
                variant="small"
                color="black"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <NavLink
                    to="/appliedjobs"
                    className="font-medium flex items-center text-base justify-center hover:text-teal-600"
                >
                    Applied jobs
                </NavLink>
            </Typography>

            {/* blogs */}
            <Typography
                as="li"
                variant="small"
                color="black"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <NavLink
                    to="/blogs"
                    className="font-medium flex items-center text-base justify-center hover:text-teal-600"
                >
                    Blogs
                </NavLink>
            </Typography>
        </ul>
    );

    return (
        <Navbar className="max-w-none rounded-none">
            <div className="flex items-center justify-between text-gray-900 md:container mx-auto">

                <div className="flex gap-2">
                    <img src={logo} className="w-12" alt="" />
                    <Typography
                        as="a"
                        href="/"
                        className="mr-4 cursor-pointer font-medium font-font text-xl my-auto"
                    >
                        Awesome Jobs
                    </Typography>
                </div>

                <div className="hidden lg:block">
                    {navList}
                </div>

                <div className="hidden lg:flex justify-end w-[209px]">
                    {user?.email || user?.photoURL ? (
                        <div className="flex gap-3">
                            <Menu placement="bottom-end">
                                <Menu>
                                    {
                                        user.photoURL !== null ? <Tooltip content={user.displayName} ><Avatar className="hover:cursor-pointer" src={user.photoURL} /></Tooltip> : <Avatar src="/icons/user.png" />
                                    }

                                    {/* <Avatar src={user.photoURL}
                                    alt="avatar" variant="rounded" className="rounded-full" /> */}
                                </Menu>
                                <MenuList>
                                    <MenuItem>Menu Item 1</MenuItem>
                                    <MenuItem>Menu Item 2</MenuItem>
                                    <MenuItem>Menu Item 3</MenuItem>
                                </MenuList>
                            </Menu>
                            <Button onClick={handleLogOut}
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                            >Sign Out</Button>
                        </div>

                    ) : (
                        <Link to="/signin">
                           

                            <Button
                                variant="gradient" className="lg:flex items-center gap-3 px-5 justify-center mt-6 py-2 hidden my-auto">
                                <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor">
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                Sign In
                            </Button>
                        </Link>
                    )}
                </div>

                <div className="lg:hidden flex">
                    {
                        user && <Menu placement="bottom-end">
                            <MenuHandler>
                                {
                                    user.photoURL !== null ? <div ><Avatar title={user.displayName} src={user.photoURL} /></div> : <Avatar src="/icons/user.png" />
                                }
                               
                            </MenuHandler>
                            <MenuList>
                                <MenuItem>Menu Item 1</MenuItem>
                                <MenuItem>Menu Item 2</MenuItem>
                                <MenuItem>Menu Item 3</MenuItem>
                            </MenuList>
                        </Menu>
                    }

                    <IconButton
                        variant="text"
                        className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden ml-2 my-auto"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6 "
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>

            <Collapse open={openNav}>
                <div className="container mx-auto">
                    {navList}


                    {!user ? (
                        <Link to="/signin">
                            

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
                            
                        </Link>

                    ) : (
                        <Link>
                            <Button onClick={handleLogOut}
                                fullWidth
                                variant="gradient"
                                size="sm"
                            >
                                <span>Sign Out</span>
                            </Button>
                        </Link>
                    )
                    }
                </div>
            </Collapse>
        </Navbar>
    );
}

export default NavBar;