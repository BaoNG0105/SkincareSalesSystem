import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* About Us Content */}
      <main className="py-16">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4">
        <div className="mb-8 flex">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-gray-600 hover:text-pink-600">Home</Link></li>
              <li><span className="text-gray-400 mx-2">-</span></li>
              <li className="text-gray-800">About Us</li>
            </ol>
          </nav>
        </div>
      </div>
        {/* Hero Section */}
        <section className="relative h-[400px] mb-16">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1556228578-0d85b1a4d571')",
            }}
          >
            <div className="absolute inset-0 bg-pink-50/80"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-pink-800 mb-6">Our Story</h1>
              <p className="text-xl text-gray-700">Empowering beauty through science and nature since 2025</p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-pink-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                At SKINNE, our mission is to revolutionize skincare by combining cutting-edge science with the purest natural ingredients. 
                We believe everyone deserves to feel confident in their skin, which is why we are dedicated to creating personalized skincare 
                solutions that deliver real results.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-pink-800 mb-6">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                We envision a world where achieving healthy, radiant skin is accessible to all. Through innovation, education, and 
                sustainability, we strive to be the leading force in personalized skincare solutions while maintaining our commitment 
                to environmental responsibility.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-pink-50 py-16 mb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-pink-800 mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold text-pink-700 mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We continuously research and develop new formulations that combine scientific advancement with natural ingredients.
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold text-pink-700 mb-4">Sustainability</h3>
                <p className="text-gray-600">
                  Our commitment to the environment is reflected in our eco-friendly packaging and sustainable sourcing practices.
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold text-pink-700 mb-4">Transparency</h3>
                <p className="text-gray-600">
                  We believe in complete honesty about our ingredients and processes, ensuring our customers make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold text-center text-pink-800 mb-12">Why Choose SKINNE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-pink-700 mb-4">Expert Formulations</h3>
              <p className="text-gray-600">
                Our products are developed by a team of dermatologists and skincare experts with decades of combined experience.
                Each formula is carefully crafted to deliver optimal results while being gentle on your skin.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-pink-700 mb-4">Personalized Approach</h3>
              <p className="text-gray-600">
                We understand that every skin is unique. Our AI-powered skin analysis tool helps create customized skincare routines
                tailored to your specific needs and concerns.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
