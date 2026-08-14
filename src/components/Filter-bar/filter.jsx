import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

// Uses whichever icon library is already installed in the project.
// Expo projects:        import { MaterialIcons } from '@expo/vector-icons';
// Bare RN CLI projects: import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './filter.style';

// Enable smooth LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ---- Reusable filter option data (no repeated JSX) ----
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

const allOptions = [...sortOptions, ...specialOptions];

const FilterSortSection = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('loved'); // default: Most Loved

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-8)).current;

  const toggleFilter = () => {
    const opening = !showFilters;

    // Smooth height/expansion transition for the panel mount/unmount
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        240,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );

    // Chevron rotation: ⌄ -> ⌃
    Animated.timing(rotateAnim, {
      toValue: opening ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();

    // Fade + slight slide down for the panel content
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
    setSelectedFilter(option.id);
    // Panel stays open after selection
  };

  const chevronRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const activeOption = allOptions.find((opt) => opt.id === selectedFilter);
  const barLabel = activeOption ? activeOption.label : 'Sort';

  const renderOption = (option) => {
    const isActive = selectedFilter === option.id;
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
          <MaterialIcons
            name="check"
            size={13}
            color="#FFFFFF"
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.filterSection}>
      {/* ---- Compact filter bar ---- */}
      <TouchableOpacity
        style={styles.filterBar}
        onPress={toggleFilter}
        activeOpacity={0.85}
      >
        <View style={styles.filterBarContent}>
          <View style={styles.filterBarLeft}>
            <MaterialIcons name="tune" size={18} color="#FF6B00" style={styles.filterIcon} />
            <Text style={styles.filterText}>Filter</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.filterBarMiddle}>
            <MaterialIcons name="swap-vert" size={16} color="#171717" style={styles.sortIcon} />
            <Text style={styles.sortText} numberOfLines={1}>
              {barLabel}
            </Text>
          </View>

          <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
            <MaterialIcons name="expand-more" size={20} color="#171717" style={styles.chevron} />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* ---- Expandable filter panel ---- */}
      {showFilters && (
        <Animated.View
          style={[
            styles.filterPanel,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Sort By</Text>
          <View style={styles.optionsContainer}>
            {sortOptions.map(renderOption)}
          </View>

          <Text style={styles.sectionTitle}>Dilli Di Hatti Special</Text>
          <View style={styles.optionsContainer}>
            {specialOptions.map(renderOption)}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default FilterSortSection;