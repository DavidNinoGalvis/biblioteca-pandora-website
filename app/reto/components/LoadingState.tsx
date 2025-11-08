export default function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blueSky mx-auto mb-4"></div>
        <p className="text-grayMuted">Cargando tu reto...</p>
      </div>
    </div>
  );
}
