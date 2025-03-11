import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const categories = [
    {
      id: 1,
      name: 'Cleanser',
      description: 'Gentle and effective cleansers for all skin types',
      image: 'https://res.cloudinary.com/dygipvoal/image/upload/v1741617664/u8skymkjl8fgaiibmzun.avif',
      path: '/cleanser'
    },
    {
      id: 2,
      name: 'Moisturizer',
      description: 'Hydrating moisturizers for healthy, glowing skin',
      image: 'https://res.cloudinary.com/dygipvoal/image/upload/v1741617662/ykpcknrdqsbdogi2agf4.avif',
      path: '/moisturizer'
    },
    {
      id: 3,
      name: 'Face Mask',
      description: 'Rejuvenating masks for deep nourishment',
      image: 'https://res.cloudinary.com/dygipvoal/image/upload/v1741617662/ftnmjjh3acwkgkqlsvdk.webp',
      path: '/face-mask'
    },
    {
      id: 4,
      name: 'Sunscreen',
      description: 'Protection against harmful UV rays',
      image: 'https://res.cloudinary.com/dygipvoal/image/upload/v1741617663/qcoomevtgdm5fg4vu1ru.webp',
      path: '/sunscreen'
    },
    {
      id: 5,
      name: 'Serum',
      description: 'Concentrated treatments for specific skin concerns',
      image: 'https://res.cloudinary.com/dygipvoal/image/upload/v1741617662/pcfkffkikfd1y4gdm6xd.jpg',
      path: '/serum'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-pink-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-pink-800 mb-6">
            Product Categories
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Discover our carefully curated selection of premium skincare products for your beauty routine
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={category.path}
                className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="relative h-80">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-110 transition duration-500"
                    style={{
                      backgroundImage: `url('${category.image}')`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="relative h-full flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      {category.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                        Explore Products →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
