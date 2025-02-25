import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ReactPlayer from "react-player";

const VideoPlayer = ({ className = "" }) => {
    const { activeVideo } = useSelector((state) => state.summitVideoSlice, shallowEqual);

    const videoSrc = activeVideo?.attributes?.video?.data?.attributes?.url;
    const poster = activeVideo?.attributes?.thumbnail?.data?.attributes?.formats?.large?.url;

    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="h-[80vh] flex items-center justify-center w-full ">Loading...</div>;
    }

    return (
        <div className={`w-full relative border aspect-[16:9] rounded-xl overflow-hidden ${className} bg-black`}>
            <ReactPlayer
                url={videoSrc}
                controls
                playing={false}
                light={poster}
                width="100%"
                height="100%"
                playbackRate={1}
                config={{
                    file: {
                        attributes: {
                            controlsList: 'nodownload'
                        }
                    }
                }}
            />
        </div>
    );
}

export default VideoPlayer;