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

]


export const genderData = [
    {
        id: 1,
        label: "Male",
        type: "male",
    },
    {
        id: 2,
        label: "FeMale",
        type: "female",
    },
    {
        id: 3,
        label: "Other",
        type: "other",
    }

]

export const professionData = [
    {
        id: 1,
        label: "Web Developer",
        type: "webDeveloper",
    },
    {
        id: 2,
        label: "React Developer",
        type: "reactDeveloper",
    },
    {
        id: 3,
        label: "Next.js Developer",
        type: "nextJsDeveloper",
    }

]