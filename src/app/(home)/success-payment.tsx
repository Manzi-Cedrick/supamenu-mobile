import LogoHeader from "@/components/section-heading/logo-header";
import AnimationSection from "@/components/shared/AnimationSection";
import { View } from "@/components/shared/Themed";

export default function SuccessPayment() {
  return (
    <View className="bg-white h-full">
      <AnimationSection title="Wow ! Payment done, well done ! Welcome back " animation={require('@/assets/animations/payment-success.json')} />
      <LogoHeader />
    </View>
  );
}