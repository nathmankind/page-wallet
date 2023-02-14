import { type } from 'os';
import React,  { Children, FunctionComponent, useRef } from 'react'
import useOnClickOutside from '../../hooks/useClickOutside';
import { Button } from '../Button/Button';
import { TextInput } from '../FormInputs/TextInput';


interface FilterITF {
    onClear ?: () => void;
    onFilter?: () => void;
    open?: boolean;
    onClose?: () => void;
    type?: "consultants" | "transactions" | "agents" | "settlement"

}

const Filter:FunctionComponent<FilterITF> = ({
    onFilter= () => {},
    onClear= () => {}, 
    open, 
    onClose = () => {},
    type = 'transactions'}) => {
    const FilterRef = useRef<any>()


    useOnClickOutside(FilterRef, () => {
        onClose()
    })

  return (
    	<>
		{open && (
			<div className="modal-background fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-70 z-50">
			<div className="flex items-center justify-around min-w-44 h-screen">
				<div
					ref={FilterRef}
					className="modal items-center align-middle py-2 px-2 w-10/12  bg-white rounded"
				>
					<div className="modal-head flex justify-between items-center px-4 pt-3 ">
                    <h4>Filter</h4>
						<a
							onClick={onClose}
							href="#"
							role="button"
							className="focus:outline-none text-black ml-auto focus:ring-0  focus:ring-opacity-75"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</a>
					</div>
					<div className="modal-body p-5 w-full ">
                        <div className=' border-b-[0.5px] mb-4' />

                        <div className='w-full flex flex-wrap my-5 gap-y-8 gap-3'>
                            {type === "transactions" && (
                            <>
                                <div className='w-[240px]'>
                                    <label className='mb-3 py-1'>Region</label>
                                    <input placeholder='E.g. South West'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                </div>
                                <div className='w-[240px]'>
                                    <label className='mb-3 py-1'>Status</label>
                                    <input placeholder='E.g. Successful, Failed'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                </div>
                                <div className='w-[240px]'>
                                    <label className='mb-3 py-1'>Transaction ID</label>
                                    <input placeholder='E.g. Balanced, Deficit'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                </div>
                                <div className='w-[240px]'>
                                    <label className='mb-3 py-1'>Amount</label>
                                    <input placeholder='Eg. ₦4,000.00'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                </div>
                                <div className='w-[240px]'>
                                    <label className='mb-3 py-1'>Start Date</label>
                                    <input placeholder='E.g. Withdrawal, Transfer'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                </div>
                                <div className='w-[240px]'>
                                    <label className='mb-3 py-1'>End Date</label>
                                    <input placeholder='E.g. Withdrawal, Transfer'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                </div>
                            </>
                           )}

                            {type === "settlement" && (
                            <>
                            
                                <div className='w-[240px]'>
                                    <label className='mb-3 py-1'>Amount</label>
                                    <input placeholder='Eg. ₦4,000.00'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                </div>
                                <div className='w-[240px]'>
                                    <label className='mb-3 py-1'>Start Date</label>
                                    <input placeholder='E.g. Withdrawal, Transfer'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                </div>
                                <div className='w-[240px]'>
                                    <label className='mb-3 py-1'>End Date</label>
                                    <input placeholder='E.g. Withdrawal, Transfer'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                </div>
                            </>
                           )}

                           {type === "agents" &&(
                                <>
                                   <div className='w-[240px]'>
                                        <label className='mb-3 py-1'>Region</label>
                                        <input placeholder='E.g. South West'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                    </div>
                                    <div className='w-[240px]'>
                                        <label className='mb-3 py-1'>Agent ID</label>
                                        <input placeholder='E.g. TT2022CJ'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                    </div>
                                    <div className='w-[240px]'>
                                        <label className='mb-3 py-1'>Phone Number</label>
                                        <input placeholder='E.g. 09063332587'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                    </div>

                                </>
                           )}
                           {type === "consultants" &&(
                                <>
                                    <div className='w-[240px]'>
                                        <label className='mb-3 py-1'>Region</label>
                                        <input placeholder='E.g. South West'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                    </div>
                                    <div className='w-[240px]'>
                                        <label className='mb-3 py-1'>Customer ID</label>
                                        <input placeholder='E.g. TT2022CJ'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                    </div>
                                    <div className='w-[240px]'>
                                        <label className='mb-3 py-1'>Phone Number</label>
                                        <input placeholder='E.g. 09063332587'  className='h-12 mt-2 border inline-block bg-gray-100 focus:outline-none placeholder-gray-300 w-full rounded font-normal text-sm text-gray-700 py-1 px-3' />
                                    </div>

                                </>
                           )}
                          

                        </div>
                        

                       
                        <div className='ml-auto flex items-center gap-2'>
                           <Button label="Filter" />
                           <button className='border-gray-400 border px-3 h-10 flex focus:outline-none justify-start my-auto rounded  items-center default-button text-center'>
                            Clear
                           </button>

                        </div>

                    </div>
				</div>
			</div>
		</div>
		)}
		</>
  )
}

export default Filter