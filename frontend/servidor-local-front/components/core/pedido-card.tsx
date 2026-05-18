import Image from "next/image";
import {
  Hammer,
  HouseWifi,
  Paintbrush,
  Snowflake,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface CategoriaType {
  id: string;
  nome: string;
  icone: string;
  iconColor?: string;
}

interface PedidoCardProps {
  title: string;
  desciption: string;
  image: string;
  category: CategoriaType;
  priceLabel?: string;
  priceValue?: string;
  buttonText?: string;
}

const categoryIcons: Record<string, LucideIcon> = {
  plumbing: Wrench,
  electrical_service: Zap,
  handyman: Hammer,
  format_paint: Paintbrush,
  format_pait: Paintbrush,
  ac_unit: Snowflake,
  home_iot_device: HouseWifi,
};

export const PedidoCard = (pedidoCardProps: PedidoCardProps) => {
  const CategoryIcon = categoryIcons[pedidoCardProps.category.icone];

  return (
    <Card className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col p-0">
        <div className="relative h-50 w-full shrink-0 overflow-hidden bg-slate-200">
          <Image 
            src={pedidoCardProps.image} 
            alt={pedidoCardProps.title}
            fill
            className="object-cover object-center opacity-45 saturate-50 transition-transform duration-500 ease-out group-hover:scale-110"
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-white/35 transition-colors duration-500 group-hover:bg-white/25" />
          
          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
            {CategoryIcon ? (
              <CategoryIcon
                className={`h-9 w-9 ${pedidoCardProps.category.iconColor || "text-blue-600"}`}
                aria-hidden="true"
              />
            ) : (
              <Image 
                src={pedidoCardProps.category.icone} 
                alt={pedidoCardProps.category.nome}
                width={40}
                height={40}
                className="object-contain"
              />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="mb-2 text-2xl font-bold leading-tight text-slate-950">
            {pedidoCardProps.title}
          </h3>

          <p className="mb-6 min-h-12 text-base leading-snug text-slate-500">
            {pedidoCardProps.desciption}
          </p>

          <div className="mt-auto flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
            <div>
              <p className="text-xs font-bold tracking-widest text-slate-400">
                {pedidoCardProps.priceLabel || "STARTING AT"}
              </p>
              <p className="text-2xl font-bold text-sky-600">
                {pedidoCardProps.priceValue || "$0.00"}
              </p>
            </div>

            <Button className="h-10 cursor-pointer rounded-lg bg-sky-600 px-5 text-sm font-bold text-white hover:bg-sky-700">
              {pedidoCardProps.buttonText || "Browse Providers"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};