import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { wrapper } from "@/store";
import { getSummitList } from "@/store/slices/summitSlice";
import moment from "moment";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { setShowForm } from "@/store/slices/authSlice";
import { handleRazorpay } from "@/utils/razorpay";
import { createOrder, getUserPaymentInfo } from "@/store/slices/summit-payment-slice";
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
import Link from "next/link";
import { LockIcon, LockKeyhole, X } from "lucide-react";
import LoderModule from "@/components/Module/LoaderModule";


const Details = ({ summit, close, register, hasPurchased }) => {
   return (
       <div className="fixed inset-0 overflow-y-auto  w-full h-full  bg-gray-900 bg-opacity-50 z-[99999] p-4 md:p-16 md:px-32">
           <div className="bg-white m-auto w-full lg:h-full rounded-lg overflow-y-auto shadow-lg p-2 sm:p-4 border-double border-2 border-blue-300 flex flex-col lg:flex-row gap-2">
               <div className="w-full lg:w-9/12 relative aspect-[16/9] border rounded-md h-full overflow-hidden">
                   <Image
                       src={summit?.attributes?.detailposter?.data.attributes?.formats?.large?.url}
                       alt={summit?.attributes?.title}
                       fill
                       style={{ objectFit: "contain" }}
                   />
               </div>
               <div className="w-full lg:w-4/12 bg-blue-50 rounded-md p-4 space-y-4 h-auto md:h-full">
                   <h5 className="text-xs sm:text-sm text-neutral-700">Register this Summit to access all recordings.</h5>
                   <h2 className="text-lg sm:text-2xl md:text-4xl">{summit?.attributes?.title}</h2>
                   <p className="font-normal text-xs sm:text-sm">{summit?.attributes?.description}</p>
                   <div className="border-t border-dashed border-neutral-500 w-full" />
                   <div className="flex items-center justify-between">
                       <h6>Date</h6>
                       <p className="font-normal text-sm">{moment(summit?.attributes?.organized_on).format('DD MMM YYYY')}</p>
                   </div>
                   <div className="flex items-center justify-between">
                       <h6>Amount</h6>
                       <h6>₹ <span className="font-semibold text-lg">{summit?.attributes?.price} </span>/-</h6>
                   </div>
                   <div className="border-t border-dashed border-neutral-500 w-full" />
                   {hasPurchased ? (
                       <Link href={`summit/${summit?.id}`} className="bg-gray-200 text-gray-600 border-2 border-gray-400 no-underline text-nowrap shadow-md font-medium w-48 flex items-center justify-center py-2 rounded ml-auto">Watch Now</Link>
                   ) : (
                       <button onClick={() => register(String(summit?.id), summit?.attributes?.price, summit?.attributes?.title)} className="bg-gradient-to-b from-green-50 to-blue-50 border-2 border-blue-400 text-nowrap text-blue-900 shadow-md hover:scale-105 transition-all duration-300 font-medium w-48 py-2 rounded flex items-center justify-center ml-auto"><LockKeyhole size={24} color="#0d6efd" /> &nbsp;&nbsp; Register Now</button>
                   )}
               </div>
           </div>
           <button onClick={() => close(false)} className="absolute top-5 right-5 bg-white rounded-full z-50 p-2 shadow-md hover:scale-95"><X size={18} /></button>
       </div>
   );
};






export default function Summit(props){
    const { t } = useTranslation("common");
    const {bearerToken} = props;
    const router = useRouter();
    router.locale = props?.language?props?.language: "en";
    router.defaultLocale = "en";
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const { userDetails,} = useSelector((state) => ({
            userDetails: state?.authSlice?.userDetails,
        }), shallowEqual);
        
    useEffect(() => {
        if (userDetails) {
            dispatch(getSummitList());
            dispatch(getUserPaymentInfo({
                userId : userDetails?.id
            }))
        }
    }, [dispatch, userDetails]);

    const { loader, error, summitList, hasAccess } = useSelector((state) => ({
        loader: state?.summitSlice?.loader,
        error: state?.summitSlice?.error,
        summitList: state?.summitSlice?.summitList,
        hasAccess : state?.summitPaymentSlice.data || {}
    }), shallowEqual);    

    if(loader) return <div>Loading...</div>
    if(error) return <div>Error... {error.message}</div>
    const hasAccessArray = Array.isArray(hasAccess) ? hasAccess : [];

    const handleClick= async (summitId, price = 0, summitTitle)=>{
        try{

            if(Object?.keys(userDetails).length === 0){
                dispatch(setShowForm(true))
                throw new Error("Please login to access this summit?.")
            };
            // check Already purchased or not!
            if(hasAccessArray.some(paidSummit => paidSummit?.summit && String(paidSummit?.summit?.id) === summitId)) throw new Error("You have already purchased this summit?.") 
            setIsLoading(true);
            // from razorpay
            const data = {
                amount : price,
                currency : "INR",
                receipt : 'summit-payment'
            }
            const orderData = await createOrder(data);

            if(!orderData.success) return toast?.error("Failed to create order. Please try again later.")
            
            await handleRazorpay(router, orderData.data, userDetails,summitId, summitTitle, bearerToken, setIsLoading);

        }catch(err){
         console.log(err);
            toast?.error(`${err.message}`)
        }
    }
    return (
        <div className="font-bold max-w-7xl mx-auto px-4 pb-4">
         
            {isLoading && <LoderModule isAbsolute={true} className="bg-neutral-900 bg-opacity-50"/>}
            <div className="w-full rounded-lg shadow-sm bg-gradient-to-b from-green-100 to-blue-100 flex flex-col items-start justify-center p-4 my-8">
                {userDetails?.fullName && <div className="text-xl font-medium">Hello <span className="font-bold text-blue-900">{userDetails?.fullName}</span>,</div>}
                {summitList?.length > 0 ? (
                    <div className="text-xl font-medium">Welcome to {summitList[0].attributes?.title}</div>
                ) : (
                    <div className="text-xl font-medium">No summits available</div>
                )}
            </div>
        
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
              {summitList?.length > 0 && summitList?.map((summit, index) => {
                const expiryDate = summit?.attributes?.organized_on ? moment(summit?.attributes?.organized_on).add(1, 'year').toDate() : moment(summit?.attributes?.createdAt).add(1, 'year').toDate(); // 1 year
                const currentDate = new Date();
                const daysLeft = expiryDate ? Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24)) : null;
                const hasPurchased = hasAccessArray.some(paidSummit => paidSummit?.summit && String(paidSummit?.summit?.id) === String(summit?.id)) 
                console.log(hasAccessArray)
                
                return(
                  <div key={index} className="border-2 border-blue-100 shadow-sm shadow-blue-500 bg-white rounded-2xl m-auto flex-grow w-full h-full">
                      {showDetails && <Details summit={summit} close={setShowDetails} register={handleClick} hasPurchased={hasPurchased}/> }
                      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-sm shadow-blue-200">
                          <Image
                              src={summit?.attributes?.thumbnail?.data?.attributes?.formats?.medium?.url}
                              alt={summit?.attributes?.title}
                              fill
                              style={{ objectFit: "cover" }}
                          />
                      </div>
                      <div className="flex items-center justify-between p-4 pb-0 text-xs font-medium">
                       <p>Available for 1 year. </p> 
                       <p> <span className="border bg-blue-200 px-1 rounded-3xl">{daysLeft} </span> days left </p> 
                      </div>
                      <div className="px-4 w-full">
                        <h6 className="text-lg font-bold">{summit?.attributes?.title}</h6>
                        <p className="text-sm font-normal flex-grow">{summit?.attributes?.description?.substring(0, 160)}...</p>
                      </div>
                      <div className="px-4 mt-auto text-base font-medium flex items-baseline justify-between pb-2">
                        <p className="text-xs font-normal">Held on : <span className="font-medium">{moment(summit?.attributes?.organized_on).format('DD MMM YYYY')}</span></p>
                
                        <button onClick={()=>setShowDetails(true)} className="bg-gradient-to-b from-green-50 to-blue-50 border-2 border-blue-400  text-nowrap text-blue-900 shadow-md hover:scale-105 transition-all duration-300 font-medium w-48 py-2 rounded flex items-center justify-center">See Details</button>
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
    let userActive = fetchCookie("_jwt", req.headers);
    setAuthorizationToken(userActive);
    let fileList = getFileLangList();
    secureHeader(req, res, locale);
    return {
        props: {
            data: "",
            language: locale,
            bearerToken : userActive,
            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});