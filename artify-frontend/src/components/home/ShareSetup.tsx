"use client";

import React from "react";
import Image from "next/image";

const ShareSetup: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Heading */}
                <h2 className="text-gray-700 text-2xl md:text-3xl font-semibold">
                    Share your setup with
                </h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-14">
                    #FuniroFurniture
                </h3>

                {/* Grid Layout */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 justify-items-center items-center">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        <Image
                            src="/home/share/img1.svg"
                            alt="Workspace setup"
                            width={300}
                            height={300}
                            className="rounded-lg object-cover w-[300px] h-[360px]"
                        />
                        <Image
                            src="/home/share/img6.svg"
                            alt="Vintage chair"
                            width={300}
                            height={300}
                            className="rounded-lg object-cover w-[300px] h-[300px]"
                        />
                    </div>

                    {/* Middle Column */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        <div className="flex gap-4 md:gap-6">
                            <Image
                                src="/home/share/img2.svg"
                                alt="Retro radio and laptop"
                                width={200}
                                height={200}
                                className="rounded-lg object-cover w-[200px] h-[220px]"
                            />
                            <Image
                                src="/home/share/img3.svg"
                                alt="Dining area"
                                width={300}
                                height={220}
                                className="rounded-lg object-cover w-[250px] h-[220px]"
                            />
                        </div>

                        <Image
                            src="/home/share/img4.svg"
                            alt="Bedroom setup"
                            width={400}
                            height={400}
                            className="rounded-lg object-cover w-[500px] h-[350px] mx-auto"
                        />

                        <div className="flex gap-4 md:gap-6 justify-center">
                            <Image
                                src="/home/share/img7.svg"
                                alt="Minimal table with vase"
                                width={250}
                                height={200}
                                className="rounded-lg object-cover w-[230px] h-[200px]"
                            />
                            <Image
                                src="/home/share/img8.svg"
                                alt="Modern kitchen wall"
                                width={250}
                                height={200}
                                className="rounded-lg object-cover w-[230px] h-[200px]"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        <Image
                            src="/home/share/img5.svg"
                            alt="Dining with sunlight"
                            width={300}
                            height={400}
                            className="rounded-lg object-cover w-[300px] h-[400px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShareSetup;
