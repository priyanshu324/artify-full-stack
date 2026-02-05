"use client";

import ProductBreadcrumbSkeleton from "@/src/components/shop/common/ProductBreadcrumbSkeleton";
import ProductBreadcrumb from "@/src/components/shop/product/ProductBreadcrumb";

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const isLoading = false;
    return (
        <>
            {isLoading ? <ProductBreadcrumbSkeleton /> : <ProductBreadcrumb />}
            {children}
        </>
    );
}