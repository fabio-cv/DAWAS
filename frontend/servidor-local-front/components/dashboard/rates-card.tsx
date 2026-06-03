"use client";

import { HourlyRateIcon } from "@/assets/icons/hourly-rate";
import { Button } from "../ui/button";
import StatCard from "./stat-card";
import { UrgencyFeeIcon } from "@/assets/icons/urgency-fee";
import { VolumeDiscountIcon } from "@/assets/icons/volume-discount";
import { useDashboardData } from "./dashboard-data-provider";

const formatPercent = (value: number) => {
  const normalized = value > 1 ? value / 100 : value;
  return `${(normalized * 100).toFixed(0)}%`;
};

export default function RatesCard() {
  const { rates } = useDashboardData();

  const hourlyRate = Number(rates?.preco_hora ?? 0);
  const urgencyFeeRaw = Number(rates?.taxa_urgencia ?? 0);
  const volumeDiscountRaw = Number(rates?.percentagem_desconto ?? 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Rates & Fees</h2>
          <Button className="text-sm bg-white font-medium text-sky-500 hover:text-sky-600">Edit</Button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={<HourlyRateIcon />} title="HOURLY RATE" value={`$${hourlyRate}/hr`} />
        <StatCard icon={<UrgencyFeeIcon />} title="URGENCY FEE" value={`+${formatPercent(urgencyFeeRaw)}`} />
        <StatCard icon={<VolumeDiscountIcon />} title="VOLUME DISCOUNT" value={`-${formatPercent(volumeDiscountRaw)}`} />
      </div>
    </div>
  );
}
