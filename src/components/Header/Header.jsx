import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Switch } from "react-native";
import { Search, User, MapPin, Mic } from "lucide-react-native";
import styles from "./Header.styles";

const Header = ({ city = "Delhi", onProfilePress, onLocationPress }) => {
  const [focused, setFocused] = useState(false);
  const [isVeg, setIsVeg] = useState(true);

  return (
    <View style={styles.fixedNav}>
      <View style={styles.upperNav}>
        <Image
          source={require("../../../assets/Dilli di hatti.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.rightNav}>
          <TouchableOpacity style={styles.location} onPress={onLocationPress}>
            <MapPin size={21} color="#fff" />
            <Text style={styles.locationText}>{city}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profile} onPress={onProfilePress}>
            <User size={20} color="#222" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navRow}>
        <View style={[styles.searchBox, focused && styles.searchBoxFocused]}>
          <Search size={18} color="#999" style={styles.searchIcon} />

          <TextInput
            placeholder="Search food..."
            placeholderTextColor="#999"
            style={styles.input}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />

          <TouchableOpacity style={styles.iconButton}>
            <Mic size={18} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>{isVeg ? "Veg" : "Non Veg  "}</Text>

          <Switch
            value={isVeg}
            onValueChange={setIsVeg}
            trackColor={{ false: "#EF4444", true: "#22C55E" }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#EF4444"
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
