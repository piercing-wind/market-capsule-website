import React from 'react';
import { Rings } from 'react-loader-spinner';

const LoderModule = ({ isAbsolute, isRound, className="" }) => {

    return (
        <div style={{ borderRadius: isRound ? '100%' : '0px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: isAbsolute ? 'absolute' : 'fixed', width: '100%', height: '100%', left: '0px', top: '0px', zIndex: '9999999999999999' }} className={className}>
            <Rings
                height="100"
                width="100"
                color="#FFCB05"
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
            />
        </div>
    )

}
export default LoderModule;