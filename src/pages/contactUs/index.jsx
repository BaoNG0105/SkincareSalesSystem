import { Link } from 'react-router-dom';

const ContactUs = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-gray-600 hover:text-pink-600">Home</Link></li>
              <li><span className="text-gray-400 mx-2">-</span></li>
              <li className="text-gray-800">Contact Us</li>
            </ol>
          </nav>
        </div>
      </div>
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-12">Contact Us & Support</h1>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 border border-pink-100">
          <h2 className="text-2xl font-semibold text-pink-800 mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full name *</label>
              <input
                type="text"
                id="fullName"
                className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:border-pink-400"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:border-pink-400"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject *</label>
              <select
                id="subject"
                className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:border-pink-400"
                required
              >
                <option value="">Select a subject</option>
                <option value="order">Order Status</option>
                <option value="return">Returns</option>
                <option value="product">Product Information</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message *</label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:border-pink-400"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="attachFiles" className="block text-gray-700 font-medium mb-2">
                Attach Files
                <span className="text-sm text-gray-500 ml-2">(Maximum allowed size is 25 MB)</span>
              </label>
              <input
                type="file"
                id="attachFiles"
                className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:border-pink-400"
                multiple
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
            >
              Send
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto mt-12 bg-pink-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-pink-800 mb-6">Other ways to reach us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-pink-800 mb-2">Phone Support</h3>
              <p className="text-gray-700">
                <a href="tel:091-103-1534" className="text-pink-600 hover:text-pink-700">091-103-1534</a>
              </p>
              <p className="text-gray-600 text-sm mt-2">Monday - Friday: 9 A.M - 5 P.M</p>
            </div>
            <div>
              <h3 className="font-semibold text-pink-800 mb-2">Email Support</h3>
              <p className="text-gray-700">
                <a href="mailto:skinne@gmail.com" className="text-pink-600 hover:text-pink-700">skinne@gmail.com</a>
              </p>
              <p className="text-gray-600 text-sm mt-2">We will respond within 24-48 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
