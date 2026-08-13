import React from "react";
import { View } from "react-native";
import Banner from "./Banner/banner";
import Header from "./Header/Header";
import CategoriesSection from "./Categorie/Categoriessection";
import Foodsection from "./Foodsection/Foodsection";

const HeroHeader = ({ city = "Delhi", onProfilePress, onLocationPress }) => {
  return (
    <View>
      <Banner />
      <Header
        city={city}
        onProfilePress={onProfilePress}
        onLocationPress={onLocationPress}
      />
      <CategoriesSection />
      <Foodsection/>
    
    </View>
  );
};

export default HeroHeader;
