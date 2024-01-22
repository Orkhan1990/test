import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import { CiLocationOn } from "react-icons/ci";
import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";



const Listing = () => {
  SwiperCore.use([Navigation]);
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const[showEmailMessage,setShowEmailMessage]=useState(false);
  const{id}=useParams();
  console.log(id);

  useEffect(()=>{
    const fetchData=async()=>{
          setLoading(true)
          try {
            const result=await fetch(`http://localhost:3007/api/v1/listing/getListing/${id}`);
          const resData=await result.json();
          if(resData.success==false){
            setError(resData.message);
            setLoading(false);
            return;
          }
          setData(resData);
          setLoading(false);  
          } catch (error) {
             setError(error.message);
             setLoading(false);
          }
          
    }
    fetchData();
  },[id])

  const contactLandlord=()=>{
    setShowEmailMessage(true)
  }
  return (
    <>
      {loading&&(<p className="text-2xl text-center my-16">Loading.....</p>)}
      {error&&(<p className=" text-2xl text-center my-16">Something went wrong!</p>)}
      {!loading&&!error&&data&&(
         <>
           <Swiper navigation>
            {
              data.imagesUrl.map((image,index)=>(
                <SwiperSlide key={index}>
                  <div className="h-[550px]" style={{background:`url(${image}) center no-repeat`,backgroundSize:"cover"}}></div>
                </SwiperSlide>
              ))
            }
            </Swiper>   
            <div className="max-w-5xl mx-auto">
                <h2 className="font-semibold">{data.name}-${data.regularPrice}/month</h2>
                 <div className="flex gap-1">
                 <CiLocationOn className="text-green-700" />
                 <p>{data.address}</p>
                 </div>
                 <div className="flex gap-1">
                  <button className="text-white bg-red-700 p-1 rounded-md">{data.type==="rent"?"For Rent":"For Sale"}</button>
                  {data.offer&&(<button className="text-white bg-green-700 p-1 rounded-md">{(+data.regularPrice)-(+data.discountPrice)}</button>)}
                 </div>
                 <p className="text-slate-800"><span className="font-semibold text-black">Description - {" "}</span>{data.description}</p>
                 <ul className="flex gap-6 items-center flex-wrap">
                  <li className="flex space-x-1 items-center whitespace-nowrap text-green-900 font-semibold text-sm">
                  <FaBed />
                   {data.bedrooms>1?`${data.bedrooms}beds`:`${data.bedrooms}bed`}
                  </li>

                  <li className="flex space-x-1 items-center whitespace-nowrap text-green-900 font-semibold text-sm">
                  <FaBath />
                   {data.bathrooms>1?`${data.bathrooms}baths`:`${data.bathrooms}bath`}
                  </li>

                  <li className="flex space-x-1 items-center whitespace-nowrap text-green-900 font-semibold text-sm">
                  <FaParking />
                   {data.parking?"Parking spot":"No Parking"}
                  </li>

                  <li className="flex space-x-1 items-center whitespace-nowrap text-green-900 font-semibold text-sm">
                  <FaChair />
                   {data.furnished>1?"Furnished":"Unfurnished"}
                  </li> 
                 </ul>
                 {showEmailMessage&&(
                  <form >
                    <p>Contact </p>
                  </form>
                 )}
                 {!showEmailMessage&&(<button onClick={contactLandlord} className="w-full bg-gray-700 text-white uppercase rounded-md">Contact Landlord</button>
)}
            </div>
         </>
      )}

   </>
  )
}

export default Listing