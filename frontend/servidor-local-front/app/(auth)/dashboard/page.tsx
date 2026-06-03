"use client"
import RatesCard from "@/components/dashboard/rates-card"
import ProposalReview  from "@/components/dashboard/request"
import Sidebar from "@/components/dashboard/sidebar"
import UpcomingScheduleCard from "@/components/dashboard/upcoming-schedule-card"
import { DashboardDataProvider } from "@/components/dashboard/dashboard-data-provider"
export default function Dashboard() {

    return (
        <DashboardDataProvider>
        <div className="bg-gray-200 h-screen flex w-full">
            <div>
                <Sidebar />
            </div>
            <div className="w-5/4 bg-gray-100 gap-10 pl-10">
                <h1 className="text-4xl font-bold pt-5">Dashboard</h1>
                <p className="text-gray-600">Manage your business sttings, rates and availability.</p>
                <div className="flex mt-5">
                    <div className="w-full mr-10">
                        <div className="flex flex-col  justify-between">
                            <div>
                                <RatesCard />
                            </div>
                            <div className="mt-10">
                                <ProposalReview />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <UpcomingScheduleCard />
                    </div>
                </div>
            </div>
        </div>
        </DashboardDataProvider>
    )
}
