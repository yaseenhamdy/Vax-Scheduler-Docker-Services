import React from 'react'
import errorIMG from '../../Images/error.svg'
export default function Error() {
    return (
        <>
            <div className='d-flex align-items-center justify-content-center vh-50'>
                <img src={errorIMG} alt="Error" />
            </div>
            <h1 className='text-center'>This Service Is Not Found </h1>

        </>
    )
}
