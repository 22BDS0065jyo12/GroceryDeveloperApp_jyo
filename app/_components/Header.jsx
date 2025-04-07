"use client";
import { Button } from "../../components/ui/button";
import { CircleUserRound, LayoutGridIcon, Search, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "@/_context/UpdateCartContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartItemList from "./CartItemList";
import { toast } from "sonner";
//import Checkout from "./checkout/page";


function Header({ slider }) {
  const [categoryList, setCategoryList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const {updateCart,setUpdateCart}=useContext(UpdateCartContext);
  const [cartItemList,setCartItemList]=useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedJwt = sessionStorage.getItem('jwt');
      const storedUser = sessionStorage.getItem('user');

      setIsLogin(!!storedJwt);
      setJwt(storedJwt);
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
  }, []);

  useEffect(() => {
    getCategoryList();
    if (user) getCartItems(); // Fetch cart items only if user exists
  }, [user,updateCart]);

  const getCategoryList = async () => {
    try {
      const resp = await GlobalApi.getCategory();
      setCategoryList(resp?.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getCartItems = async () => {
    if (!user) return; // Prevents TypeError if user is null
    try {
      const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
      setTotalCartItem(cartItemList_?.length || 0);
      setCartItemList(cartItemList_);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const onSignOut = () => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
    router.push('/sign-in');
  };

  const onDeleteItem=(id)=>{
    GlobalApi.deleteCartItem(id,jwt).then(resp=>{
      toast('Item removed !');
      getCartItems();
    })

  }

  const[subtotal,setSubTotal] = useState(0);
  
    useEffect(()=>{
      let total=0;
      cartItemList.forEach(element =>{
          total=total+element.amount
      });
      setSubTotal(total.toFixed(2))
  
    },[cartItemList])

  return (
    <div className="p-5 shadow-sm flex justify-between items-center bg-white">
      <div className="flex items-center gap-8">
        <Link href={'/'}><Image src="/logo.png" alt="logo"
         width={120} height={80}
         className='cursor-pointer' /></Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden md:flex gap-2 items-center border rounded-full p-2 px-5 bg-slate-200 cursor-pointer">
              <LayoutGridIcon className="h-5 w-5" /> Category
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.length > 0 ? (
              categoryList.map((category, index) => (
                <Link key={index} href={'/products-category/' + category.attributes.name}>
                  <DropdownMenuItem className="flex gap-4 items-center cursor-pointer">
                    <Image
                      src={category?.attributes?.icon?.data?.[0]?.attributes?.url ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.attributes.icon.data[0].attributes.url}` : "/default-icon.png"}
                      unoptimized={true}
                      alt="Icon"
                      height={30}
                      width={30}
                    />
                    <h2 className="text-lg">{category?.attributes?.name}</h2>
                  </DropdownMenuItem>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 px-3 py-2">No categories available</p>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search className="h-5 w-5" />
          <input type="text" placeholder="Search" className="outline-none w-32 md:w-48" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        
        <Sheet>
        <SheetTrigger>
        <h2 className="flex gap-2 items-center text-lg">
          <ShoppingBasket className="h-7 w-7" />
          <span className="bg-primary text-white px-2 rounded-full">{totalCartItem}</span>
        </h2>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className='bg-primary text-white font-bold text-lg p-2'>My Cart</SheetTitle>
            <SheetDescription>
              <CartItemList cartItemList={cartItemList}
              onDeleteItem={onDeleteItem}/>
            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
                <div className='absolute w-[90%] bottom-6 flex flex-col'>
                    <h2 className='text-lg font-bold flex justify-between'>Subtotal 
                    <span>${subtotal}</span></h2>
                    <Button onClick={()=>router.push(jwt?'/checkout':'/sign-in')}>Checkout</Button>
                </div>
          </SheetClose>
        </SheetContent>
      </Sheet>

        {!isLogin ? (
          <Link href={'/sign-in'}>
            <Button className="bg-green-500 text-white px-4 py-2 rounded-md">Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className='bg-green-100 p-2 rounded-full cursor-pointer text-primary h-12 w-12' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={'/my-order'}>
              <DropdownMenuItem>My Order</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
