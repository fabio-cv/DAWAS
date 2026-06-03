import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type CategoryType = {
  id: string | number;
  name?: string;
  nome?: string;
  icone: string;
  price?: string;
};

interface PedidoCardProps {
  title: string;
  description: string;
  image: string;
  category: CategoryType;
  text?: string;
}

export const PedidoCard = ({
  title,
  description,
  image,
  category,
  text = "Starting at",
}: PedidoCardProps) => {
  const displayPrice = category.price ?? "$89.00";

  return (
    <Card className="rounded-xl shadow-sm bg-white p-4 py-0">
      <CardHeader className="p-0 mb-2 relative -mx-4 -mt-0">
        <div className="h-45 w-full overflow-hidden">
          <div className="relative h-44 overflow-hidden bg-blue-50">
            <Image
              className="object-cover object-top opacity-50"
              src={image || "/placeholder.png"}
              alt={title}
              width={1920}
              height={1080}
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-3 rounded-full shadow-md text-blue-500">
              <span className="text-xl">{category.icone}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 px-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-medium text-slate-800">{title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-0 pb-4">
        <h4 className="font-semibold text-lg text-blue-600">
          <p className="font-semibold text-slate-500 text-sm">{text}</p>
          {displayPrice}
        </h4>

        <Button className="bg-blue-500 hover:bg-blue-600 rounded-xl px-6 py-3 font-bold h-auto">
          Browse Providers
        </Button>
      </CardFooter>
    </Card>
  );
};
