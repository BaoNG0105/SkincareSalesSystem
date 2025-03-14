import ProductSection from "../../../components/product-section";

const SerumPage = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[300px] bg-cover bg-center" style={{
        backgroundImage: `url('https://res.cloudinary.com/dygipvoal/image/upload/v1741617662/pcfkffkikfd1y4gdm6xd.jpg')`
      }}>
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-center text-white pt-32">
            Serum Collection
          </h1>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
            Our Serum Collection
          </h2>
          <ProductSection category="serum" />
        </div>
      </section>
    </div>
  );
};

export default SerumPage;
  