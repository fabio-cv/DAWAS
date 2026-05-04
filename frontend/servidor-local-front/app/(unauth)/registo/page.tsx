import { LeftSection } from "@/components/login/left-section";
import { RegistoForm } from "@/components/registo/form";

export default function LoginPage() {
  return (
    <div className="bg-gray-200 h-screen flex justify-between">
      
      <LeftSection/>
      
      <RegistoForm/>
    </div>
  );
}
