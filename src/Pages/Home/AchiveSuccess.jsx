import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
const AchiveSuccess = () => {
    return (
        <div className="max-w-7xl mx-auto w-11/12 lg:w-full pt-20">


            <Card className="w-full flex-col lg:flex-row gap-4">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 lg:w-2/5 shrink-0 rounded-r-none"
                >
                    <img
                        src="https://ocsolutions.co.in/html/jobportal/new/images/home/women.png"
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </CardHeader>

                <CardBody>
                    <Typography variant="h6" color="gray" className="mb-4 uppercase">
                        
                    </Typography>
                    <Typography variant="h3" color="blue-gray" className="mb-8">
                    Access a multitude of job listings and <br /> <span className="text-[#019AD6] text-5xl">Achieve Success</span>
                    </Typography>
                    <Typography color="gray" className="mb-8 font-normal">
                    Embark on Your Career Journey with Abundant Opportunities: Our platform provides you with a gateway to an extensive selection of job listings, each offering a unique path to success. Whether you're just starting or looking to advance your career, our diverse range of job openings empowers you to pave the way to your professional aspirations. Take the first step toward your dreams and explore countless opportunities for growth, development, and success.
                    </Typography>
                    <a href="#" className="inline-block">
                        <Button variant="text" className="flex items-center gap-2">
                            Learn More
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                            </svg>
                        </Button>
                    </a>
                </CardBody>
            </Card>
        </div>
    );
};

export default AchiveSuccess;