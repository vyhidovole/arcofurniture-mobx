import { useState, useEffect } from 'react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../Slider/sliderStiles.css'

import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




// External Data import
const url = 'http://localhost:3000/Products';
const CustomSlider2 = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/Products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div >
            {products.length > 0 ? (
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    slidesPerView={1}
                    spaceBetween={15}
                    navigation
                    breakpoints={{
                        480: { slidesPerView: 2 },
                        740: { slidesPerView: 3 },
                        1275: { slidesPerView: 4 },
                    }}
                    //  pagination={{ clickable: true }}
                    pagination={{
                        clickable: true, // Allows bullets to be clickable
                        dynamicBullets: true, // Makes bullets dynamic in size
                    }}
                >

                    {products.map((item) => (
                        <SwiperSlide key={item.id} className='bg-zinc-200 !flex justify-center items-center h-[800px]'>
                            <div className='border-2 border-blue-500 rounded-lg overflow-hidden w-[200px] h-[250px] flex flex-col items-center'>

                                <img src={item.imgSrc || '/path/to/default-image.jpg'} alt={item.name} />
                                <h2>{item.name}</h2>
                                <p>{item.category}</p>
                                <div className='inline-flex'>
                                    {Array.isArray(item.color) ? (
                                        item.color.map((color, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    backgroundColor: color,
                                                    borderRadius: '50%',
                                                    margin: '0 5px',
                                                }}
                                            ></div>
                                        ))
                                    ) : (
                                        <div
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: item.color,
                                                borderRadius: '50%',
                                            }}
                                        ></div>
                                    )}
                                </div>
                                <p>{item.price}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p>Загрузка продуктов...</p>
            )}
        </div>
    );
};

export default CustomSlider2;