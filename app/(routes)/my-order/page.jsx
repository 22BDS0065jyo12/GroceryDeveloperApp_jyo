"use client"
import GlobalApi from '@/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from 'moment';
import MyOrderItem from './_components/MyOrderItem';

const MyOrder = () => {
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Safe access inside useEffect
    const jwtToken = sessionStorage.getItem('jwt');
    const userData = JSON.parse(sessionStorage.getItem('user'));

    if (!jwtToken) {
      router.replace('/');
      return;
    }

    setJwt(jwtToken);
    setUser(userData);

    getMyOrder(userData.id, jwtToken);
  }, []);

  const getMyOrder = async (userId, jwtToken) => {
    const orderList_ = await GlobalApi.getMyOrder(userId, jwtToken);
    console.log(orderList_);
    setOrderList(orderList_);
  };

  return (
    <div>
      <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>My Order</h2>
      <div className='py-8 mx-7 md:mx-20'>
        <h2 className='text-3xl font-bold text-primary'>Order History</h2>
        <div>
          {orderList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger>
                <div className='border p-2 bg-slate-100 flex justify-evenly gap-16'>
                  <h2><span className='font-bold mr-2'>Order Date:</span> {moment(item?.createdAt).format('DD/MMM/yyy')}</h2>
                  <h2><span className='font-bold mr-2'>Total Amount: </span>{item?.totalOrderAmount}</h2>
                  <h2><span className='font-bold mr-2'>Status: </span>{item?.status}</h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {item.orderItemList.map((order,index_)=>(
                    <MyOrderItem orderItem={order} key={index_}/>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;

// "use client"
// import GlobalApi from '@/_utils/GlobalApi';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react'
// import { useEffect } from 'react';
// import {
//     Collapsible,
//     CollapsibleContent,
//     CollapsibleTrigger,
//   } from "@/components/ui/collapsible"
  

// const MyOrder = () => {
//     const jwt=sessionStorage.getItem('jwt');
//     const user=JSON.parse(sessionStorage.getItem('user'));
//     const router=useRouter();
//     const [orderList,setOrderList]=useState([]);
//     useEffect(()=>{
//         if(!jwt){
//             router.replace('/');
//         };
//         getMyOrder();

//     },[]);

//     const getMyOrder=async()=>{
//         const orderList_=await GlobalApi.getMyOrder(user.id,jwt);
//         console.log(orderList_);
//         setOrderList(orderList_)

//     }
//   return (
//     <div>
//         <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>My Order</h2>
//         <div className='py-8 mx-7 md:mx-20'>
//             <h2 className='text-3xl font-bold text-primary'>Order History</h2>
//             <div>

//             {orderList.map((item,index)=>(
//                 <Collapsible>
//                 <CollapsibleTrigger>
//                 <div>
//                     <h2>Order Date:{item?.createdAt}</h2>
//                 </div>
//                 </CollapsibleTrigger>
//                 <CollapsibleContent>
//                     Yes. Free to use for personal and commercial projects. No attribution
//                     required.
//                 </CollapsibleContent>
//                 </Collapsible>

//             ))}
            
//             </div>
//         </div>
//     </div>
//   )
// }

// export default MyOrder
