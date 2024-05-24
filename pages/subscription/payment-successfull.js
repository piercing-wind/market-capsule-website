import PaymentSuccess from '@/components/Module/PaymentSuccess/PaymentSuccess'
import PaymentSuccessRight from '@/components/svg/PaymentSuccessRight';
import { getFileLangList } from '@/middleware/getProps';
import { secureHeader } from '@/middleware/securityHeader';
import { wrapper } from '@/store';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react'

const PayMentSuccessPage = (props) => {
    const { t } = useTranslation("common");
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";

    return (
        <div>
            <PaymentSuccess
                icon={<PaymentSuccessRight />}
                heading={`message.paymentSuccess`}
                description={`message.paymentDescription`}
            />
        </div>
    )
}

export default PayMentSuccessPage

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