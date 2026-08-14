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

const shadow = (elevation, opacity) => ({
  ...Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: opacity,
      shadowRadius: elevation,
    },
    android: {
      elevation,
    },
  }),
});

const styles = StyleSheet.create({
  // Wrapper for the whole filter+sort feature
  filterSection: {
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  // ---- Compact main bar ----
  filterBar: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    paddingHorizontal: 14,
    ...shadow(6, 0.06),
  },

  filterBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  filterBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  filterIcon: {
    marginRight: 6,
  },

  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.dark,
    letterSpacing: 0.1,
  },

  divider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },

  filterBarMiddle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  sortIcon: {
    marginRight: 5,
  },

  sortText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: COLORS.dark,
    flexShrink: 1,
  },

  chevron: {
    marginLeft: 8,
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
    ...shadow(8, 0.08),
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

  // ---- Option chips ----
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
    ...shadow(1, 0.03),
  },

  activeFilterOption: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
    ...shadow(5, 0.18),
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

  // ---- Dilli Di Hatti Special section ----
  specialSection: {
    marginTop: 4,
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