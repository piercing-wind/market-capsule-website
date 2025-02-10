import React from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'

const BackButton = () => {
    return (
        <div className="d-lg-none d-block mt-4">
            <button onClick={() => window.history.back()} style={{ background: "transparent", border: "none", color: "black" }}>
                <MdKeyboardBackspace style={{ width: "28px", height: "28px" }} />
            </button>
        </div>
    )
}

export default BackButton