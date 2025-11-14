import ProductDetailsSkeleton from "@/src/components/shop/common/ProductDetailsSkeleton";
import ProductTabsSkeleton from "@/src/components/shop/common/ProductTabsSkeleton";
import RelatedProductsSkeleton from "@/src/components/shop/common/RelatedProductsSkeleton";
import ProductDetails from "@/src/components/shop/product/ProductDetails";
import ProductTabs from "@/src/components/shop/product/ProductTabs";
import RelatedProducts from "@/src/components/shop/product/RelatedProducts";


export default function ProductPage() {
    const isLoading = false; // later this may be true while fetching API data

    return (
        <>
            {isLoading ? <ProductDetailsSkeleton /> : <ProductDetails />}
            {isLoading ? <ProductTabsSkeleton /> : <ProductTabs />}
            {isLoading ? <RelatedProductsSkeleton /> : <RelatedProducts />}
        </>
    );
}
