export default function AuthLayoutRoute({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] bg-muted rounded-lg">
      {children}
    </div>
  );
}