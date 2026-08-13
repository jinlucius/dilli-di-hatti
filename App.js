import React from "react";
import { ScrollView } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import HeroHeader from "./src/components/Heroheader";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={["left", "right", "bottom"]}
        style={{ flex: 1, backgroundColor: "#FFF8F5" }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeroHeader />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}