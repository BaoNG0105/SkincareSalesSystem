import { Link } from 'react-router-dom';

const ShippingPolicyPage = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold text-pink-600 mb-4">Shipping Policy – SKINNE Skincare</h1>
        <p className="text-gray-700 mb-4">
          At SKINNE Skincare, we are committed to ensuring that your orders are delivered safely, promptly, and efficiently. Please review our shipping policy below for details on processing times, delivery options, and additional shipping guidelines.
        </p>
        
        <h2 className="text-2xl font-semibold text-pink-800 mt-6 mb-2">1. Order Processing</h2>
        <p className="text-gray-700 mb-4">
          All orders are processed within 1-2 business days (excluding weekends and holidays). Orders placed after 5:00 PM will be processed on the next business day. Once your order is processed, you will receive a confirmation email with tracking details.
        </p>
        
        <h2 className="text-2xl font-semibold text-pink-800 mt-6 mb-2">2. Shipping Methods & Delivery Times</h2>
        <table className="min-w-full bg-white border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Shipping Method</th>
              <th className="border border-gray-300 px-4 py-2">Estimated Delivery Time</th>
              <th className="border border-gray-300 px-4 py-2">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Standard Shipping</td>
              <td className="border border-gray-300 px-4 py-2">5-7 business days</td>
              <td className="border border-gray-300 px-4 py-2">Free for orders over $50, otherwise $5.99</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Express Shipping</td>
              <td className="border border-gray-300 px-4 py-2">2-3 business days</td>
              <td className="border border-gray-300 px-4 py-2">$9.99</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Next-Day Shipping</td>
              <td className="border border-gray-300 px-4 py-2">1 business day</td>
              <td className="border border-gray-300 px-4 py-2">$19.99</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-700 mb-4">
          Note: Delivery times may vary based on location and unforeseen delays (e.g., weather, customs clearance).
        </p>
        
        <h2 className="text-2xl font-semibold text-pink-800 mt-6 mb-2">3. Shipping Restrictions</h2>
        <p className="text-gray-700 mb-4">
          We currently only ship within [your country/region]. International shipping will be introduced in the future. Orders cannot be delivered to P.O. Boxes or APO/FPO addresses. If an incorrect shipping address is provided, we are not responsible for lost or delayed shipments.
        </p>
        
        <h2 className="text-2xl font-semibold text-pink-800 mt-6 mb-2">4. Tracking Your Order</h2>
        <p className="text-gray-700 mb-4">
          Once your order has been shipped, you will receive an email with tracking information. You can track your package via our website or the shipping carrier s tracking system.
        </p>
        
        <h2 className="text-2xl font-semibold text-pink-800 mt-6 mb-2">5. Lost, Stolen, or Damaged Packages</h2>
        <p className="text-gray-700 mb-4">
          If your package is lost or stolen, please contact our customer support within 7 days of the expected delivery date. If your order arrives damaged, please send us photos of the product and packaging within 48 hours of receiving your order for further assistance.
        </p>
        
        <h2 className="text-2xl font-semibold text-pink-800 mt-6 mb-2">6. Returns & Exchanges</h2>
        <p className="text-gray-700 mb-4">
          If you are not satisfied with your order, we offer hassle-free returns within 30 days of purchase. Shipping fees are non-refundable unless the return is due to an error on our part. For more information, please visit our <Link to="/returns" className="text-pink-600 underline">Returns & Refunds Policy</Link> page.
        </p>
        
        <p className="text-gray-700 mb-4">
          If you have any further questions, feel free to contact SKINNE Skincare Customer Support at <a href="mailto:support@skinne.com" className="text-pink-600 underline">support@skinne.com</a>.
        </p>
        
        <p className="text-gray-700 font-semibold">Thank you for choosing SKINNE!</p>
      </div>
    )
  }
  
  export default ShippingPolicyPage