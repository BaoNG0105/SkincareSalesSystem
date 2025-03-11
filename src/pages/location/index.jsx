
const LocationPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Section */}
      <section className="relative bg-pink-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-pink-800 mb-6">
            Our SKINNE Store Locations
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Come visit our stores to experience the best skincare products and services
          </p>
        </div>
      </section>

      {/* Store Locations Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">

          {/* City Sections */}
          <div className="space-y-12">
            {/* Ho Chi Minh City Section */}
            <div>
              <h2 className="text-2xl font-bold text-pink-800 mb-6">Ho Chi Minh City</h2>          
              <div className="mb-8">
                {/* Binh Thanh District */}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Binh Thanh District</h3>
                {/* Xô Viết Nghệ Tĩnh Store */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h4 className="font-bold text-lg mb-2">Xo Viet Nghe Tinh</h4>
                  <p className="text-gray-600 mb-2">
                    Address: 180, Xo Viet Nghe Tinh Street, Binh Thanh District, Ho Chi Minh City
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Hotline:</span> +091.103.1534
                  </p>
                  <div className="text-gray-600">
                    <p className="font-semibold mb-1">Operating Hours:</p>
                    <p>Monday - Sunday: 8:00 AM - 9:00 PM</p>
                  </div>
                </div>
                {/* District 1 */}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">District 1</h3>
                {/* Takashimaya Store */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="font-bold text-lg mb-2">Takashimaya Vietnam</h4>
                  <p className="text-gray-600 mb-2">
                    Address: 4th Floor, Takashimaya Vietnam, 92-94 Nam Ky Khoi Nghia, Ben Nghe Ward, District 1, Ho Chi Minh City
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Hotline:</span> +091.103.1534
                  </p>
                  <div className="text-gray-600">
                    <p className="font-semibold mb-1">Operating Hours:</p>
                    <p>Monday - Friday: 9:30 AM - 9:30 PM</p>
                    <p>Saturday - Sunday: 9:30 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Ha Noi Section */}
            <div>
              <h2 className="text-2xl font-bold text-pink-800 mb-6">Hanoi</h2> 
              {/* Long Bien District */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Long Bien District</h3>               
                {/* Aeon Mall Store */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h4 className="font-bold text-lg mb-2">Aeon Mall Long Bien</h4>
                  <p className="text-gray-600 mb-2">
                    Address: 1st Floor, AEON MALL Long Bien, No. 27, Cổ Linh Street, Long Bien District, Hanoi
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Hotline:</span> +091.979.7383
                  </p>
                  <div className="text-gray-600">
                    <p className="font-semibold mb-1">Operating Hours:</p>
                    <p>Monday - Friday: 10:00 AM - 10:00 PM</p>
                    <p>Saturday - Sunday: 9:00 AM - 10:00 PM</p>
                  </div>
                </div>
                {/* Hai Ba Trung District */}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Hai Ba Trung District</h3>
                {/* Vinhomes Times City Store */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="font-bold text-lg mb-2">Vinhomes Times City</h4>
                  <p className="text-gray-600 mb-2">
                    Address: Park 6, Vinhomes Times City, Hai Ba Trung District, Hanoi
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Hotline:</span> +091.979.7383
                  </p>
                  <div className="text-gray-600">
                    <p className="font-semibold mb-1">Operating Hours:</p>
                    <p>Monday - Sunday: 9:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;
