import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";



const Blogs = () => {

    const [open, setOpen] = useState(1);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);



    useEffect(() => {
        document.title = 'Blogs | Awesome Jobs';
    }, [])

    return (
        <div className="md:container mx-auto py-20">
            <h2 className="text-center text-6xl font-semibold font-fontTitle pb-4 ">Blogs</h2>
            <hr className="mx-auto w-2/5" />
            <hr className="mx-auto w-2/5 pb-32" />

            <div className="w-11/12 mx-auto">
                <Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
                    <AccordionHeader
                        onClick={() => handleOpen(1)}
                        className={`border-b-0 transition-colors ${open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
                            }`}
                    >
                        What is an access token and refresh token? <br /> How do they work and where should we
                        store them on the client-side?
                    </AccordionHeader>
                    <AccordionBody className="pt-0 text-base font-normal">
                        An access token is a temporary key for a client to access secure resources on a server after user approval, while a refresh token is a long-lasting key for the client to obtain new access tokens without making the user log in again.
                        <br />
                        <br />

                        Access tokens are usually stored on the client side in a secure manner, such as in memory or a secure cookie for web applications. Refresh tokens should be stored securely on the client side, like in a protected storage or a well-secured server, because they have a longer validity and grant the ability to request new access tokens.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
                    <AccordionHeader
                        onClick={() => handleOpen(2)}
                        className={`border-b-0 transition-colors ${open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
                            }`}
                    >
                        What is express js? What is Nest JS?


                    </AccordionHeader>
                    <AccordionBody className="pt-0 text-base font-normal">
                        Express.js:
                        <br /> <br />
                        Purpose: Minimal and flexible web framework for Node.js. <br />
                        Features: Routing, middleware, HTTP utility methods. <br />
                        Use Cases: APIs, websites.

                        <br />
                        <br />

                        NestJS: <br /> <br />
                        Features: TypeScript, modular architecture, adaptable ecosystem. <br />
                        Use Cases: Scalable apps, enterprise solutions.

                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3} className="rounded-lg border border-blue-gray-100 px-4">
                    <AccordionHeader
                        onClick={() => handleOpen(3)}
                        className={`border-b-0 transition-colors ${open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
                            }`}
                    >
                        Explanation of my code
                    </AccordionHeader>
                    <AccordionBody className="pt-0 text-base font-normal">
                        useQuery: <br /> <br />
                        I am using the useQuery hook from a data retrieval library.
                        This hook retrieves data based on the  query key and query function provided. <br />
                        queryKey is an array used to identify a unique query.
                        It depends on the length of the search field.
                        If there is a search query, it will include the search term in the key. Otherwise, it will rollback all work. <br />
                        queryFn specifies the function to execute when the query is fired.
                        In my case, it calls the fetch function, which makes the API call and returns the data. When the state of the searchField  changes, the useQuery hook is automatically re-executed, fetching new data based on the updated search query.
                        <br />
                        <br />
                        State Management: <br /> <br />

                        I use the useState hook to create the state variable searchField and its corresponding update function setSearchField. <br />
                        This state variable will contain the value of the search field entry.
                        <br /><br />

                        Fetch Function: <br /> <br />

                        I have developed a fetch function that, in response to the value of the searchField, calls an API. <br />The search query is used to create a URL by searchField if it has length, which indicates that there is search input. If not, every job is retrieved.

                    </AccordionBody>
                </Accordion>
            </div>
        </div>
    );
};

export default Blogs;