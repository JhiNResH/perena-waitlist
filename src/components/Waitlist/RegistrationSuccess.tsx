// import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  // const navigate = useNavigate();
  // 這裡可以從 state 或 API 獲取 referral code
  const referralCode = "EXAMPLE123";

  // const handleReturnHome = () => {
  //   navigate('/');
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-brand-cream">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-brand-purple">LFG! You're in</h2>
        <p className="mb-4">Thank you for joining our waitlist.</p>
        <p className="mb-4">Your referral code is:</p>
        <div className="text-2xl font-bold mb-4 text-brand-purple">{referralCode}</div>
        <p>Share this code with your friends to invite them!</p>
        {/* <button 
          onClick={handleReturnHome}
          className="px-6 py-2 bg-brand-purple text-white rounded hover:bg-opacity-90 transition-colors"
        >
          Return to Home
        </button> */}
        
      </div>
    </div>
  );
};

export default RegistrationSuccess;