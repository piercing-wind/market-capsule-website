import { FacebookIcon } from "@/components/svg/FacebookIcon";
import { GoogleIcon } from "@/components/svg/GoogleIcon";
import { LinkedinIcon } from "@/components/svg/LinkedinIcon";

export const continueFromSocial = [
    {
        id: 1,
        icon: <GoogleIcon />,
        label: "loginAndSignupModal.continueWithGoogle",
        socialType: "googleType"
    },
    {
        id: 2,
        icon: <FacebookIcon />,
        label: "loginAndSignupModal.continueWithFacebook",
        socialType: "facebookType"
    },
    {
        id: 3,
        icon: <LinkedinIcon />,
        label: "loginAndSignupModal.continueWithLinkedin",
        socialType: "linkedinType"
    }
]