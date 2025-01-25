import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { wrapper } from "@/store";
import { getSummitList } from "@/store/slices/summitSlice";
import moment from "moment";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { setShowForm } from "@/store/slices/authSlice";

export default function Summit(props){
    const { t } = useTranslation("common");
    const router = useRouter();
    router.locale = props?.language?props?.language: "en";
    router.defaultLocale = "en";
    const dispatch = useDispatch();
    
    const { userDetails } = useSelector((state) => ({
            userDetails: state?.authSlice?.userDetails
        }), shallowEqual);

    useEffect(() => {
        if (userDetails) {
            dispatch(getSummitList());
        }
    }, [dispatch, userDetails]);
    
    const { loader, error, summitList } = useSelector((state) => ({
        loader: state?.summitSlice?.loader,
        error: state?.summitSlice?.error,
        summitList: state?.summitSlice?.summitList
    }), shallowEqual);    

    if(loader) return <div>Loading...</div>
    if(error) return <div>Error... {error.message}</div>


    const handleClick=(summitId)=>{
        if(Object.keys(userDetails).length === 0){
            toast.error("You are not logged in! Please login to access the summit.")
            dispatch(setShowForm(true))
            return;
        };
        const userSummitAccess = userDetails.summits || [];
        const listofsummitaccess = userSummitAccess.map((summit)=> String(summit.id))

        if(userSummitAccess.length == 0 || !listofsummitaccess.includes(summitId)){
            toast.error("You do not have access to this summit! Please contact support@marketcapsule.in for access.")
            return;
        }else{
            router.push(`/summit/${summitId}`)
        }
    }
    return (
        <div className="font-bold max-w-7xl mx-auto px-4 pb-4">

            <div className="w-full rounded-lg shadow-sm bg-gradient-to-b from-green-100 to-blue-100 flex flex-col items-start justify-center p-4 my-8">
                {userDetails.fullName && <div className="text-xl font-medium">Hello <span className="font-bold text-blue-900">{userDetails.fullName}</span>,</div>}
                {summitList.length > 0 ? (
                    <div className="text-xl font-medium">Welcome to {summitList[0].attributes.title}</div>
                ) : (
                    <div className="text-xl font-medium">No summits available</div>
                )}
            </div>
        
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
              {summitList.length > 0 && summitList.map((summit, index) => {
                const expiryDate = summit.attributes.organized_on ? moment(summit.attributes.organized_on).add(1, 'year').toDate() : moment(summit.attributes.createdAt).add(1, 'year').toDate(); // 1 year
                const currentDate = new Date();
                const daysLeft = expiryDate ? Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24)) : null;
                 return(
                    <div key={index} className="border-2 border-blue-100 shadow-sm shadow-blue-500 bg-white rounded-2xl m-auto flex-grow w-full h-full">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-sm shadow-blue-200">
                          <Image
                              src={summit.attributes.thumbnail.data.attributes.formats.medium.url}
                              alt={summit.attributes.title}
                              fill
                              style={{ objectFit: "cover" }}
                          />
                      </div>
                      <div className="flex items-center justify-between p-4 pb-0 text-xs font-medium">
                       <p>Available for 1 year. </p> 
                       <p> <span className="border bg-blue-200 px-1 rounded-3xl">{daysLeft} </span> days left </p> 
                      </div>
                      <div className="px-4 w-full">
                        <h6 className="text-lg font-bold">{summit.attributes.title}</h6>
                        <p className="text-sm font-normal flex-grow">{summit.attributes.description?.substring(0, 160)}...</p>
                      </div>
                      <div className="px-4 mt-auto text-base font-medium flex items-baseline justify-between pb-2">
                        <p className="text-xs sm:text-base font-normal">Held on : <span className="text-xs sm:text-sm font-medium">{moment(summit.attributes.organized_on).format('DD MMM YYYY')}</span></p>
                        <button onClick={()=>handleClick(String(summit.id))} className="bg-gradient-to-b from-green-50 to-blue-50 border-2 border-blue-400  text-nowrap text-blue-900 shadow-md hover:scale-105 transition-all duration-300 font-medium px-8 sm:px-12 py-2 rounded">Watch Now</button>
                      </div>
                  </div>
                  )
                })
              }
           </div>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale }) => {
    
    let fileList = getFileLangList();
    secureHeader(req, res, locale);
    return {
        props: {
            data: "",
            language: locale,
            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
