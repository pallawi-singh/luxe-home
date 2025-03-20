import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'


const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <p>You Can Also Downlaod Our App</p>
            <div className="app-download-plateform">
                <img src={assets.playstorebtn} alt="Google Play" />
                <img src={assets.applestorebtn} alt="Google Play" />
            </div>
        </div>
    )
}

export default AppDownload
