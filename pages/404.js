import dynamic from "next/dynamic";
import React from "react";
const Market404 = dynamic(() => import('@/components/Module/ErrorPages/Market404'))

export default function Custom404(props) {

    return (
        <Market404 />
    );
}

