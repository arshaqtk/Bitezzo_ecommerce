import { lazy, Suspense } from 'react';
import Nav from '../components/user/NavBar/Nav'

const Products = lazy(() => import('../components/user/Products/Products'));

import { LoadingAnimation } from '../components/user/Animation/Loading';


function ProductPage() {
  return (
    <div>
      
      <Suspense
        fallback={<div className="flex justify-center items-center h-screen"><LoadingAnimation/></div>}>
        <Nav />
        <Products />
      </Suspense>
    </div>
  );
}

export default ProductPage;


