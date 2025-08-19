import React, { useContext, useRef, useState } from 'react';
import { FaImages } from 'react-icons/fa';
import Card from '../components/Card';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/authBg.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.jpeg';
import image7 from '../assets/image7.jpeg';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'

const Customize = () => {
  const { serverUrl, userData, setUserData, frontendImage, setFrontendImage, backendImage, setBackendImage, selectedImage, setSelectedImage } = useContext(userDataContext)
  const inputImage = useRef();
  const navigate = useNavigate(

  )

  const handleGalleryClick = () => {
    if (inputImage.current) {
      inputImage.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFrontendImage(imageUrl); // store selected image preview
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col justify-center items-center py-10 px-4">

      {/* Back arrow */}
      <button
        className="absolute top-6 left-6 cursor-pointer text-white hover:text-pink-400 transition"
        onClick={() => navigate('/')}
      >
        <FaArrowLeft size={28} />
      </button>

      {/* Title */}
      <h1 className="text-white text-3xl sm:text-3xl font-bold mb-8 -mt-5 text-center">
        Select your <span className='text-pink-400'>Assistant Image</span>
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
        {/* First Row - 4 Cards */}
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />

        {/* Second Row - 3 Cards */}
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* Upload Card — show preview if selected */}
        <div
          onClick={() => {
            handleGalleryClick();
            setSelectedImage("input");
          }}

          className={`w-[150px] h-[250px] sm:w-[160px] sm:h-[240px] bg-[#030326] border-2 border-[#8000ff61] rounded-2xl 
                     overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer 
                     hover:border-white transform transition-transform duration-500 ease-in-out hover:scale-110
                     flex justify-center items-center ${selectedImage == "input" ? "border-4 border-white shadow-2xl shadow-blue-950" : null}`}
        >
          {frontendImage ? (
            <img
              src={frontendImage}
              alt="Selected Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaImages className="text-white text-4xl opacity-70 hover:opacity-100 transition" />
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={inputImage}
        onChange={handleFileChange}
        className="hidden"
      />

      {selectedImage && <button
        className="bg-amber-500 p-2 px-5 mt-8 text-lg cursor-pointer hover:bg-blue-600 hover:text-white rounded-lg text-black"
        onClick={() => navigate("/customize2")}
      >
        Next
      </button>}

    </div>
  );
};

export default Customize;
