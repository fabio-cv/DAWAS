export const Footer = () => {
  return (
    <footer className="sticky bottom-0 w-full bg-white px-6 py-4">
      <div className="bg-gray  px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-base  text-gray-400 tracking-wide">
          © 2024 Azure Meridian. Precision Concierge Service.
        </p>

        <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          Terms &nbsp; Privacy &nbsp; Provider FAQ &nbsp; Contact
        </p>
      </div>
    </footer>
  );
};