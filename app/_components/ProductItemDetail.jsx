"use client"
import { UpdateCartContext } from '@/_context/UpdateCartContext'
import GlobalApi from '@/_utils/GlobalApi'
import { Button } from 'components/ui/button'
import { LoaderCircle, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React,{useContext, useState} from 'react'
import { toast } from 'sonner'

const ProductItemDetail = ({ product }) => {

  const jwt=sessionStorage.getItem('jwt');
  const user=JSON.parse(sessionStorage.getItem('user'));
  const {updateCart,setUpdateCart}=useContext(UpdateCartContext);
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.attributes.sellingPrice?
    product.attributes.sellingPrice:
    product.attributes.mrp
  )
  const router=useRouter();
  const[quantity, setQuantity]= useState(1);
  const[loading,setLoading]=useState(false);

 const addToCart=()=>{
  setLoading(true)
  if(!jwt)
  {
    router.push('/sign-in');
    setLoading(false)
    return;

  }
  const data={
    data:{
      quantity:quantity,
    amount:(quantity*productTotalPrice).toFixed(2),
    products:product.id,
    users_permissions_users:user.id,
    userId:user.id
    }
  }
  console.log(data);
  GlobalApi.addToCart(data,jwt).then(resp=>{
    console.log(resp);
    toast('Added to Cart')
    setUpdateCart(!updateCart);
    setLoading(false)
  },(e)=>{
    toast("Error while adding into cart")
    setLoading(false)
  })

 }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black gap-5'>
      {/* Left side - Image */}
      <div>
        <Image
          src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.attributes.images.data[0].attributes.url}
          alt='image'
          width={300}
          height={300}
          className='bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg'
        />
      </div>
      
      {/* Right side - Product Details */}
      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-bold'>{product.attributes.name}</h2>
        <h2 className='text-sm text-gray-500'>{product.attributes.description}</h2>
        
        {/* Price Section */}
        <div className='flex gap-3 items-center'>
          {product.attributes.sellingPrice && (
            <h2 className='font-bold text-3xl'>${product.attributes.sellingPrice}</h2>
          )}
          <h2
            className={`font-bold text-3xl ${product.attributes.sellingPrice && 'line-through text-gray-500'}`}
          >
            ${product.attributes.mrp}
          </h2>
        </div>
        
        {/* Quantity Selector and Add to Cart */}
        <h2 className='font-medium text-lg'>Quantity ({product.attributes.itemQuantityType})</h2>
        
        <div className='flex flex-col gap-3'>
          {/* Quantity Selector */}
          <div className='flex gap-3 items-center'>
          <div className='flex items-center border p-2 rounded-md gap-5 w-fit'>
            <button  disabled={quantity==1} onClick={()=>setQuantity(quantity-1)} className="text-xl px-3">-</button>
            <h2 className="text-lg font-bold">{quantity}</h2>
            <button onClick={()=>setQuantity(quantity+1)} className="text-xl px-3">+</button>
          </div>
          <h2 className='text-2xl font-bold'>= ${(quantity*productTotalPrice).toFixed(2)} </h2>
          </div>

          {/* Add to Cart Button */}
          <Button className="flex gap-3 bg-green-500 hover:bg-green-600
           text-white py-2 px-4 rounded-md" onClick={()=>addToCart()}
           disabled={loading}>
            <ShoppingBasket />
            {loading?<LoaderCircle className='animate-spin'/>:'Add To Cart'}
          </Button>
        </div>

        {/* Category Section */}
        <h2><span className='font-bold'>Category:</span> {product.attributes.categories.data[0].attributes.name}</h2>
        

      </div>
    </div>
  )
}

export default ProductItemDetail












