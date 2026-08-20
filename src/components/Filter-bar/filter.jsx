import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import styles from './filter.style';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const sortOptions = [
  { id: 'first', label: 'First', icon: 'flash-on' },
  { id: 'newest', label: 'Newest', icon: 'new-releases' },
  { id: 'loved', label: 'Most Loved', icon: 'favorite' },
  { id: 'rated', label: 'Best Rated', icon: 'star' },
  { id: 'nearest', label: 'Nearest', icon: 'location-on' },
  { id: 'fastest', label: 'Fastest Delivery', icon: 'bolt' },
];

const specialOptions = [
  { id: 'delhiSpecial', label: 'Delhi Special', icon: 'location-city', isSpecial: true },
  { id: 'trending', label: 'Trending', icon: 'trending-up' },
  { id: 'chefsSpecial', label: "Chef's Special", icon: 'restaurant' },
  { id: 'popularNearYou', label: 'Popular Near You', icon: 'local-fire-department' },
];

const FilterSortSection = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(new Set(['loved']));

  const [isVegActive, setIsVegActive] = useState(false);
  const [isNonVegActive, setIsNonVegActive] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-8)).current;

  const toggleFilter = () => {
    const opening = !showFilters;

    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        240,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );

    Animated.timing(rotateAnim, {
      toValue: opening ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: opening ? 1 : 0,
      duration: opening ? 260 : 160,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: opening ? 0 : -8,
      duration: opening ? 260 : 160,
      useNativeDriver: true,
    }).start();

    setShowFilters(opening);
  };

  const handleSelect = (option) => {
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(option.id)) {
        next.delete(option.id);
      } else {
        next.add(option.id);
      }
      return next;
    });
  };

  const handleVegPress = () => {
    setIsVegActive((prev) => !prev);
    setIsNonVegActive(false);
  };

  const handleNonVegPress = () => {
    setIsNonVegActive((prev) => !prev);
    setIsVegActive(false);
  };

  const chevronRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const selectedCount = selectedFilters.size;

  const sortLabel =
    selectedCount === 0
      ? 'Sort'
      : selectedCount === 1
      ? sortOptions.concat(specialOptions).find((o) => selectedFilters.has(o.id))?.label
      : `${selectedCount} selected`;

  const renderOption = (option) => {
    const isActive = selectedFilters.has(option.id);
    const isSpecial = !!option.isSpecial;

    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.filterOption,
          isSpecial && !isActive && styles.specialOption,
          isActive && styles.activeFilterOption,
        ]}
        onPress={() => handleSelect(option)}
        activeOpacity={0.75}
        hitSlop={{ top: 4, bottom: 4, left: 2, right: 2 }}
      >
        <MaterialIcons
          name={option.icon}
          size={16}
          color={isActive ? '#FFFFFF' : isSpecial ? '#FF6B00' : '#666666'}
          style={styles.optionIcon}
        />
        <Text
          style={[
            styles.filterOptionText,
            isSpecial && !isActive && styles.specialOptionText,
            isActive && styles.activeFilterOptionText,
          ]}
          numberOfLines={1}
        >
          {option.label}
        </Text>
        {isActive && (
          <MaterialIcons name="check" size={13} color="#FFFFFF" style={styles.checkIcon} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.filterSection}>
      {/* ---- Filter | Sort | Veg | Non-Veg — ab horizontal scroll ---- */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topRow}
      >
        {/* ---- Filter box ---- */}
        <TouchableOpacity
          style={styles.rowBox}
          onPress={toggleFilter}
          activeOpacity={0.75}
        >
          <MaterialIcons name="tune" size={16} color="#171717" style={styles.rowBoxIcon} />
          <Text style={styles.rowBoxText}>Filter</Text>
          {selectedCount > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{selectedCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* ---- Sort box ---- */}
        <TouchableOpacity
          style={styles.sortBox}
          onPress={toggleFilter}
          activeOpacity={0.75}
        >
          <MaterialIcons name="swap-vert" size={16} color="#171717" style={styles.rowBoxIcon} />
          <Text style={styles.rowBoxText}>
            {sortLabel}
          </Text>
          <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
            <MaterialIcons name="expand-more" size={16} color="#171717" style={styles.rowBoxChevron} />
          </Animated.View>
        </TouchableOpacity>

        {/* ---- Veg box ---- */}
        <TouchableOpacity
          style={[styles.rowBox, isVegActive && styles.vegBoxActive]}
          onPress={handleVegPress}
          activeOpacity={0.75}
        >
          <View style={[styles.dot, { backgroundColor: '#0F8A0F' }]} />
          <Text style={[styles.rowBoxText, isVegActive && styles.vegBoxActiveText]}>
            Veg
          </Text>
        </TouchableOpacity>

        {/* ---- Non-Veg box ---- */}
        <TouchableOpacity
          style={[styles.rowBox, styles.lastBox, isNonVegActive && styles.nonVegBoxActive]}
          onPress={handleNonVegPress}
          activeOpacity={0.75}
        >
          <View style={[styles.dot, { backgroundColor: '#B8221E' }]} />
          <Text style={[styles.rowBoxText, isNonVegActive && styles.nonVegBoxActiveText]}>
            Non-Veg
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ---- Expandable filter panel ---- */}
      {showFilters && (
        <Animated.View
          style={[
            styles.filterPanel,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.sectionTitle}>Sort By</Text>
          <View style={styles.optionsContainer}>{sortOptions.map(renderOption)}</View>

          <Text style={styles.sectionTitle}>Dilli Di Hatti Special</Text>
          <View style={styles.optionsContainer}>{specialOptions.map(renderOption)}</View>
        </Animated.View>
      )}
    </View>
  );
};

export default FilterSortSection;