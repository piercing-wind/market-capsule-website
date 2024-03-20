import dynamic from "next/dynamic";
import LoderModule from "@/components/Module/LoaderModule";
import React, { Suspense } from "react";
const Error404 = dynamic(() => import("@/components/Module/Error404"), { suspense: true, loading: () => <LoderModule /> });

const index = () => {
    return (
        <Suspense fallback={<LoderModule />}>
            <Error404 />
        </Suspense>
    )
}

export default index;


