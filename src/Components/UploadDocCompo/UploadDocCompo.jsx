

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import { Skeleton } from '@mui/material';

import 'swiper/css';

function UploadDocCompo({ images }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (images.length > 0) {
            setTimeout(() => {
                setLoading(false);
            }, 1000); // Simulated loading time
        } else {
            setLoading(false); // Agar koi image nahi toh bhi loading ko false karna hoga
        }
    }, [images]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 border rounded-3 shadow-sm p-3">
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center my-5 w-100">
                            <Skeleton variant="rounded" width="100%" height={300} animation="wave" />
                        </div>
                    ) : (
                        <Swiper
                            modules={[Autoplay, A11y]}
                            spaceBetween={50}
                            slidesPerView={1}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            loop={true}
                            className="my-5"
                            style={{ height: "300px" }}
                        >
                            {images.length > 0 ? (
                                images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="slide-content text-center">
                                            <img
                                                src={img}
                                                className="img-fluid rounded-3 slider-img h-100"
                                                alt={`Slide ${index + 1}`}
                                                loading="lazy"
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <SwiperSlide>
                                    <div className="slide-content text-center d-flex align-items-center justify-content-center" style={{ height: "300px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
                                        <p className="text-muted">No images available</p>
                                    </div>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UploadDocCompo