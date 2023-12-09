import { Typography } from "@material-tailwind/react";
import logo from "/icons/logo.png"
import { FaFacebook, FaInstagram, FaYoutube, FaHome, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';



const Footer = () => {

    const LINKS = [
        {
            title: "Product",
            items: ["Overview", "Features", "Solutions", "Tutorials"],
        },
        {
            title: "Company",
            items: ["About us", "Careers", "Press", "News"],
        },
        {
            title: "Resource",
            items: ["Blog", "Newsletter", "Events", "Help center"],
        },
    ];

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full mt-20 mb-10">
            <div className="mx-auto w-full md:container px-8">
                <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
                    <div className="">
                        <div className="flex gap-2">
                            <img src={logo} className="w-14 h-14 my-auto" alt="" />
                            <Typography
                                as="a"
                                href="/"
                                className="mr-4 cursor-pointer font-medium font-font text-xl my-auto"
                            >
                                Awesome Jobs
                            </Typography>
                        </div>

                        <div className='footer pt-2 pb-4 ml-4'>
                            <div className='text-center mx-auto flex flex-col gap-3 justify-center'>


                                <Typography
                                    variant="small"
                                    className="mb-4 text-left font-normal pb-4 flex gap-3 text-blue-gray-900 md:mb-0"
                                ><FaHome className='text-xl'></FaHome> 1206 DOHS Bypass, Dhaka 1206 
                                </Typography>

                                <Typography
                                    variant="small"
                                    className="mb-4 text-left font-normal flex gap-3 text-blue-gray-900 md:mb-0"
                                ><FaPhoneAlt className='text-xl'></FaPhoneAlt> +880 1234567890 
                                </Typography>

                                <Typography
                                    variant="small"
                                    className="mb-4 text-left font-normal flex gap-3 text-blue-gray-900 md:mb-0"
                                ><FaEnvelope className='text-xl'></FaEnvelope> contact@awesomejobs.com
                                </Typography>



                               
                            </div>
                        </div>

                    </div>


                    <div className="grid grid-cols-3 justify-between gap-4">
                        {LINKS.map(({ title, items }) => (
                            <ul key={title}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-3 font-medium opacity-40"
                                >
                                    {title}
                                </Typography>
                                {items.map((link) => (
                                    <li key={link}>
                                        <Typography
                                            as="a"
                                            href="#"
                                            color="gray"
                                            className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                                        >
                                            {link}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>

                </div>

                <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
                    <Typography
                        variant="small"
                        className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
                    >
                        &copy; {currentYear} <a href="/">Awesome Jobs</a>. All
                        Rights Reserved.
                    </Typography>
                    <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
                        <div className="grid grid-flow-col gap-4">
                            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                                <button className="text-2xl"
                                ><FaFacebook></FaFacebook></button>
                            </a>
     
                            
                            
                            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                                <button className="text-2xl"
                                ><FaInstagram></FaInstagram></button>
                            </a>

                            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                                <button className="text-2xl"
                                ><FaYoutube></FaYoutube></button>
                            </a>
                        </div>


                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;