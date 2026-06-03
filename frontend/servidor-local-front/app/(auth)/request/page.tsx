import BannerRequest from "@/components/banner-request/banner";
import NaveBar from "@/components/navbar/nav-request";
import { RequestTable } from "@/components/tabela/table";


export default function RequestPage() {

    return (
        <>
            <div className="max-w-6xl mx-auto w-full px-4 pt-4 sm:px-6 lg:px-8">
                <NaveBar />
            </div>
            <BannerRequest />
            <RequestTable />
        </>
    );
}
