import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  Animated,
} from 'react-native';

import foodStyles from './Foodsection.style';

/* ------------------------------------------------------------------ */
/*  DATA                                                                */
/*  image: null for now — replace with require('../../../assets/foods/xyz.png')  */
/*  once your actual asset files are ready. Nothing else needs to change. */
/* ------------------------------------------------------------------ */

const FOOD_ITEMS = [
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    image: null, // require('../../../assets/foods/butter-chicken.png')
    rating: 4.7,
    reviews: 120,
    price: 320,
    deliveryTime: '30 min',
    isVeg: false,
  },
  {
    id: 'paneer-tikka',
    name: 'Paneer Tikka',
    image: null, // require('../../../assets/foods/paneer-tikka.png')
    rating: 4.5,
    reviews: 98,
    price: 260,
    deliveryTime: '25 min',
    isVeg: true,
  },
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    image: null, // require('../../../assets/foods/chicken-biryani.png')
    rating: 4.8,
    reviews: 210,
    price: 280,
    deliveryTime: '35 min',
    isVeg: false,
  },
  {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    image: null, // require('../../../assets/foods/dal-makhani.png')
    rating: 4.4,
    reviews: 76,
    price: 220,
    deliveryTime: '20 min',
    isVeg: true,
  },
  {
    id: 'tandoori-momos',
    name: 'Tandoori Momos',
    image: null, // require('../../../assets/foods/tandoori-momos.png')
    rating: 4.6,
    reviews: 143,
    price: 180,
    deliveryTime: '22 min',
    isVeg: true,
  },
];

/* ------------------------------------------------------------------ */
/*  VEG / NON-VEG BADGE (plain View + dot, no SVG)                     */
/* ------------------------------------------------------------------ */

const VegBadge = React.memo(function VegBadge({ isVeg }) {
  return (
    <View
      style={[
        foodStyles.vegBadge,
        { borderColor: isVeg ? '#2E7D32' : '#C62828' },
      ]}
    >
      <View
        style={[
          foodStyles.vegBadgeDot,
          { backgroundColor: isVeg ? '#2E7D32' : '#C62828' },
        ]}
      />
    </View>
  );
});

/* ------------------------------------------------------------------ */
/*  IMAGE OR PLACEHOLDER                                               */
/*  Shows the real Image when available, otherwise a neutral           */
/*  placeholder block so the layout/UI is fully visible without        */
/*  real assets. Swap nothing here later — just fill `image` in data.  */
/* ------------------------------------------------------------------ */

const FoodImage = React.memo(function FoodImage({ source, name }) {
  if (!source) {
    return (
      <View style={foodStyles.foodImagePlaceholder}>
        <Text style={foodStyles.foodImagePlaceholderText} numberOfLines={1}>
          {name}
        </Text>
      </View>
    );
  }

  return (
    <Image source={source} style={foodStyles.foodImage} resizeMode="cover" />
  );
});

/* ------------------------------------------------------------------ */
/*  SINGLE FOOD CARD                                                    */
/* ------------------------------------------------------------------ */

const FoodCard = React.memo(function FoodCard({ item, onAdd }) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [isFavourite, setIsFavourite] = useState(false);

  const animateTo = useCallback(
    (toValue) => {
      Animated.spring(scaleValue, {
        toValue,
        friction: 7,
        tension: 90,
        useNativeDriver: true,
      }).start();
    },
    [scaleValue]
  );

  const handlePressIn = useCallback(() => animateTo(0.96), [animateTo]);
  const handlePressOut = useCallback(() => animateTo(1), [animateTo]);

  const handleToggleFavourite = useCallback(() => {
    setIsFavourite((prev) => !prev);
  }, []);

  const handleAdd = useCallback(() => {
    onAdd?.(item.id);
  }, [item.id, onAdd]);

  return (
    <Animated.View
      style={[foodStyles.cardShadow, { transform: [{ scale: scaleValue }] }]}
    >
      <Pressable
        style={foodStyles.card}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={item.name}
      >
        {/* Food image */}
        <View style={foodStyles.imageWrapper}>
          <FoodImage source={item.image} name={item.name} />

          <VegBadge isVeg={item.isVeg} />

          <Pressable
            style={foodStyles.favouriteButton}
            onPress={handleToggleFavourite}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={
              isFavourite ? 'Remove from favourites' : 'Add to favourites'
            }
          >
            <Text
              style={[
                foodStyles.favouriteIcon,
                isFavourite && foodStyles.favouriteIconActive,
              ]}
            >
              {isFavourite ? '♥' : '♡'}
            </Text>
          </Pressable>
        </View>

        {/* Details */}
        <View style={foodStyles.details}>
          <Text numberOfLines={1} style={foodStyles.foodName}>
            {item.name}
          </Text>

          <View style={foodStyles.metaRow}>
            <Text style={foodStyles.ratingText}>
              ⭐ {item.rating.toFixed(1)}{' '}
              <Text style={foodStyles.reviewText}>({item.reviews})</Text>
            </Text>
          </View>

          <View style={foodStyles.bottomRow}>
            <View>
              <Text style={foodStyles.priceText}>₹{item.price}</Text>
              <Text style={foodStyles.deliveryText}>{item.deliveryTime}</Text>
            </View>

            <Pressable
              style={foodStyles.addButton}
              onPress={handleAdd}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel={`Add ${item.name}`}
            >
              <Text style={foodStyles.addButtonText}>+ Add</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
});

/* ------------------------------------------------------------------ */
/*  SECTION                                                             */
/* ------------------------------------------------------------------ */

export default function FoodSection({
  title = 'Popular in North Indian',
  items = FOOD_ITEMS,
  onSeeAll,
  onAddItem,
}) {
  const renderItem = useCallback(
    ({ item }) => <FoodCard item={item} onAdd={onAddItem} />,
    [onAddItem]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <View style={foodStyles.sectionContainer}>
      <View style={foodStyles.headerRow}>
        <Text style={foodStyles.headerTitle}>{title}</Text>

        <Pressable
          onPress={onSeeAll}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="See all"
        >
          <Text style={foodStyles.seeAllText}>See All ›</Text>
        </Pressable>
      </View>

      <FlatList
        horizontal
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={foodStyles.listContent}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews={false}
      />
    </View>
  );
}