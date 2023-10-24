import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigation = useNavigate();
    const navigateToAnotherPage = () => {
        navigation('/create'); // Replace '/another-page' with the actual path
    };

    return (
        <div className="relative h-screen bg-gray-900">
            <div className="bg-blue-500 absolute top-[40%] rounded-full blur-[5rem] bg-blur-3xl w-[12rem] h-[12rem]"></div>
            <div className="bg-blue-600 absolute right-0 top-[20%] rounded-full blur-[8rem] bg-blur-3xl w-[18rem] h-[14rem]"></div>
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[45rem] mx-auto text-center flex flex-col items-center">
                <div>
                    <div className="p-1 w-[40rem] rounded-3xl border-[2px] border-white text-white flex items-center justify-center">
                        Learn more about the Platform here
                    </div>
                </div>
                <h1 className="text-white text-[3.35rem] font-bold leading-[3.8rem] mt-[1rem] gradient-text">
                    System Design Interviews <br />now more Easier
                </h1>
                <p className="text-[1.2rem] text-white mt-[2rem]">
                    An Intergrated platform to build your system designs in more advanced and efficient way.
                </p>
                <div className="bg-blue-500 w-[300px] flex items-center justify-center cursor-pointer text-white font-semibold p-3 mt-[2rem] rounded-lg" onClick={navigateToAnotherPage}>
                    Get Started
                </div>
            </div>
        </div>
    )
}

export default Home