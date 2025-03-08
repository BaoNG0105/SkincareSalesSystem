import { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "Da của bạn cảm thấy như thế nào vào cuối ngày (sau một ngày hoạt động)?",
    options: [
      { id: 'A', text: "Nhờn bóng, đặc biệt là vùng trán, mũi và cằm." },
      { id: 'B', text: "Vẫn mềm mại và thoải mái." },
      { id: 'C', text: "Rất khô, căng và có thể bong tróc." },
      { id: 'D', text: "Vùng chữ T bóng dầu, nhưng hai bên má lại khô hoặc bình thường." }
    ]
  },
  {
    id: 2,
    question: "Kích thước lỗ chân lông trên mặt bạn như thế nào?",
    options: [
      { id: 'A', text: "Lỗ chân lông to, dễ nhìn thấy" },
      { id: 'B', text: "Lỗ chân lông nhỏ, khó nhìn thấy" },
      { id: 'C', text: "Lỗ chân lông rất nhỏ, gần như không thể nhìn thấy" },
      { id: 'D', text: "Lỗ chân lông to ở vùng chữ T, nhỏ ở hai má" }
    ]
  },
  {
    id: 3,
    question: "Làn da của bạn thường phản ứng thế nào với các sản phẩm skincare mới?",
    options: [
      { id: 'A', text: "Dễ bị kích ứng và nổi mụn" },
      { id: 'B', text: "Hiếm khi gặp vấn đề" },
      { id: 'C', text: "Thường bị đỏ và ngứa" },
      { id: 'D', text: "Phản ứng khác nhau tùy từng vùng trên mặt" }
    ]
  },
  {
    id: 4,
    question: "Khi không sử dụng kem dưỡng ẩm, da bạn cảm thấy thế nào?",
    options: [
      { id: 'A', text: "Vẫn ổn, thậm chí còn cảm thấy thoải mái hơn" },
      { id: 'B', text: "Hơi khô nhưng vẫn chấp nhận được" },
      { id: 'C', text: "Rất khô và khó chịu" },
      { id: 'D', text: "Một số vùng khô, một số vùng vẫn ổn" }
    ]
  },
  {
    id: 5,
    question: "Bạn thường xuyên bị mụn không?",
    options: [
      { id: 'A', text: "Thường xuyên, đặc biệt là mụn viêm" },
      { id: 'B', text: "Thỉnh thoảng, chủ yếu khi stress hoặc trong kỳ kinh nguyệt" },
      { id: 'C', text: "Hiếm khi bị mụn" },
      { id: 'D', text: "Chủ yếu bị ở vùng chữ T" }
    ]
  },
  {
    id: 6,
    question: "Khi chụp ảnh, làn da của bạn trông như thế nào?",
    options: [
      { id: 'A', text: "Thường bóng dầu trong ảnh" },
      { id: 'B', text: "Trông khỏe mạnh và tự nhiên" },
      { id: 'C', text: "Thường trông khô và thiếu sức sống" },
      { id: 'D', text: "Vùng trán và mũi thường bóng, má thì không" }
    ]
  },
  {
    id: 7,
    question: "Bạn cần thấm dầu (dùng giấy thấm hoặc khăn giấy) bao nhiêu lần trong ngày?",
    options: [
      { id: 'A', text: "Nhiều lần trong ngày" },
      { id: 'B', text: "Hiếm khi hoặc không bao giờ" },
      { id: 'C', text: "Không bao giờ, da không có dầu để thấm" },
      { id: 'D', text: "Chỉ cần thấm vùng chữ T" }
    ]
  },
  {
    id: 8,
    question: "Làn da của bạn phản ứng thế nào với thời tiết nắng nóng?",
    options: [
      { id: 'A', text: "Tiết nhiều dầu hơn và dễ bị mụn" },
      { id: 'B', text: "Không thay đổi nhiều" },
      { id: 'C', text: "Trở nên khô và dễ bị kích ứng hơn" },
      { id: 'D', text: "Vùng chữ T tiết dầu nhiều hơn, má vẫn bình thường" }
    ]
  },
  {
    id: 9,
    question: "Khi rửa mặt xong, nếu không thoa kem dưỡng ngay, da bạn cảm thấy thế nào?",
    options: [
      { id: 'A', text: "Không có vấn đề gì, nhanh chóng tiết dầu trở lại" },
      { id: 'B', text: "Hơi căng nhẹ nhưng vẫn ổn" },
      { id: 'C', text: "Rất căng và khó chịu, cần thoa kem dưỡng ngay" },
      { id: 'D', text: "Má thì căng và khô, vùng chữ T thì ổn" }
    ]
  },
  {
    id: 10,
    question: "Kết cấu kem dưỡng ẩm nào phù hợp nhất với bạn?",
    options: [
      { id: 'A', text: "Dạng gel nhẹ, không dầu" },
      { id: 'B', text: "Dạng sữa dưỡng nhẹ" },
      { id: 'C', text: "Kem đặc, giàu dưỡng chất" },
      { id: 'D', text: "Cần dùng các sản phẩm khác nhau cho từng vùng" }
    ]
  }
];

const SkinTypeTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isStarted, setIsStarted] = useState(false);
  
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answer;
      return newAnswers;
    });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Show results when all questions are answered
      console.log('Quiz completed! Answers:', answers);
    }
  };

  // Common header with exit button

  // Header
  const Header = () => (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-pink-600 text-center">
          Skin Test 
        </h1>
        <button
          onClick={() => window.location.href = '/'}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-pink-600
                   transition-colors duration-200 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </header>
  );

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-pink-50">
        <Header />
        
        {/* Introduction Container */}
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
            What is your Skin Type look like?
            </h2>
            
            <p className="text-gray-600 mb-6">
              Take the 3 minute skin type quiz now and build a skin care routine with medical grade skin care brands. 
              You will be amazed by how great your skin will look!
            </p>
            
            <p className="text-gray-600 mb-8">
              Our free skin care routine quiz was developed by dermatologists to accurately diagnose your skin type 
              and prescribe a custom skin care routine in their medical practices. Now you can use the same quiz 
              they use in their offices and shop for products using your Baumann Skin Type!
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => setIsStarted(true)}
                className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-full
                         hover:bg-pink-600 transition-colors duration-200 shadow-md
                         focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              >
                Start Skin Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <Header />

      {/* Quiz Container */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-pink-100 rounded-full">
              <div 
                className="h-2 bg-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-gray-600">
              Câu {currentQuestion + 1} / {questions.length}
            </p>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </h2>
            
            {/* Options */}
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
                  className={`w-full p-4 text-left rounded-lg border 
                           transition-colors duration-200 focus:outline-none focus:ring-2 
                           focus:ring-pink-500 focus:ring-opacity-50
                           ${answers[currentQuestion] === option.id
                             ? 'bg-pink-100 border-pink-500 text-pink-700'
                             : 'border-pink-200 hover:bg-pink-50 text-gray-700'
                           }`}
                >
                  <span className={`font-medium ${
                    answers[currentQuestion] === option.id ? 'text-pink-700' : 'text-pink-600'
                  }`}>
                    {option.id}.
                  </span>
                  <span className="ml-2">{option.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {/* Back Button */}
            <button
              onClick={() => {
                if (currentQuestion === 0) {
                  setIsStarted(false);
                } else {
                  setCurrentQuestion(prev => prev - 1);
                }
              }}
              className="px-6 py-2 rounded-full font-medium
                       bg-pink-100 text-pink-600 hover:bg-pink-200
                       transition-colors duration-200 focus:outline-none"
            >
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
                Back
              </div>
            </button>

            {/* Next/Submit Button */}
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-6 py-2 rounded-full font-medium
                         bg-pink-500 text-white hover:bg-pink-600
                         transition-colors duration-200 focus:outline-none"
              >
                <div className="flex items-center">
                  Next
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </button>
            ) : (
              <button
                onClick={() => {
                  // Handle quiz completion
                  console.log('Quiz completed!', answers);
                }}
                disabled={answers.includes(null)}
                className={`px-6 py-2 rounded-full font-medium
                         transition-colors duration-200 focus:outline-none
                         ${answers.includes(null) 
                           ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                           : 'bg-pink-500 text-white hover:bg-pink-600'
                         }`}
              >
                {answers.includes(null) ? 'Please Answer All Questions' : 'Submit'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinTypeTest;
