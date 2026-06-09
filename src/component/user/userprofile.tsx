import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { faKey } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Camera, ChevronRight, Edit2 } from "lucide-react"
import { useState } from "react"


function Userprofile() {
    const [iseditclicked, setiseditcliced] = useState(false)

    const userdata = JSON.parse(localStorage.getItem('user') || '[]')
    console.log('user data', userdata);



    return (
        <div className="w-3/5 space-y-6">
            <div className="flex flex-col gap-6 rounded-2xl bg-white px-5 py-4">
                <p className="text-xl font-bold">Personal information</p>
                <div className="flex gap-10">
                    <span className="relative rounded-[50px] text-2xl w-22 h-22 bg-orange-600 flex items-center justify-center text-white">
                        JD
                        <span className="absolute bottom-0 right-0 bg-white text-black rounded-2xl shadow-md px-2 py-1"><Camera size={17} /></span>
                    </span>
                    <div className="flex flex-col gap-2 font-bold  capitalize">
                        <span >username</span>
                        <span className="text-xs text-gray-400">last update</span>
                        <button onClick={() => setiseditcliced(!iseditclicked)} className="flex items-center gap-2 text-blue-700">
                            <Edit2 size={13} />
                            Edit info
                        </button>
                    </div>
                </div>
                <div className="h-[1px] bg-gray-100 w-full"></div>

                {iseditclicked && (

                    <form className=" px-3 text-gray-400">
                        <div className="grid grid-cols-2 gap-8">

                            <div className="flex flex-col gap-2 text-sm">
                                <label className="text-xs">FULL NAME</label>
                                <input type="text" placeholder="Your Name" className="border border-gray-200 outline-none focus:border-indigo-500 rounded-lg px-5 bg-gray-100 py-2" />
                            </div>

                            <div className="flex  flex-col gap-2 text-sm">
                                <label className="text-xs">DISPLAY NAME</label>
                                <input type="text" placeholder="Your Display Name" className="border border-gray-200 outline-none focus:border-indigo-500  rounded-lg px-5 bg-gray-100 py-2" />
                            </div>

                            <div className="flex flex-col gap-2 text-sm">
                                <label className="text-xs">EMAIL ADDRESS</label>
                                <input type="email" placeholder="Your Email" className="border border-gray-200 outline-none focus:border-indigo-500 rounded-lg px-5 bg-gray-100 py-2" />
                            </div>

                            <div className="flex flex-col gap-2 text-sm">
                                <label className="text-xs">PHONE NUMBER</label>
                                <input type="tel" placeholder="Your phone number" className="border border-gray-200 outline-none focus:border-indigo-500 rounded-lg px-5 bg-gray-100 py-2" />
                            </div>
                        </div>

                        <button type="submit" className="ml-[73%] mt-4 bg-red-500 px-9 py-1.5 rounded-2xl text-white">Save Changes</button>
                    </form>

                )}

            </div>

            <div className="flex flex-col bg-white px-5 py-4 rounded-2xl gap-4">
                <p className="font-bold text-xl">Account Security</p>
                <div className="border border-gray-100 p-3 flex justify-between items-center px-3 rounded-xl gap-3">

                    <div className="flex items-center gap-3">
                        <span className="px-3 py-2 rounded-full bg-blue-100 text-blue-600 flex items-center">
                            <FontAwesomeIcon icon={faKey} />
                        </span>
                        <div className="space-y-1">
                            <p className="font-bold">Password</p>
                            <p className="text-gray-400 text-sm">Last changed 3 months ago</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                </div>

            </div>


            <div className="flex flex-col gap-5 bg-white px-5 py-4">
                <p className="font-bold text-xl">Linked Account</p>
                <p className="text-sm text-gray-400">Connect your social accounts to log in faster and share with friends.</p>
                <div className="flex border-b border-b-gray-100 justify-between py-5">
                    <span className="space-x-3 ">
                        <FontAwesomeIcon icon={faGoogle} className="text-2xl" />
                        <span>Google Account</span>
                    </span>
                    <button className="text-red-500">Disconnect</button>
                </div>
                <div className="flex justify-between">
                    <span className="space-x-3">
                        <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
                        <span>Facebook</span>
                    </span>
                    <button className="text-blue-500">Connect</button>
                </div>
            </div>

            <div className="rounded-2xl space-y-5 px-5 py-4">
                <button className="text-red-600 text-sm font-bold px-12 py-2 rounded-3xl  border border-red-600">Delete Accountt</button>
            </div>


        </div>
    )
}

export default Userprofile
