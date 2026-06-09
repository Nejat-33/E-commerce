import { faCreditCard, faStar, faUser } from "@fortawesome/free-solid-svg-icons"
import { faTruckFast } from "@fortawesome/free-solid-svg-icons/faTruckFast"
import { faTruckPlane } from "@fortawesome/free-solid-svg-icons/faTruckPlane"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Userorder() {
    return (
        <div className="flex flex-1 flex-col gap-7 ">
            <span className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faUser} className="bg-gray-200 px-2 py-3 rounded-full text-lg" />
                <span className="font-bold">Username</span>
            </span>
            <div className="space-y-9 px-4 py-4 rounded-2xl bg-white">
                <span className="inline-block text-lg font-bold">My Order</span>

                <div className="grid grid-cols-4 gap-5 w-full text-sm ">
                    <div className="flex gap-4">
                        <span className="px-4 py-3 bg-orange-100 rounded-lg">
                            <FontAwesomeIcon icon={faCreditCard} className="text-3xl text-orange-500" />
                        </span>
                        <span className="flex flex-col gap-1">
                            UnPaid
                            <span className="text-lg font-bold">0</span>
                        </span>
                    </div>

                    <div className="flex gap-4">
                        <span className="bg-blue-100 px-4 py-3 rounded-lg">
                            <FontAwesomeIcon icon={faTruckPlane} className="text-3xl text-blue-500" />
                        </span>
                        <span className="flex flex-col gap-1">
                            To Ship
                            <span className="text-lg font-bold">2</span>
                        </span>
                    </div>

                    <div className="flex gap-4">
                        <span className="bg-green-100 px-4 py-3 rounded-lg">
                            <FontAwesomeIcon icon={faTruckFast} className="text-3xl text-green-500" />
                        </span>

                        <span className="flex flex-col gap-1">
                            Shipped
                            <span className="text-lg font-bold">4</span>
                        </span>
                    </div>

                    <div className="flex gap-4">
                        <span className="bg-purple-100 px-4 py-3 rounded-lg">
                            <FontAwesomeIcon icon={faStar} className="text-3xl text-purple-500" />
                        </span>
                        <span className="flex flex-col gap-1">
                            To Review
                            <span className="text-lg font-bold">3</span>
                        </span>
                    </div>
                </div>

                <div className="px-4 py-3 bg-gray-100 space-y-5 rounded-2xl">
                    <p className="font-bold text-xs"> Awaiting delivery</p>
                    <div className="h-[1px] bg-gray-300"></div>
                    <div>
                        <p className="text-xs text-green-500">Order Id: 01234</p>
                        <div className="flex gap-3 items-center justify-between">
                            <div className="flex gap-5">
                                <span className="bg-white w-20 h-5rounded-xl p-3 flex items-center rounded-2xl">
                                    <img src="" alt="" className="object-contain" />
                                </span>

                                <div className="space-y-1 text-gray-400 text-xs">
                                    <p>Title</p>
                                    <p>Quantity</p>
                                    <p>Price</p>
                                    <p>Shipping</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 text-sm">
                                <button className="py-2 px-10 cursor-pointer border border-gray-300 shadow-md rounded-2xl text-center  bg-orange-600 text-white">Confirm</button>
                                <button className="py-2 px-7 cursor-pointer border border-gray-300 shadow-md rounded-2xl bg-white/80 text-center">Track</button>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    )
}

export default Userorder
