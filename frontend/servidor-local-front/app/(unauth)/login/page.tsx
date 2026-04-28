import { LeftSection } from "@/components/login/left-section";
import { RightSection } from "@/components/login/rigth-section";

export default function LoginPage() {
  return (
    <div className="bg-gray-200 h-screen flex justify-between">
      
      <LeftSection/>
      
      <RightSection/>
    </div>
  );
}
