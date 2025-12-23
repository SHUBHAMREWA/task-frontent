const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-purple-600 font-semibold text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
