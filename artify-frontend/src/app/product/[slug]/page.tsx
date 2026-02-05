import ProductDetails from "@/src/components/shop/product/ProductDetails";
import { products } from "@/src/data/products";
import { notFound } from "next/navigation";

interface Props {
    params: { slug: string };
}

export default function ProductPage({ params }: Props) {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) return notFound();

    return <ProductDetails product={product} />;
}
