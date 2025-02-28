import { initializeRazorpay } from "./apiEndPoints";
import toast from "react-hot-toast";
import { postMethod } from "./apiServices";

const grantAccess = async ({orderId, userId, paymentId, signature, summitId, bearerToken}) => {
    const response = await postMethod("summit-payments/accessProvider",{
        "razorpay_order_id": `${orderId}`,
        "razorpay_payment_id": `${paymentId}`,
        "razorpay_signature": `${signature}`,
        "userId" : userId,
        "summitId" : summitId
    })
    return response;
}

export const handleRazorpay = async (router, orderData, userDetails, summitId, summitTitle, setIsLoading) => {
    const resRazerPayInit = await initializeRazorpay();
    if (!resRazerPayInit) {
        toast.error(t(`message.failedToInitializeRazorpay`));
        window.location.reload()
        return false;
    }
    var options = {
        key: process.env.RAZORPAY_KEY,
        amount: orderData?.amount,
        currency: process.env.CURRENCY || 'INR',
        name: userDetails?.fullName ? userDetails?.fullName : "",
        description: `THANK YOU!, You have now access to ${summitTitle} Summit Videos. Your order id is ${orderData?.orderId}`,
        image: `${process.env.IMGURL}/logo.png`,
        order_id: orderData?.id,
        handler: async (response) => {
            try {
                const data = await grantAccess({
                        orderId : orderData?.id, 
                        userId : userDetails.id, 
                        paymentId : response?.razorpay_payment_id,
                        signature : response?.razorpay_signature,
                        summitId, 
                        });
                if (data?.success) {
                    toast.success(data?.message + " " + `to ${summitTitle} Summit`);
                    setIsLoading(false);
                    router?.push("/summit/" + summitId)
                } else {
                    toast.error("Something went wrong!" + data?.message);
                    router?.push("/subscription/payment-failure")
                }
            } catch (error) {
                throw new Error(`Error in grantAccess ${error.message}`);
            }
        },
        prefill: {
            name: userDetails?.fullName ? userDetails?.fullName : "",
            email: userDetails?.email ? userDetails?.email : "",
            contact: userDetails?.mobile ? userDetails?.mobile : "",
        },
        theme: {
            "color": "#3399cc"
        }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}
