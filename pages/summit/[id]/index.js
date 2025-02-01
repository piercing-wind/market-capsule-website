import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { wrapper } from "@/store";
import { getFetchAuth } from "@/store/slices/authSlice";
import { getSummitVideos, setActiveVideo } from "@/store/slices/summitVideoSlice";
import { setAuthorizationToken } from "@/utils/apiServices";
import { fetchCookie } from "@/utils/storageService";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getSummitById } from "@/store/slices/summitSlice";
import { useEffect, useState } from "react";
import { File,Download, ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import Link from "next/link";
import VideoList from "@/components/Module/Summit/videoList";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUserPaymentInfo } from "@/store/slices/summit-payment-slice";
import moment from "moment";

const VideoPlayer = dynamic(() => import("@/components/Module/Summit/video"))

export default function SummitVideos(props) {
    const { params } = props;
    
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.authSlice, shallowEqual);
    const { videos } = useSelector((state) => ({
           videos: state?.summitVideoSlice.summitVideosData || [],
         }), shallowEqual)
  

    useEffect(() => {
        const fetchSummitVideos = async () => {
            dispatch(getSummitVideos(params));
            dispatch(getSummitById(params.slug));
        };
        if(userDetails){
            fetchSummitVideos();
        }
    }, [dispatch, params, userDetails]);

    const { activeVideo } = useSelector((state) => state.summitVideoSlice, shallowEqual);
    const {summit} = useSelector((state) => state.summitSlice, shallowEqual);
    const activeVideoDocument = activeVideo.attributes?.document?.data || []; 

    const [activeTab, setActiveTab] = useState("about");
    const { t } = useTranslation("common");
    
    const handlePrev = (order) => {
        if (order > 1) {
          const activeVideo = videos.find(video => video.attributes.order === order - 1);
          dispatch(setActiveVideo(activeVideo));
        }
      }
      const handleNext = (order) => {
        if (order < videos.length) {
          const activeVideo = videos.find(video => video.attributes.order === order + 1);
          dispatch(setActiveVideo(activeVideo));
        }
      }
    const router = useRouter();
    router.locale = props?.language ? props?.language : "en";
    router.defaultLocale = "en";

    return (
        <div className="w-full p-4 relative flex flex-col lg:flex-row items-start justify-center gap-4 mx-auto">
          {videos.length === 0 && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full z-50 flex flex-col items-center justify-center bg-white">
              <h5>Thank you for registering</h5>
              <p>All the recordings for the summit {summit?.attributes?.title} will be available here after {moment(summit?.attributes?.organized_on).format('DD MMM YYYY')}.</p>
            </div>
          )}
          <div className="max-w-5xl 2xl:max-w-full overflow-y-auto w-full top-24">
            <VideoPlayer className="h-56 sm:h-[70vh] xl:h-[80vh] 3xl:h-screen"/>
            <div className="flex items-center justify-between border-b border-neutral-400 sm:px-4 py-2 my-2">
              <button onClick={() => handlePrev(activeVideo.attributes.order)} className="border-2 border-transparent hover:border-neutral-600 flex items-center gap-2 rounded-full p-1">
                <ArrowBigLeftDash color="#3e63ff" size={32}/>Prev
              </button>
              <p className="font-medium m-0"> {activeVideo?.attributes?.order} / {videos.length} sessions</p>
              <button onClick={() => handleNext(activeVideo.attributes.order)} className="border-2 border-transparent hover:border-neutral-600 flex items-center gap-2 rounded-full p-1">
                Next <ArrowBigRightDash color="#3e63ff" size={32}/>
              </button>
            </div>
            <div className="flex items-center w-full my-2 gap-8 font-semibold uppercase mb-4">
                <button
                    onClick={() => setActiveTab('about')}
                    className={`uppercase pb-2 px-4 ${activeTab === 'about' ? 'border-b-2 border-blue-500' : ''}`}
                >
                    About
                </button>
                <button
                    onClick={() => setActiveTab('documents')}
                    className={`uppercase pb-2 px-4 ${activeTab === 'documents' ? 'border-b-2 border-blue-500' : ''}`}
                >
                    Documents
                </button>
            </div>
            {activeTab === 'about' && (
                <div className="w-full">
                    <h2 className="text-xl font-semibold">{activeVideo?.attributes?.title}</h2>
                    <h2 className="text-sm mt-2">{activeVideo?.attributes?.description}</h2>
                </div>
            )}

            <div className="flex flex-wrap gap-4 w-full">
               {activeTab === 'documents' && (
                 activeVideoDocument.length > 0  ? (
                   activeVideoDocument.map((document, index) => (
                    <Link href={document.attributes.url} key={index} target="_blank" className="no-underline text-neutral-900" download passHref>
                       <div className="border border-neutral-800 flex items-center justify-between font-semibold rounded-md p-2 text-xs w-48 hover:bg-blue-100 transition-all duration-300">
                           <File size={20} color="#3b82f6 "/> <p className="m-0">{document.attributes.name.substring(0, 20)}</p> <Download size={20}/>
                       </div>
                    </Link>
                   ))
                 ) : (
                   <p> No Documents for this session.</p>
                )  
               )}
            </div>
           </div>
           <VideoList 
                title={summit?.attributes?.title}
                description={summit?.attributes?.description}
                className="sticky top-28 h-[80vh] 3xl:h-screen overflow-hidden"
            />
        </div>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale, query }) => {
    let userActive = fetchCookie("_jwt", req.headers);
    setAuthorizationToken(userActive);
    const slug = query?.id;
    await store.dispatch(getFetchAuth());
    const { authSlice: { userDetails } } = store.getState();
 
    await store.dispatch(getUserPaymentInfo({userId : userDetails.id}))
    
    const { summitPaymentSlice } = store.getState();
    const hasAccessList = Array.isArray(summitPaymentSlice.data) ? summitPaymentSlice.data : [];
    const hasAccess = hasAccessList.some(paidSummit => String(paidSummit.summit.id) === slug);
    if(!hasAccess) {
        return {
            redirect: {
                destination: '/summit',
                permanent: false,
            },
        }
    }

    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            language: locale,
            params : {slug},
            ...(await serverSideTranslations(locale, fileList)),
        },
    };
});