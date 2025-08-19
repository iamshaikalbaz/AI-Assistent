import React, { useContext } from 'react';
import { userDataContext } from '../context/UserContext';

const Card = ({ image }) => {
  const {serverUrl,userData,setUserData,frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage,setSelectedImage} = useContext(userDataContext)
  return (
    <div
      className={`w-[150px] h-[250px] sm:w-[160px] sm:h-[240px] bg-[#030326] border-2 border-[#8000ff61] rounded-2xl overflow-hidden 
                 hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-2 hover:border-white
                 transform transition-transform duration-500 ease-in-out hover:scale-107 ${selectedImage==image?"border-4 border-white shadow-2xl shadow-blue-950":null}`}
            onClick={()=>{
              setSelectedImage(image)
              setBackendImage(null)
              setFrontendImage(null)
            }}
    >
      <img
        src={image}
        className="h-full w-full object-cover"
        alt="card"
      />
    </div>
  );
};

export default Card;
