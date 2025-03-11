import { useState } from 'react';

function FAQsPage() {
  const faqs = {
    "General FAQs": [
      {
        question: "Do I really need to apply sunscreen every day?",
        answer: "Yes, you should apply sunscreen daily if you are exposed to sunlight. Use sunscreen with both SPF and PA+ ratings to protect against both UVB and UVA rays. Try Nature’s Secrets Sun & Fun Sunscreen with SPF 25 and PA+++, which has been clinically tested and certified in the USA by an FDA-registered testing facility."
      },
      {
        question: "What is the best age to start using anti-aging products?",
        answer: "We start losing collagen in our mid-20s, so it is best to begin using anti-aging products around this age. The first step you can take is to use sunscreen daily, as continuous exposure to harmful UVA rays significantly contributes to skin aging over time. Make sure your sunscreen provides UVA protection by looking for the PA+ rating on the packaging. You can also incorporate skincare products rich in moisturizers, antioxidants, retinol, vitamin C, vitamin E, and hyaluronic acid."
      },
      {
        question: "Do I need different skincare products for day and night?",
        answer: "Sometimes, product packaging specifies whether a product should be used during the day or at night; if so, follow those instructions. If there is no specific time mentioned, the product can usually be used both day and night."
      },
      {
        question: "Why is moisture important for facial skin?",
        answer: "Water plays a crucial role in maintaining healthy skin. The stratum corneum (outermost skin layer) contains about 10 to 30% water, and even more in the deeper layers. When the skin has an optimal moisture balance, it remains soft, smooth, and functions as a protective barrier. Insufficient moisture can lead to rough and tight skin. Dry skin may also lose its elasticity, and tiny cracks may appear, compromising the skin’s barrier function. Therefore, moisture is essential for maintaining a healthy and balanced appearance. NIVEA Face Care products help keep your skin hydrated."
      },
      {
        question: "How can I effectively care for dry facial skin?",
        answer: "The best way to care for dry skin is to maintain a good balance between gentle cleansing and proper moisturization. NIVEA products for dry skin are specifically formulated to meet these needs. You can check the product labels for skin type recommendations. NIVEA Cleansing products for dry skin gently and thoroughly remove makeup and impurities while balancing the skin’s moisture levels. NIVEA Care products provide hydration and essential lipids, helping to protect the skin and prevent moisture loss. They also nourish the skin for a smooth and healthy appearance. Special NIVEA products for dry skin include NIVEA Nourishing Day Care, NIVEA Indulging Cleansing Milk, and NIVEA Gentle Cleansing Cream."
      },
      {
        question: "Should I use different skincare products in summer and winter?",
        answer: "Skin conditions can vary with seasonal changes. During winter, the skin tends to be drier compared to summer. While skin type may change slightly throughout the year, these variations can be minor or significant. If you have found an optimal skincare routine that works year-round, there may be no need to switch to a different product line. However, if you feel your skin is not receiving adequate care or moisture, consider using more nourishing products, such as NIVEA Moisturizing Day Care or NIVEA Nourishing Day Care during winter."
      },

    ],
    "Product Issues": [
      {
        question: "What should I do if my skincare product is not as effective as expected?",
        answer: "First, carefully check the usage instructions and ensure you are following the recommended skincare routine. If the product still does not meet your expectations after consistent use, contact customer service for advice and support. Additionally, you may need to adjust your skincare routine or consult a dermatologist."
      },
      {
        question: "What should I do if a product causes irritation or an allergic reaction?",
        answer: "If you experience irritation (redness, itching, or swelling) immediately after using a product, discontinue use and rinse the affected area thoroughly. If the condition does not improve or worsens, seek advice from a dermatologist. Always perform a patch test on a small area of your skin before applying a new product to your entire face."
      },
      {
        question: "I feel the product is not as effective as described. Should I adjust how I use it?",
        answer: "First, check the usage instructions to ensure you are following the correct skincare routine. If results are still unsatisfactory, it is best to consult a dermatologist or specialist to assess your skin type rather than adjusting the usage on your own, which could lead to ineffective or harmful combinations."
      },
      {
        question: "What should I do if a product causes irritation or an allergic reaction?",
        answer: "If you experience irritation (redness, itching, or swelling) immediately after using a product, discontinue use and rinse the affected area thoroughly. If the condition does not improve or worsens, seek advice from a dermatologist. Always perform a patch test on a small area of your skin before applying a new product to your entire face."
      },
      {
        question: "If I have opened a product but haven't used it completely and it has a defect, can I return it?",
        answer: "Generally, opened products can only be returned if the defect is due to manufacturing errors or packaging mistakes. Be sure to read the return policy carefully and contact customer service for detailed guidance."
      },
    ],
    "Shipping & Delivery": [
      {
        question: "How long does shipping usually take?",
        answer: "Shipping time depends on the location and shipping method. Typically, orders within the city are delivered within 1-3 business days, while orders in remote areas may take 3-7 business days. Specific information will be displayed when placing an order."
      },
      {
        question: "How are shipping fees calculated?",
        answer: "Shipping fees are calculated based on the weight, size of the order, and distance from the warehouse to the delivery address. In some cases, orders of high value may qualify for free shipping. You can view detailed shipping costs during checkout."
      },
      {
        question: "Can I request same-day or express delivery?",
        answer: "Some areas offer same-day or priority shipping services. Information about these options will be displayed during checkout, and you can select the most suitable option."
      },
      {
        question: "If my order is returned due to shipping issues, will the shipping fee be refunded?",
        answer: "If an order is returned due to an error by the shipping company, the shipping fee is typically refunded. However, if the issue is due to incorrect information provided by the customer, the shipping fee may not be refunded according to the company's policy."
      },
      {
        question: "Can my order be delivered to an office or a non-residential location?",
        answer: "Yes, you can provide an office or any other location where someone can receive the package. However, ensure that the address has a recipient available to avoid return issues."
      },
      {
        question: "If I want my order delivered within a specific time frame, is that possible?",
        answer: "Some delivery partners allow customers to choose a specific delivery time. If you have special requests, note them in the order comments section or contact customer service for additional assistance."
      },
    ]
  };

  const [openIndex, setOpenIndex] = useState({}); // This is used to store the index of the open FAQ

  const toggleFAQ = (category, index) => {  // This is used to toggle the open FAQ
    setOpenIndex((prev) => ({
      ...prev,
      [category]: prev[category] === index ? null : index,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Section */}
      <section className="relative bg-pink-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-pink-800 mb-6">
            FAQs
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Find answers to common questions and concerns about our skincare products and services
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
      {Object.keys(faqs).map((category) => (
        <div key={category} className="mb-4">
          <h2 className="text-xl font-semibold mb-3 text-pink-800">{category}</h2> {/* category */}
          {faqs[category].map((faq, index) => (
            <div key={index} className="mb-2">
              <button 
                className="w-full text-left p-4 bg-gray-200 rounded-lg focus:outline-none hover:bg-gray-300 transition duration-200"
                onClick={() => toggleFAQ(category, index)}
              >
                {faq.question}
              </button>
              {openIndex[category] === index && (
                <div className="p-4 bg-gray-100 rounded-lg mt-1">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  );
}

export default FAQsPage;
