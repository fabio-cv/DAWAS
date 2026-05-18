import {
  ChevronLeft,
  ChevronRight,
  Hammer,
  Paintbrush,
  Plus,
  Snowflake,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import { PedidoCard } from "@/components/core/pedido-card";
import { Button } from "@/components/ui/button";

const pedidos = [
  {
    title: "Emergency Plumbing",
    desciption: "24/7 support for leaks, pipe bursts, and urgent drainage issues.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJzjNFKVkYoRW-cFm0Nx66Y7Gcc6DClPYIWTiHgU4WkFDbRHZc0wpoNyYuosnEao8KCAtNVbkpN5P6JLZroqg3SgpnmMUi5SxSVaCxLb9EmMvi1gbBTJP3BfJ7PTxi2yqjGOZTiYuJxHXJZHgCvcyqVNVhaneMlZznLW4xNGswK1O2Zma3im2163jdtwosfbiJCTzrihnk2wiS-G1eaXUrKVYoI-FGfJyXHLGzwZROY4X0_W5ZTmlyBIuaWWgqa02YBEsB2g5bAQg",
    category: {
      id: "1",
      nome: "Plumbing",
      icone: "plumbing",
      iconColor: "text-sky-600",
    },
    priceLabel: "STARTING AT",
    priceValue: "$89.00",
    buttonText: "Browse Providers",
  },
  {
    title: "Light Fixture Installation",
    desciption:
      "Professional installation for chandeliers, sconces, and recessed lighting.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtWnsRbWnDfW-0jAWaK23H82B2rf06FzQixQodqO1FhyLNj4XBAbk6Yesjfl2WvUAUgSQZ_xg5iIVXDaPJn6srAIxY0GdMizpEwNCDPrM9oz3QZtPg7UvXwCKOpiT8ua4wqXElbdCzH9m0dDVBuj3ssiEP6DIZ1pRuck6Qldfnj9eaPEtm9-IU23AMXDZ1Id5sOxWt5Af_FpVxjDGvY0IY67UQpL0fwSbspsQ-0D3HMZILnTLuuulCgUYixjPyAcwzGgpVBW0jd00",
    category: {
      id: "2",
      nome: "Electrical",
      icone: "electrical_service",
      iconColor: "text-orange-400",
    },
    priceLabel: "AVERAGE QUOTE",
    priceValue: "$120 - $250",
    buttonText: "Browse Providers",
  },
  {
    title: "Custom Cabinetry",
    desciption:
      "Bespoke storage solutions and repairs for your kitchen or living space.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS4GOwxc-ltvtzfW5oMfuhSxH00pLjAUcaVKp61MenDOtB5zVvnqb6yx7htY0HRAU0xeBWlnHNAqxH_K_aSzW2nUEmyBdy1qpah9FCf1vlzs8ufdOWxZFmOj3Uh0oLKy6kzgRY5YNbSzZDzIx-8g3pYcLtHInOE4OArB3sLokn9kjv_tSS9dixUYy1M8UjThfcim8pkny8RXtl7S8khnaJnrejpRP3693kSsOZhXEWDJ4fvXFePWTzEarvrE3DE25Cs1TAu3PS5-o",
    category: {
      id: "3",
      nome: "Carpentry",
      icone: "handyman",
      iconColor: "text-emerald-600",
    },
    priceLabel: "STARTING AT",
    priceValue: "$450.00",
    buttonText: "Browse Providers",
  },
  {
    title: "Interior Wall Painting",
    desciption: "Precision painting for single rooms or entire home interiors.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgZK_R-L89sPSPK74HgS8gowFAsTCVdr8RhKKYc-FAjhJjqmyvA7KICLh0mZ2NKcjNLW9DxyQHp1YJzLXm5ZBNPG_U9MSpgzD893-KbnXJI9mhPSlKuYCsd83UcuU__Gk_Y5cBLGGjOTNpA7rLgVTXungTYD5EEqB0kp2VSH3FoKQ8oTlDQCEE-dkSuCXhnrHAgTh7Xv2LAyJ5Bd7vlbJz7QUAok9vX9eSwcKVFUk2wsoY6lTao3Clv1dPTSjm0IKQozR5QMA6jzY",
    category: {
      id: "4",
      nome: "Painting",
      icone: "format_paint",
      iconColor: "text-rose-600",
    },
    priceLabel: "AVERAGE QUOTE",
    priceValue: "$2.50 / sqft",
    buttonText: "Browse Providers",
  },
  {
    title: "AC Maintenance",
    desciption: "Seasonal cleaning and efficiency checks for cooling systems.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC54XSR64kOH1CjtpKweOL4RYqt2x0Yo5fzp-sdOOIxKlCojzs0nCuA3gizfLW30Ytk8M8GHbZhFjZy79Rc2s6G8TlZQBK4ehH4_mkrSMcEg5sxV1lzpbcRZRD1z6RH7nhO3oJ8LOHnntKOEp7wPcd3U7Jurl3D0LiEkQz1yXCxENSAomq_n1_Py48a5fQ2hoeBDT1FbdEEKkb-mXsdz0ICNi6yawJuzKDtVgFZfeynMdUubKva4rDwhleIPRnM1tyj-0ZByYdGa9A",
    category: {
      id: "5",
      nome: "HVAC",
      icone: "ac_unit",
      iconColor: "text-violet-600",
    },
    priceLabel: "STARTING AT",
    priceValue: "$125.00",
    buttonText: "Browse Providers",
  },
  {
    title: "Smart Lock Setup",
    desciption:
      "Installation and synchronization of digital security locks and cameras.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbfChWCn2QJHwfTSp4Unrg6RHy6LKQkk5JjFDRPRLoMFqUdqNw22Vim0rZ4jEcaJmrWZ2WnW3y_8TOlLg8v3hVZ6jbQPVSglf-k1ta4jUFrLXoTWbzB3YbZf9dCkADrHapYgPyZJGJycfGt29A4h_vAqiagx0qfhSqE2juCSC4ltmWNK5p1UH264ofrMYpMYxoNAV2jWwJQrz9Tyf6VDPh7gbAa31ssNf4egwxXKh1sPJyXeN_3mZoZBgewrFb35T8DAxGZeVCLPE",
    category: {
      id: "6",
      nome: "Security",
      icone: "home_iot_device",
      iconColor: "text-slate-950",
    },
    priceLabel: "AVERAGE QUOTE",
    priceValue: "$150 - $300",
    buttonText: "Browse Providers",
  },
];

const categorias = [
  { label: "All Services", icon: Wrench, active: true },
  { label: "Plumbing", icon: Wrench },
  { label: "Electrical", icon: Zap },
  { label: "Carpentry", icon: Hammer },
  { label: "Painting", icon: Paintbrush },
  { label: "HVAC", icon: Snowflake },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto grid max-w-[1840px] gap-12 lg:grid-cols-[380px_1fr]">
        <aside className="space-y-8">
          <nav className="flex items-center gap-2 text-sm font-medium">
            <button
              className="cursor-pointer text-slate-500 hover:text-sky-700"
              type="button"
            >
              Home
            </button>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-sky-700">Services</span>
          </nav>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold">Service Categories</h2>
            <p className="mt-2 text-sm text-slate-500">Browse by trade</p>

            <div className="mt-6 space-y-2">
              {categorias.map((categoria) => (
                <button
                  key={categoria.label}
                  className={`flex h-12 w-full cursor-pointer items-center gap-4 rounded-xl px-4 text-left text-base font-medium ${
                    categoria.active
                      ? "bg-sky-50 text-sky-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                  type="button"
                >
                  <categoria.icon className="h-6 w-6" aria-hidden="true" />
                  {categoria.label}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold">Rating</h2>
            <label className="mt-6 flex cursor-pointer items-center gap-4 text-slate-600">
              <input
                className="h-6 w-6 cursor-pointer rounded border-slate-300 accent-sky-600"
                type="checkbox"
              />
              <span className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <span>& Up</span>
            </label>
          </section>
        </aside>

        <section className="min-w-0">
          <div className="group relative mb-12 overflow-hidden rounded-3xl bg-teal-800 px-12 py-16 text-white">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQ4xPVEgQs8_t9M7pACBXlYj6PVh5Ivua3XvIdtHoahgABzTmxf7uOdg7Eripr4G8rdCsAvUyaAvq7L9s58IklgtvLxck0uR-SMpFwcPSWCZQGmkzK3qgk2zhkhwjaMd7JHH0BmjM_XhXvpLBioNPOxzPWUi8Z6iwD6OWjl_i-WpR_qlMmC6G7QOJLUYrhNnioZ-uJRWTtJGPKdfScRirINOqI4Vb5Dun_iB14NCIHof_08LplX1A17ZJo8nZlMZn1p8iDmFYnkN0')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sky-950/80 to-sky-950/35" />
            <div className="relative max-w-2xl">
              <h1 className="text-5xl font-bold tracking-normal">
                HandyPro Services
              </h1>
              <p className="mt-5 text-2xl leading-snug text-white/95">
                Expert assistance for every corner of your home. Trusted
                professionals, guaranteed quality.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-9 xl:grid-cols-3">
            {pedidos.map((pedido) => (
              <PedidoCard key={pedido.category.id} {...pedido} />
            ))}
          </div>

          <div className="mt-20 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-lg text-slate-500">Showing 6 of 42 services</p>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="h-12 w-12 cursor-pointer rounded-xl p-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  className={`h-12 w-12 rounded-xl p-0 text-lg ${
                    page === 1
                      ? "cursor-pointer bg-sky-600 text-white hover:bg-sky-600 hover:text-white"
                      : "cursor-pointer border border-slate-200 bg-white text-slate-700 hover:bg-white hover:text-slate-700"
                  }`}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                className="h-12 w-12 cursor-pointer rounded-xl p-0"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Button className="fixed bottom-16 right-12 h-20 w-20 cursor-pointer rounded-full bg-sky-600 p-0 shadow-xl hover:bg-sky-700">
        <Plus className="h-9 w-9" />
      </Button>
    </main>
  );
}