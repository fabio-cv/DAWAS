import Image from "next/image";
import { Card, CardContent } from "../ui/card";

type ServiceCardProps = {
    title: string;
    description: string;
    price: string;
    image: string;
    priority?: boolean; // Adicionei como opcional para controle de performance
};

export const ServiceCard = ({
    title,
    description,
    price,
    image,
    priority = false,
}: ServiceCardProps) => {
    return (
        <Card className="rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition bg-white">
            <div className="relative h-40 w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    // RESOLUÇÃO DO ERRO: Informa ao Next.js o tamanho da imagem em diferentes telas
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={priority} // Ajuda no carregamento da imagem principal (LCP)
                    className="object-cover"
                />
            </div>

            <CardContent className="p-5 space-y-4">
                <div>
                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                        {title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">
                        {price.includes("-") || price.includes("$")
                            ? price.trim().startsWith("$") ? price : `$${price.trim()}`
                            : `$${Number(price).toFixed(2)}`
                        }
                    </span>

                    <button className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition">
                        Browse Providers
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};