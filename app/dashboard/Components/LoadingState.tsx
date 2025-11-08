export default function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blueSky mx-auto mb-4"></div>
        <p className="text-grayMuted">Cargando tu dashboard...</p>
      </div>
    </div>
  );
}
