import { StyleSheet, Platform } from 'react-native';

// ---- Dilli Di Hatti design tokens ----
const COLORS = {
  orange: '#FF6B00',
  orangeSoft: 'rgba(255, 107, 0, 0.08)',
  dark: '#171717',
  secondary: '#666666',
  lightBg: '#FFF8F3',
  border: '#EDEDED',
  white: '#FFFFFF',
};

// const shadow = (elevation, opacity) => ({
//   ...Platform.select({
//     ios: {
//       shadowColor: '#000000',
//       shadowOffset: { width: 0, height: elevation / 2 },
//       shadowOpacity: opacity,
//       shadowRadius: elevation,
//     },
//     android: {
//       elevation,
//     },
//   }),
// });

const styles = StyleSheet.create({
  filterSection: {
    paddingHorizontal: 16,
    marginBottom: -15,
    zIndex: 1, // ensure filter bar is above other content (e.g. FoodSection)
  },

  // ---- Row jo ab ScrollView ka contentContainerStyle hai ----
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },

  // ---- Filter / Veg / Non-Veg — fixed content-width (flex:1 hata diya, ScrollView me kaam nahi karta) ----
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginRight: 8,
    paddingHorizontal: 12,
    // ...shadow(3, 0.05),
  },

  // ---- Sort box — content ke hisaab se apne aap grow/shrink karega ----
  sortBox: {
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginRight: 8,
    paddingHorizontal: 10,
    // ...shadow(3, 0.05),
  },

  // Row ka aakhri box — right margin nahi chahiye
  lastBox: {
    marginRight: 0,
  },

  rowBoxIcon: {
    marginRight: 4,
  },

  rowBoxChevron: {
    marginLeft: 2,
  },

  rowBoxText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.dark,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 5,
  },

  // ---- Veg active ----
  vegBoxActive: {
    backgroundColor: 'rgba(15, 138, 15, 0.08)',
    borderColor: '#0F8A0F',
  },

  vegBoxActiveText: {
    color: '#0F8A0F',
  },

  // ---- Non-Veg active ----
  nonVegBoxActive: {
    backgroundColor: 'rgba(184, 34, 30, 0.08)',
    borderColor: '#B8221E',
  },

  nonVegBoxActiveText: {
    color: '#B8221E',
  },

  // ---- Selected count badge (Filter box ke andar) ----
  countBadge: {
    marginLeft: 4,
    minWidth: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },

  countBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.white,
  },

  // ---- Expandable panel ----
  filterPanel: {
    marginTop: 8,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 12,
    // ...shadow(8, 0.08),
  },

  sectionTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 10,
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },

  // ---- Option chips (panel ke andar) ----
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
    marginHorizontal: -4,
  },

  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    marginBottom: 8,
    minHeight: 36,
    // ...shadow(1, 0.03),
  },

  activeFilterOption: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
    // ...shadow(5, 0.18),
  },

  filterOptionText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: COLORS.secondary,
  },

  activeFilterOptionText: {
    color: COLORS.white,
    fontWeight: '700',
  },

  optionIcon: {
    marginRight: 5,
  },

  checkIcon: {
    marginLeft: 5,
  },

  specialOption: {
    backgroundColor: COLORS.orangeSoft,
    borderColor: COLORS.orange,
    borderWidth: 1.2,
  },

  specialOptionText: {
    color: COLORS.dark,
    fontWeight: '700',
  },
});

export default styles;