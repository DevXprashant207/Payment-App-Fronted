// Transfer Money Page
const TransferPage = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { navigate, transferUser } = useRouter();
  const { user } = useAuth();

  const handleTransfer = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }

    if (parseFloat(amount) > user.balance) {
      showToast('Insufficient balance', 'error');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast(`Successfully sent $${amount} to ${transferUser.firstName}`, 'success');
      navigate('/dashboard');
    } catch (error) {
      showToast('Transfer failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!transferUser) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mr-4"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Send Money</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Recipient Info */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {transferUser.firstName} {transferUser.lastName}
            </h2>
            <p className="text-gray-600">{transferUser.email}</p>
          </div>

          {/* Amount Input */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full text-2xl pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                min="0"
                step="0.01"
              />
            </div>
            <p className="text-sm text-gray-600">
              Available balance: ${user?.balance.toLocaleString()}
            </p>
          </div>

          {/* Send Button */}
          <button
            onClick={handleTransfer}
            disabled={loading || !amount}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Money</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
