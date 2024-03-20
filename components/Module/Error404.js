import Image from 'next/image';
import React from 'react';
import YellowButton from './YellowButton/YellowButton';
const Error404 = () => {
    return (
        <div className='container-fluid p-5'>
            <div className='row justify-content-center'>
                <div className='col-lg-6 col-12'>
                    <Image
                        src={process.env.IMG + '/uploads/404_page_animation_example_14b85ed2c5.gif'}
                        width={300}
                        height={300}
                        alt='404 page'
                        style={{ maxWidth: '100%', height: 'auto', maxHeight: 'auto', width: '100%' }}
                    />
                </div>
                <div className='col-lg-12 col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <YellowButton linkAdd={'/'} isExternal={false} linktext={"GO TO HOMEPAGE"} />
                </div>
            </div>
        </div>
    )
}

export default Error404;