const CleanserPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[300px] bg-pink-600">
        <div className="absolute inset-0 bg-pink-600 opacity-80"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Cleanser Products</h1>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Cleanser Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Product Cards */}
            {/* Các sản phẩm sẽ được thêm vào đây sau khi lấy từ API */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CleanserPage;
