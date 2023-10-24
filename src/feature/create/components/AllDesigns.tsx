import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';

const AllDesigns = () => {
    const [addNew, setAddNew] = useState(false);

    const handleBlurOverlayClick = (e: any) => {
        if (e.target === e.currentTarget) {
            setAddNew(false);
        }
    };

    return (
        <>
            <div className=''>
                <h1 className='text-2xl font-bold '>Your all System Designs</h1>
                <div className='grid grid-cols-4 mt-[4rem]'>
                    <div className='w-[12rem] h-[12rem]  bg-gray-200 flex items-center justify-center rounded-md cursor-pointer hover:bg-opacity-60' onClick={() => setAddNew(true)}>
                        <div className='w-[4rem] h-[4rem] bg-gray-400 rounded-full flex items-center justify-center'>
                            <BiPlus className="text-4xl" />
                        </div>
                    </div>
                </div>
            </div>
            {addNew && (
                <>
                    <div className='w-screen h-screen absolute bg-black top-0 right-0 bottom-0 left-0 bg-opacity-20 flex items-center justify-center' onClick={handleBlurOverlayClick}>
                        <div className='bg-gray-900 p-10 w-[30rem]'>
                            <p className='text-white'>Name of the File</p>
                            <input type="text" className='p-2 focus:outline-none w-full mt-[1rem]' />
                            <button className='p-2 bg-red-400 mt-[1rem] text-white font-bold'>
                                Create New
                            </button>
                        </div>

                    </div>


                </>
            )}
        </>
    );
};

export default AllDesigns;
