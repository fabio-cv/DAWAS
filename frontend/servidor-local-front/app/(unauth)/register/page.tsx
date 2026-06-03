import { AuthLeftSection } from "@/components/auth/left-section";
import { RightSection } from "@/components/register/right-section";

export default function RegisterPage() {
  return (
    <div className="bg-gray-200 h-screen flex justify-between">
      <AuthLeftSection />
      <RightSection />
    </div>
  );
}
