import Image from 'next/image';
import React, { useState } from 'react';
import Modal from './popup';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setActiveVideo } from '@/store/slices/summitVideoSlice';

function VideoList({title = "", description = "", className = "" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const  dispatch = useDispatch();

  const { videos, activeVideo } = useSelector((state) => ({
        videos: state?.summitVideoSlice.summitVideosData || [],
        activeVideo: state?.summitVideoSlice.activeVideo,
      }), shallowEqual)

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  
  const handleClick =(id)=>{
    const activeVideo = videos.find(video => video.id === id);
    dispatch(setActiveVideo(activeVideo));
  }

  return (
    <div className={`md:w-[28rem] border relative flex flex-col bg-white rounded-md ${className}`}>
      <div className="w-full border-b max-h-24 h-full p-2">
        <h2 className="text-lg mb-2">{title}</h2>
        <p className="m-0 text-xs">
          {`${description.substring(0, 120)}...`}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={handleToggleModal}
          >
            more...
          </span>
        </p>
      </div>
      <div className='p-2 w-full text-sm border-b'>{videos?.length} &nbsp; Sessions</div>
      <div className='h-full w-full overflow-y-scroll z-50'>
        {videos.map((video, index) => (
          <div key={index} onClick={()=>handleClick(video.id)} className={`flex items-center gap-4 p-2 border-b hover:bg-blue-100 transition-all duration-300 cursor-pointer ${activeVideo.id === video.id ? 'bg-blue-100' : ''}`}>
            <div className="w-24 aspect-[16/9] h-14 border relative rounded-md overflow-hidden">
              <Image
                src={video.attributes.thumbnail.data.attributes.formats.thumbnail.url}
                alt={video.attributes.title}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium">{video.attributes.title.substring(0, 50)}</h3>
              <span className="text-xs font-light">Video</span>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleToggleModal}
        title={title}
        description={description}
      />
    </div>
  );
}

export default VideoList;