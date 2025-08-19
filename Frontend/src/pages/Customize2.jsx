import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const Customize2 = () => {
    const { userData, backendImage, selectedImage, setUserData, serverUrl } = useContext(userDataContext)
    const [assistantName, setAssistantName] = useState(userData?.AssistantName || "")
    const navigate = useNavigate()

    const handleUpdateAssistant = async () => {
        try {
            let formData = new FormData()
            formData.append("assistantName", assistantName)
            if (backendImage) {
                formData.append("assistantImage", backendImage)
            } else {
                formData.append("imageUrl", selectedImage)
            }
            const result = await axios.post(`${serverUrl}/api/user/update`, formData, { withCredentials: true });
            console.log(result.data)
            setUserData(result.data)
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col justify-center items-center py-10 px-4 relative">

            {/* Back arrow */}
            <button
                className="absolute top-6 left-6 cursor-pointer text-white hover:text-pink-400 transition"
                onClick={() => navigate('/customize')}
            >
                <FaArrowLeft size={28} />
            </button>

            <h1 className="text-white text-3xl sm:text-3xl font-bold mb-8 -mt-5 text-center">
                Enter your <span className='text-pink-400'>Assistant Name</span>
            </h1>
             {/* Responsive input */}
            <input
                type="text"
                placeholder="eg. sophia"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[25%] p-3 text-lg sm:text-xl rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
                onChange={(e) => setAssistantName(e.target.value)}
                value={assistantName}
            />
            {assistantName && <button
                className="bg-amber-500 p-2 px-5 mt-8 text-lg cursor-pointer hover:bg-blue-600 hover:text-white rounded-lg text-black"
                onClick={handleUpdateAssistant}
                
            >
                Create Your Assistant
            </button>}
        </div>
    )
}

export default Customize2
