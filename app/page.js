
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import { Button } from "components/ui/button";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";

export default async function Home() {
  
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList= await GlobalApi.getAllProducts();
  console.log("Fetched sliderList:", sliderList);
  return(
    <div className='p-9 md:p-10 px-16'>
      {/* Sliders */}
      <Slider sliderList= {sliderList}/>
      {/* Category List */}
      <CategoryList categoryList ={categoryList}/>

      {/* Product List */}
      <ProductList productList = {productList}/>

      <Image src='/banner.png' width={1000} height={300}
      alt="banner"
      className='w-full h-[400px] object-contain' />

      {/* Footer */}
      <Footer/>
    </div>
  );
}


<Button/>





