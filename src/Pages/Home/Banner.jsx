import { useEffect, useState } from 'react';
import banner1 from '/images/banner1.jpg';
import banner2 from '/images/banner2.jpg';
import banner3 from '/images/banner3.jpg';
import banner4 from '/images/banner4.jpg';

import './banner.css';

const images = [banner1, banner2, banner3, banner4];


const Banner = () => {

    const [backgroundImage, setBackgroundImage] = useState(images[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentIndex = images.indexOf(backgroundImage);
            const nextIndex = (currentIndex + 1) % images.length;
            setBackgroundImage(images[nextIndex]);
        }, 4000);
        return () => clearInterval(interval);
    }, [backgroundImage]);



    return (
        <div
            className="banner-main flex items-center h-auto py-10"
            style={{ backgroundImage: `url(${backgroundImage})`, transition: '.9s' }}
        >
            <div className="container mx-auto">
                <div className="xl:w-6/12 space-y-8 md:space-y-5">
                    <h1 className="px-4 text-center md:text-left text-[3.5rem] md:text-6xl lg:text-8xl font-semibold text-white leading-[50px] lg:leading-[80px] mb-[-20px] md:mb-0">

                        {' '}
                        Connecting Careers,
                        <br />
                        <span className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl lg:leading-[80px]">
                            Building Futures...
                        </span>
                    </h1>
                    <p className="text-white text-center px-4 md:text-left">
                        Where Your Career Path Meets a Brighter Future
                    </p>


                    <form className="flex items-center px-4">
                        <input
                            type="search"
                            name="search"
                            className="relative m-0 -mr-px block w-full md:w-9/12 min-w-0 rounded-l bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out border-2 border-white focus:ring-0"
                            placeholder={`Try "Remote Jobs"`}
                        />
                        <button
                            className="relative flex items-center rounded-r bg-primary py-[10.5px] px-4 text-xs font-bold uppercase leading-tight bg-[#222222] border-2 border-[#222222] text-white"
                            type="submit"
                            id="button-addon1"
                        >
                            Search
                        </button>
                    </form>
                    <div className="px-4">
                        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
                            <div className="text-white font-bold">Popular:</div>{' '}
                            <div className="text-white font-semibold md:font-bold py-0 px-2 border-2 border-white rounded-full cursor-pointer hover:bg-white hover:text-[#222222] transition-all">
                                Web Developer
                            </div>
                            <div className="text-white font-semibold md:font-bold py-0 px-2 border-2 border-white rounded-full cursor-pointer hover:bg-white hover:text-[#222222] transition-all">
                                Marketing
                            </div>
                            <div className="text-white font-semibold md:font-bold py-0 px-2 border-2 border-white rounded-full cursor-pointer hover:bg-white hover:text-[#222222] transition-all">
                                UI / UX Designer
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;