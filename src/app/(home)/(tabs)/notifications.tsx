import AnimationSection from "@/components/shared/AnimationSection";
import { View } from "@/components/shared/Themed";

export default function Notification() {
  return (
    <View className="bg-white h-full">
      <AnimationSection title="Seems there are no notifications ! Create some :) " animation={require('@/assets/animations/no-notifications.json')} />
    </View>
  );
}