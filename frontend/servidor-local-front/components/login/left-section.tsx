import { BadgeCheckIcon } from "@/assets/icons/badge-check";
import { SecurityIcon } from "@/assets/icons/security-icon";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const LeftSection = () => {
    return (
        <div className="w-1/2  flex flex-col justify-center px-10 gap-4">
            <Badge variant="secondary">Precision Concierge Service</Badge>

            <h1 className="text-6xl font-bold">Elevate Your Standard of Service</h1>

            <p className="text-lg font-normal text-gray-600">
                Join Servidor Local to experience a curated ecosystem connecting
                discerning clients with elite professional and premier companies.
            </p>

            <div className="flex justify-evenly gap-5 w-full">
                <Card className="px-3 py-7">
                    <CardHeader>
                        <BadgeCheckIcon />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="font-semibold">Vetted Network</CardTitle>
                        <CardDescription>
                            Exclusive access to top-tier providers and clients
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card className="px-3 py-7">
                    <CardContent>
                        <CardHeader>
                            <SecurityIcon />
                        </CardHeader>
                        <CardTitle className="font-semibold">Secured Platform</CardTitle>
                        <CardDescription>
                            Enterprise-grade security for all your transactions and data.
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
