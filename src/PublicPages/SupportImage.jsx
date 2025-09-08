import React from 'react'
import image from '../assets/support_image.avif'

function SupportImage() {
  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12">
                <img src={image} className='img-fluid' width={"100%"} height={"100%"} alt="" />
            </div>
        </div>
    </div>
  )
}

export default SupportImage