"use client";

import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-white py-16 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Column 1 - Brand Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Funiro.</h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            400 University Drive Suite 200 Coral Gables, <br />
                            FL 33134 USA
                        </p>
                    </div>

                    {/* Column 2 - Links */}
                    <div>
                        <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">
                            Links
                        </h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-800 hover:text-[#B88E2F]">Home</a></li>
                            <li><a href="#" className="text-gray-800 hover:text-[#B88E2F]">Shop</a></li>
                            <li><a href="#" className="text-gray-800 hover:text-[#B88E2F]">About</a></li>
                            <li><a href="#" className="text-gray-800 hover:text-[#B88E2F]">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 3 - Help */}
                    <div>
                        <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">
                            Help
                        </h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-800 hover:text-[#B88E2F]">Payment Options</a></li>
                            <li><a href="#" className="text-gray-800 hover:text-[#B88E2F]">Returns</a></li>
                            <li><a href="#" className="text-gray-800 hover:text-[#B88E2F]">Privacy Policies</a></li>
                        </ul>
                    </div>

                    {/* Column 4 - Newsletter */}
                    <div>
                        <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">
                            Newsletter
                        </h3>
                        <form className="flex items-center border-b border-gray-400 pb-1">
                            <input
                                type="email"
                                placeholder="Enter Your Email Address"
                                className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="text-gray-900 font-semibold text-sm ml-3 border-b border-gray-900 hover:text-[#B88E2F] hover:border-[#B88E2F] transition-all"
                            >
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-200 mb-6" />

                {/* Bottom Section */}
                <div className="text-sm text-gray-500">
                    © 2023 Funiro. All rights reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;
