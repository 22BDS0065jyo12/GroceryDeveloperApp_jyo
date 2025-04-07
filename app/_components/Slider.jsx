import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/ui/carousel';
import Image from 'next/image';

function Slider({ sliderList = [] }) {
  if (!Array.isArray(sliderList)) {
    console.error("Error: sliderList is not an array", sliderList);
    return <p className="text-red-500">Error loading slider content.</p>;
  }

  return (
    <Carousel>
      <CarouselContent>
        {sliderList.length > 0 ? (
          sliderList.map((slider, index) => (
            <CarouselItem key={index}>
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + slider?.attributes?.image?.data?.[0]?.attributes?.url }
                alt="slider"
                width={500}
                height={300}
                className="w-full h-[200px] md:h-[800px] object-cover rounded-2xl"
              />
            </CarouselItem>
          ))
        ) : (
          <p className="text-gray-500 p-4">No slides available</p>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Slider;









































// import React from 'react'
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
// import Image from 'next/image'

// function Slider({sliderList}) {
//   return (
//     <Carousel>
//     <CarouselContent>
//       {sliderList.map((slider,index)=>(
//         <CarouselItem key={index}>
//           <Image src= {slider.attributes?.image?.data?.[0]?.attributes?.url}
//            alt='slider'
//            width={500} 
//            height={300} 
//            className='w-full'
//            />

         
//         </CarouselItem>
//       ))}
      
      
//     </CarouselContent>
//     <CarouselPrevious />
//     <CarouselNext />
//   </Carousel>
  
//   )
// }

// export default Slider


















