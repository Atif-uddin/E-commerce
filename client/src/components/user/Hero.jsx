const Hero = () => {
    return (
        <section className="bg-gradient from-blue-50 via-white to-purple-50">

            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left */}

                    <div>

                        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            ✨ New Collection 2026
                        </span>

                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">

                            Find Your
                            <span className="text-blue-600">
                                {" "}Perfect Style
                            </span>

                        </h1>

                        <p className="text-gray-600 text-lg mt-6 leading-8">

                            Discover premium fashion,
                            electronics, home essentials,
                            and more at unbeatable prices.

                        </p>

                        <div className="flex gap-4 mt-10">

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">

                                Shop Now

                            </button>

                            <button className="border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition">

                                Explore

                            </button>

                        </div>

                        <div className="flex gap-8 mt-12">

                            <div>

                                <h2 className="text-2xl font-bold">
                                    20K+
                                </h2>

                                <p className="text-gray-500">
                                    Happy Customers
                                </p>

                            </div>

                            <div>

                                <h2 className="text-2xl font-bold">
                                    500+
                                </h2>

                                <p className="text-gray-500">
                                    Premium Products
                                </p>

                            </div>

                            <div>

                                <h2 className="text-2xl font-bold">
                                    24/7
                                </h2>

                                <p className="text-gray-500">
                                    Support
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div>

                        <img
                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900"
                            alt="Hero"
                            className="rounded-3xl shadow-2xl"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;