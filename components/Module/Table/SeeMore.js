import React, { useEffect, useState } from 'react';
import clsx from "clsx";
import styles from './style/seeMore.module.scss';
import { detectOS } from '@/utils/DetectOS';


const SeeMore = () => {
    const [catchOS, setCathedOs] = useState(false);

    useEffect(() => {
        setCathedOs(detectOS());
    }, [])
    return (
        <>
            {
                catchOS && (
                    <div className={clsx(styles.seeMore, "d-md-none d-block my-3 px-3")}>
                        <p>Scroll left to see more data {`>`}</p>
                    </div>

                )
            }

        </>
    )
}

export default SeeMore