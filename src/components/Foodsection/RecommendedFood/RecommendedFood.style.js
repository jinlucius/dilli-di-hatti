import { StyleSheet, Platform } from 'react-native';

// ⚠️ If your project already has theme/color constants (e.g. theme.js,
// colors.js), import and reuse those instead of the literals below.
const COLORS = {
  orange: '#FF6B2C',
  darkText: '#2B211C',
  white: '#FFFFFF',
};

export default StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 8,
    backgroundColor: 'transparent',
    zIndex: 0, // ensure this section is above other content (e.g. FoodSection)
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16, // match existing FoodSection horizontal padding
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.darkText,
    flexShrink: 1,
    marginRight: 12,
  },

  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.orange,
  },

  listContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },

  // Wraps each FoodCard just to control horizontal gap between cards.
  // Does NOT touch FoodCard's own internal styling.
  cardWrapper: {
    marginRight: 14,
  },

  // --- Fallback-only styles ---
  // Only needed if FoodCard cannot be reused at all and a local card
  // has to be built from scratch. Prefer FoodCard's own styles first.
  fallbackCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 6px rgba(0,0,0,0.08)',
      },
    }),
  },

  recommendationText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.orange,
    marginTop: 2,
  },
});