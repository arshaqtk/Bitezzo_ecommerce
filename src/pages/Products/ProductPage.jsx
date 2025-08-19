import { lazy, Suspense } from 'react';
import Nav from '../../components/NavBar/Nav';
const Products = lazy(() => import('../../components/Products/Products'));

import { LottieAnimation } from '../../components/Animation/LottieAnimation';


function ProductPage() {
  return (
    <div>
      
      <Suspense
        fallback={<div className="flex justify-center items-center h-screen"><LottieAnimation/></div>}>
        <Nav />
        <Products />
      </Suspense>
    </div>
  );
}

export default ProductPage;


