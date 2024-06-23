import SingleRestaurant from "@/components/restaurant-section/SingleRestaurant";
import SemiHeading from "@/components/section-heading/semi-heading";
import AnimationSection from "@/components/shared/AnimationSection";
import SearchBar from "@/components/shared/SearchBar";
import { View } from "@/components/shared/Themed";
import { useRestaurants } from "@/components/hooks/store/useRestaurantStore";
import { ScrollView } from "react-native";

export default function RestaurantScreen() {
  const { restaurants} = useRestaurants()
  return (
    <ScrollView className="bg-white flex flex-1 px-8 py-4 h-full">
      <SearchBar/>
      <View>
        <SemiHeading title="Recent Restaurants" showAll={false} showResults={true} results={restaurants.length > 0 ? restaurants.length : 0} headerLink="/restaurants" />
        {restaurants ? restaurants.map((restaurant, index) => (
          <SingleRestaurant key={index} {...restaurant} />
        )) : <AnimationSection title="Seems there are no restaurants ! Create some :) " animation={require('@/assets/animations/no-notifications.json')} />      }
      </View>
    </ScrollView>
  );
}