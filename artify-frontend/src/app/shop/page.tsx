"use client";

import React from "react";
import ShopBanner from "@/src/components/shop/ShopBanner";
import ShopProducts from "@/src/components/shop/ShopProducts";
import ShopFilterBar from "@/src/components/shop/ShopFilterBar";

const ShopPage: React.FC = () => {
    return (
        <div>
            <ShopBanner />
            <ShopFilterBar />
            <ShopProducts />
        </div>
    );
};

export default ShopPage;
