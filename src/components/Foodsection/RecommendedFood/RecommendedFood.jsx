import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

// FoodCard lives INSIDE Foodsection.jsx (not its own file), so it must be
// a NAMED import. Adjust the path below to wherever your Foodsection.jsx
// actually is relative to this file — e.g. if your folders are:
//   components/Foodsection/Foodsection.jsx
//   components/Foodsection/RecommendedFood/RecommendedFood.jsx
// then this relative path ('../Foodsection') is correct as-is.
import { FoodCard } from '../Foodsection';

import styles from './RecommendedFood.style';

// Temporary local data — replace `image` with your existing asset imports/paths
const recommendedFoods = [
  {
    id: 'r1',
    name: 'Chicken Tikka',
    price: 280,
    deliveryTime: '25 min',
    isVeg: false,
    recommendation: 'Dilli Pick',
    image: null, // TODO: use existing image asset (require(...) or URL)
  },
  {
    id: 'r2',
    name: 'Paneer Butter Masala',
    price: 240,
    deliveryTime: '25 min',
    isVeg: true,
    recommendation: 'Dilli Pick',
    image: null,
  },
  {
    id: 'r3',
    name: 'Dal Makhani',
    price: 190,
    deliveryTime: '20 min',
    isVeg: true,
    recommendation: 'Dilli Pick',
    image: null,
  },
  {
    id: 'r4',
    name: 'Butter Chicken',
    price: 320,
    deliveryTime: '30 min',
    isVeg: false,
    recommendation: 'Dilli Pick',
    image: null,
  },
];

/**
 * RecommendedFood
 * Isolated, reusable section that renders below "Popular in North Indian".
 * Reuses the existing FoodCard component (image, veg badge, favourite, +Add,
 * animation, spacing all come from FoodCard itself).
 *
 * Props:
 *  - onSeeAllPress?: () => void   optional callback for "See All ›"
 *  - data?: array                 optional override for recommendedFoods
 */
const RecommendedFood = ({ onSeeAllPress, data }) => {
  const items = data ?? recommendedFoods;

  const handleSeeAllPress = () => {
    if (typeof onSeeAllPress === 'function') {
      onSeeAllPress();
    }
    // no-op fallback — safe even if prop is undefined, won't crash
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      {/*
        `recommendation` is an OPTIONAL prop on FoodCard.
        If FoodCard doesn't support it yet, see the explanation below
        the code for a minimal, backwards-compatible patch.
      */}
      <FoodCard item={item} recommendation={item.recommendation} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle} numberOfLines={1}>
          🌶️ Dilli Spices Recommended
        </Text>

        <Pressable onPress={handleSeeAllPress} hitSlop={10}>
          <Text style={styles.seeAll}>See All ›</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        // avoids gesture conflict with the parent vertical ScrollView
        nestedScrollEnabled
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default RecommendedFood;