const ReturnPolicyPage = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold text-pink-600 mb-4">Return & Refund Policy – SKINNE Skincare</h1>
        <p className="text-gray-700 mb-4">
          At SKINNE Skincare, we strive to ensure that you are completely satisfied with your purchase. However, if for any reason you are not happy with your order, we offer a hassle-free return and refund policy. Please review the details below.
        </p>
        
        <h2 className="text-2xl font-semibold text-pink-600 mb-2">1. Return Eligibility</h2>
        <p className="text-gray-700 mb-4">We accept returns under the following conditions:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>The item must be unused, unopened, and in its original packaging.</li>
          <li>The return request must be initiated within 30 days of the purchase date.</li>
          <li>The product must not be on sale or a final sale item (unless defective or damaged).</li>
          <li>Items purchased as part of a bundle or set must be returned as a complete set.</li>
        </ul>
        
        <p className="text-red-600 mb-4">Non-returnable items:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Opened or used skincare products (due to hygiene and safety reasons).</li>
          <li>Gift cards and promotional items.</li>
          <li>Limited-edition or final sale products.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-pink-600 mb-2">2. How to Initiate a Return</h2>
        <p className="text-gray-700 mb-4">If your order meets the return eligibility criteria, follow these steps:</p>
        <ol className="list-decimal list-inside text-gray-700 mb-4">
          <li><strong>Contact Us</strong>: Email our customer support team at <a href="mailto:returns@skinne.com" className="text-pink-600">returns@skinne.com</a> with your order number, reason for return, and photos if necessary (for damaged/defective items).</li>
          <li><strong>Receive a Return Authorization</strong>: Our team will review your request and provide you with a Return Authorization (RA) number and return instructions.</li>
          <li><strong>Ship the Item Back</strong>: Pack the item securely in its original packaging and include your RA number in the package. Ship the package to the provided return address using a trackable shipping method.</li>
        </ol>

        <h2 className="text-2xl font-semibold text-pink-600 mb-2">3. Refund Process</h2>
        <p className="text-gray-700 mb-4">Once we receive your returned item, we will:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Inspect the product to ensure it meets the return conditions.</li>
          <li>Process your refund within 5-7 business days after approval.</li>
          <li>Issue the refund to your original payment method (credit/debit card, PayPal, etc.).</li>
        </ul>

        <p className="text-red-600 mb-4">Important Notes:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Original shipping fees are non-refundable unless the return is due to an error on our part.</li>
          <li>If the return does not meet the eligibility criteria, we may decline the refund or issue a partial refund.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-pink-600 mb-2">4. Exchanges</h2>
        <p className="text-gray-700 mb-4">If you received a damaged, defective, or incorrect item, we will offer a free exchange.</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Contact us within 48 hours of delivery.</li>
          <li>Provide photos of the product and packaging for verification.</li>
          <li>We will arrange a replacement product to be shipped at no extra cost.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-pink-600 mb-2">5. Late or Missing Refunds</h2>
        <p className="text-gray-700 mb-4">If you have not received your refund within 10 business days, check with your bank or payment provider first. If the issue persists, contact us at <a href="mailto:support@skinne.com" className="text-pink-600">support@skinne.com</a> for assistance.</p>

        <p className="text-gray-700 mb-4">For any additional questions, feel free to reach out to our Customer Support Team at <a href="mailto:support@skinne.com" className="text-pink-600">support@skinne.com</a>.</p>

        <p className="text-gray-700 font-semibold">Thank you for choosing SKINNE!</p>
      </div>
    )
}
  
export default ReturnPolicyPage;