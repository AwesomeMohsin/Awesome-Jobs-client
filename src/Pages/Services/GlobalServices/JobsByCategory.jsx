import {
    Tabs,
    TabsHeader,
    Tab,
    Spinner,
} from "@material-tailwind/react";

import JobsCard from "./JobsCard";




// eslint-disable-next-line react/prop-types
const JobsByCategory = ({ setCategoryString, jobs, isLoading }) => {

    const data = [
        {
            label: "All",
            value: "alljob",

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
            label: "Part Time",
            value: "part_time",

        },
    ];

    console.log(jobs);



    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-6xl font-semibold font-fontTitle pb-4 py-32">Jobs by Category</h2>
                    <hr className="mx-auto w-2/5" />
                    <hr className="mx-auto w-2/5 pb-32" />

            
            <Tabs value="alljob">
                <TabsHeader className="w-11/12 mx-auto">
                    {data?.map(({ label, value }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => setCategoryString(value)}
                        >
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>
            {
                isLoading ?

                    <div className="flex items-end gap-8 justify-center py-40 xl:py-80"> <Spinner className="h-8 w-8" /></div>

                    :

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {
                            jobs.map(job => <JobsCard key={job._id}
                            job={job}
                            ></JobsCard>)
                       }
                    </div>
            }
        </div>
    );
};

export default JobsByCategory;