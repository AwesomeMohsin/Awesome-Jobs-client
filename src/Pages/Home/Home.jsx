import { useEffect, useState } from "react";


import Banner from "./Banner";
import { useQuery } from "@tanstack/react-query";
import client from "../../api";
import JobsByCategory from "../Services/GlobalServices/JobsByCategory";
import Jobs from "../Services/GlobalServices/Jobs";
import { Spinner } from "@material-tailwind/react";
import OurJobProcess from "./OurJobProcess";
import AchiveSuccess from "./AchiveSuccess";

const Home = () => {
    const [categoryString, setCategoryString] = useState('alljob')

    const fetch = () =>
        categoryString === 'alljob'
            ? client.get("/jobs").then(({ data }) => data.result)
            : client.get(`/jobs?type=${categoryString}`).then(({ data }) => data.result);


    const { data: jobs, isLoading, refetch } = useQuery({
        queryKey: [`jobs/${categoryString}`],
        queryFn: () => fetch(),
    });

   


    jobs?.map(job => <Jobs key={job._id} job={job}></Jobs>)

    useEffect(() => {

        document.title = 'Home | Awesome Jobs';

    }, [])


    // if (isLoading) {
    //     return <div className="flex items-end gap-8 justify-center py-40 xl:py-80">
    //     <Spinner className="h-8 w-8" />
    //     </div>
        
    // }
        

    return (
        <div>

            <Banner></Banner>
            <JobsByCategory
                setCategoryString={setCategoryString}
                jobs={jobs}
                isLoading={isLoading}
            ></JobsByCategory>


            <div className="py-20">

                <AchiveSuccess></AchiveSuccess>

            </div>

            <div className="py-20">

                <OurJobProcess></OurJobProcess>

            </div>




        </div>
    );
};

export default Home;