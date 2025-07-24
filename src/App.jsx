// Main App Component
const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

const AppContent = () => {
  const { currentPath } = useRouter();
  const { isAuthenticated } = useAuth();

  // Set up global toast function
  const { showToast: globalShowToast } = useContext(ToastContext);
  showToast = globalShowToast;

  const renderPage = () => {
    switch (currentPath) {
      case '/signup':
        return <SignupPage />;
      case '/signin':
        return <SigninPage />;
      case '/dashboard':
        return (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        );
      case '/transfer':
        return (
          <ProtectedRoute>
            <TransferPage />
          </ProtectedRoute>
        );
      default:
        return isAuthenticated ? <DashboardPage /> : <SigninPage />;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
};

export default App;