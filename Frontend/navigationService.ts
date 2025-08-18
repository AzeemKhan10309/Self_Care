// NavigationService.ts
import { createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "./Types/navigation";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
  screen: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    // @ts-ignore
     navigationRef.navigate(screen, params);
  }{
    console.log("Navigation not ready yet!");
  }
}
