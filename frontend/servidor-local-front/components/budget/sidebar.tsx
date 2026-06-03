import { ReactNode } from "react";

type CategoryItem = {
  key: string;
  name: string;
  icon: ReactNode;
};

interface SidebarProps {
  categories: CategoryItem[];
  activeCategory:string;
  onCategorySelect: (categoryKey: string) => void;
}

export default function Sidebar({ categories, activeCategory, onCategorySelect }: SidebarProps) {
  return (
    <aside className="flex h-full flex-col gap-10">
      <div className="rounded-3xl border border-slate-200 bg-[#fff] px-5 py-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[.15em] font-semibold text-slate-400">Parametrização</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Serviços</h2>
        </div>

        <nav className="flex flex-col gap-3">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => onCategorySelect(category.key)}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                activeCategory === category.key
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm">
                {category.icon}
              </span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white px-5 py-6">
        <div className="mb-5">
          <p className="text-sm uppercase tracking-[.15em] font-semibold text-slate-400">Suporte</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">Precisa de ajuda?</h3>
        </div>
        <p className="text-sm leading-6 text-slate-600">
          Clique em uma categoria para filtrar os serviços e use a busca para encontrar o que precisa mais rápido.
        </p>
      </div>
    </aside>
  );
}
