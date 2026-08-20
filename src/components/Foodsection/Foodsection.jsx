import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import Svg, { Path, Circle, Polyline } from 'react-native-svg';
import foodStyles, { COLORS } from './Foodsection.style';
import RecommendedFood from '../Foodsection/RecommendedFood/RecommendedFood';
// ↑ apne actual path ke hisaab se adjust karna

/* ------------------------------------------------------------------ */
/* DATA */
/* image: null for now — replace with require('../../../assets/foods/xyz.png') */
/* once your actual asset files are ready. Nothing else needs to change. */
/* ------------------------------------------------------------------ */
const FOOD_ITEMS = [
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    image: null, // require('../../../assets/foods/butter-chicken.png')
    orders: 1200,
    price: 320,
    deliveryTime: '30 min',
    isVeg: false,
  },
  {
    id: 'paneer-tikka',
    name: 'Paneer Tikka',
    image: null, // require('../../../assets/foods/paneer-tikka.png')
    orders: 850,
    price: 260,
    deliveryTime: '25 min',
    isVeg: true,
  },
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    image: null, // require('../../../assets/foods/chicken-biryani.png')
    orders: 10400,
    price: 280,
    deliveryTime: '35 min',
    isVeg: false,
  },
  {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    image: null, // require('../../../assets/foods/dal-makhani.png')
    orders: 999,
    price: 220,
    deliveryTime: '20 min',
    isVeg: true,
  },
  {
    id: 'tandoori-momos',
    name: 'Tandoori Momos',
    image: null, // require('../../../assets/foods/tandoori-momos.png')
    orders: 1500,
    price: 180,
    deliveryTime: '22 min',
    isVeg: true,
  },
];

/* ------------------------------------------------------------------ */
/* ORDER COUNT FORMATTER */
/* 1200 -> "1.2k orders" | 999 -> "999 orders" | 10000 -> "10k orders" */
/* ------------------------------------------------------------------ */
function formatOrderCount(count) {
  if (typeof count !== 'number' || Number.isNaN(count)) return null;

  if (count < 1000) {
    return `${count} orders`;
  }

  const thousands = count / 1000;
  // Drop trailing ".0" (e.g. 10.0k -> 10k) but keep e.g. 1.2k
  const rounded =
    Math.round(thousands * 10) % 10 === 0
      ? Math.round(thousands)
      : Math.round(thousands * 10) / 10;

  return `${rounded}k orders`;
}

/* ------------------------------------------------------------------ */
/* VEG / NON-VEG BADGE (plain View + dot, no SVG) */
/* ------------------------------------------------------------------ */
const VegBadge = React.memo(function VegBadge({ isVeg }) {
  return (
    <View
      style={[
        foodStyles.vegBadge,
        { borderColor: isVeg ? '#2e7d32' : '#C62828' },
      ]}
    >
      <View
        style={[
          foodStyles.vegBadgeDot,
          { backgroundColor: isVeg ? '#2e7d32' : '#C62828' },
        ]}
      />
    </View>
  );
});

/* ------------------------------------------------------------------ */
/* CART + CHECK ICON (line-art, matches reference: trolley with a */
/* circular checkmark badge). Pure stroke, no fill, no background — */
/* stays neutral dark so it never fights the orange theme. */
/* ------------------------------------------------------------------ */
const CartCheckIcon = React.memo(function CartCheckIcon({
  size = 15,
  color = '#2B2018',
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Trolley/cart outline */}
      <Path
        d="M2.5 3H4.5L5.9 12.6C6.02 13.47 6.76 14.12 7.63 14.12H16.7C17.53 14.12 18.25 13.52 18.4 12.7L19.6 6.2C19.72 5.53 19.21 4.92 18.53 4.92H5.3"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="8" cy="18" r="1.4" stroke={color} strokeWidth={1.4} />
      <Circle cx="16" cy="18" r="1.4" stroke={color} strokeWidth={1.4} />
      {/* Checkmark badge, top-right corner */}
      <Circle
        cx="19"
        cy="4.5"
        r="4"
        stroke={color}
        strokeWidth={1.3}
        fill="#FFFFFF"
      />
      <Polyline
        points="17.2,4.6 18.4,5.8 20.8,3.2"
        stroke={color}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
});

/* ------------------------------------------------------------------ */
/* IMAGE OR PLACEHOLDER */
/* Shows the real Image when available, otherwise a neutral */
/* placeholder block so the layout/UI is fully visible without */
/* real assets. Swap nothing here later — just fill image in data. */
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
/* SINGLE FOOD CARD */
/* NOTE: `recommendation` is a NEW optional prop. When not passed, */
/* behaviour is 100% identical to before (shows "X orders"). */
/* When passed (e.g. "Dilli Pick"), it replaces the orders line with */
/* "🔥 Dilli Pick" without touching anything else. */
/* ------------------------------------------------------------------ */
const FoodCard = React.memo(function FoodCard({ item, onAdd, recommendation }) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [isFavourite, setIsFavourite] = useState(false);

  const animateTo = useCallback(
    (toValue) => {
      Animated.spring(scaleValue, {
        toValue,
        friction: 7,
        tension: 90,
        // Native animated module isn't available on web, so JS-driven
        // animation is used there; native (iOS/Android) keeps the
        // performant native driver as before.
        useNativeDriver: Platform.OS !== 'web',
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

  const orderCountLabel = formatOrderCount(item.orders);
  // If a recommendation label is passed in, it takes priority over orders.
  const infoLabel = recommendation ? `🔥 ${recommendation}` : orderCountLabel;

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

          {infoLabel && (
            <View style={foodStyles.orderRow}>
              {!recommendation && (
                <CartCheckIcon size={15} color={COLORS.textPrimary} />
              )}
              <Text style={foodStyles.orderText}>{infoLabel}</Text>
            </View>
          )}

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
/* SECTION */
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
      <RecommendedFood />
    </View>
  
  );
}

// Named export so RecommendedFood.jsx (and anything else) can reuse the
// exact same card — image, veg badge, favourite, +Add, animation — without
// duplicating it. FoodSection above still works exactly as before.
export { FoodCard };