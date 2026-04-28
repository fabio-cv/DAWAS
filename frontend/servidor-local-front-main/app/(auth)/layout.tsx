export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div id="main-header" className="bg-gray-800 text-white p-4">
        Cabecalho
      </div>
      {children}
    </>
  );
}
