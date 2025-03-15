import ProductSection from "../../../components/product-section";

const SunScreenPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dygipvoal/image/upload/v1741617663/qcoomevtgdm5fg4vu1ru.webp')`,
        }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-center text-white pt-32">
            Sun Screen Collection
          </h1>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
            Our Sun Screen Collection
          </h2>
          <ProductSection category="sunscreen" />
        </div>
      </section>
    </div>
  );
};

export default SunScreenPage;
