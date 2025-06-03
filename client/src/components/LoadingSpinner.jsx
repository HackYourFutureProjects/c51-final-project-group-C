import { useLoading } from "../context/LoadingContext";

const LoadingSpinner = () => {
  const { isLoading, loadingMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white p-5 rounded-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-accent"></div>
        {loadingMessage && (
          <p className="mt-3 text-gray-700">{loadingMessage}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
