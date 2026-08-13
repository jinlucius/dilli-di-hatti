import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  Animated,
} from 'react-native';

import categoriesStyles, { SIZING } from './Categories.style';

/* ------------------------------------------------------------------ */
/*  DATA                                                                */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  { id: 'all', name: 'All', image: require('../../../assets/category/all.png') },
  { id: 'north-indian', name: 'North Indian', image: require('../../../assets/category/north-indian.png') },
  { id: 'chinese', name: 'Chinese', image: require('../../../assets/category/chinese.png') },
  { id: 'street-food', name: 'Street Food', image: require('../../../assets/category/street-food.png') },
  { id: 'pizza', name: 'Pizza', image: require('../../../assets/category/pizza.png') },
  { id: 'burger', name: 'Burger', image: require('../../../assets/category/burger.png') },
  { id: 'momos', name: 'Momos', image: require('../../../assets/category/momos.png') },
  { id: 'rolls', name: 'Rolls', image: require('../../../assets/category/rolls.png') },
  { id: 'biryani', name: 'Biryani', image: require('../../../assets/category/biryani.png') },
  { id: 'sweets', name: 'Sweets', image: require('../../../assets/category/sweets.png') },
  { id: 'beverages', name: 'Beverages', image: require('../../../assets/category/beverages.png') },
];

/* ------------------------------------------------------------------ */
/*  SINGLE CARD                                                        */
/* ------------------------------------------------------------------ */

const CategoryCard = React.memo(function CategoryCard({ item, isActive, onPress }) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const isPressed = useRef(false);

  // Drives the fade-in of the white circle / border / glow behind the image
  const circleOpacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  const restingScale = isActive ? 1.05 : 1;

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

  const handlePressIn = useCallback(() => {
    isPressed.current = true;
    animateTo(0.93);
  }, [animateTo]);

  const handlePressOut = useCallback(() => {
    isPressed.current = false;
    animateTo(restingScale);
  }, [animateTo, restingScale]);

  const handlePress = useCallback(() => onPress(item.id), [item.id, onPress]);

  React.useEffect(() => {
    if (!isPressed.current) animateTo(restingScale);
  }, [restingScale, animateTo]);

  // Smoothly fade the circular background in/out when selection changes
  React.useEffect(() => {
    Animated.timing(circleOpacity, {
      toValue: isActive ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [isActive, circleOpacity]);

  return (
    <View
      style={[
        categoriesStyles.categoryWrapper,
        isActive && { zIndex: 999, elevation: 20 },
      ]}
    >
      <Pressable
        style={categoriesStyles.pressableHitArea}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        hitSlop={8}
        // android_ripple={{ color: 'rgba(255,107,53,0.15)', borderless: true }}
        accessibilityRole="button"
        accessibilityState={{ selected: isActive }}
        accessibilityLabel={item.name}
      >
        <Animated.View
          style={[
            categoriesStyles.itemInner,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {/* Floating food image, with an animated circular
              background that only becomes visible when active */}
          <View style={categoriesStyles.imageWrapper}>
            <Animated.View
              pointerEvents="none"
              style={[
                categoriesStyles.circleBackground,
                { opacity: circleOpacity },
              ]}
            />
            <Image
              source={item.image}
              style={categoriesStyles.categoryImage}
              resizeMode="contain"
            />
          </View>

          <Text
            numberOfLines={1}
            style={[
              categoriesStyles.categoryTitle,
              isActive && categoriesStyles.categoryTitleActive,
            ]}
          >
            {item.name}
          </Text>

          {isActive && <View style={categoriesStyles.activeUnderline} />}
        </Animated.View>
      </Pressable>
    </View>
  );
});

/* ------------------------------------------------------------------ */
/*  SECTION                                                             */
/* ------------------------------------------------------------------ */

export default function CategoriesSection({
  categories = CATEGORIES,
  initialSelectedId = 'all',
  onSelectCategory,
}) {
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  const handleSelect = useCallback(
    (id) => {
      setSelectedId(id);
      onSelectCategory?.(id);
    },
    [onSelectCategory]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <CategoryCard
        item={item}
        isActive={item.id === selectedId}
        onPress={handleSelect}
      />
    ),
    [selectedId, handleSelect]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  const snapInterval = useMemo(() => SIZING.cardWidth + SIZING.gap, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: snapInterval,
      offset: snapInterval * index,
      index,
    }),
    [snapInterval]
  );

return (
    <View style={categoriesStyles.categoryContainer}>
      <FlatList
        style={{ flex: 1 }}
        horizontal
        data={categories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={categoriesStyles.categoryList}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        snapToAlignment="start"
        getItemLayout={getItemLayout}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews={false}
        ListHeaderComponent={
          <View style={categoriesStyles.logoWrapper}>
            <Image
              source={require('../../../assets/Dilli di hatti.png')}
              style={categoriesStyles.logo}
              resizeMode="contain"
            />
          </View>
        }
      />
    </View>
  );
}