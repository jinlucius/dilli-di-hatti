import { StyleSheet, Platform } from 'react-native';

/* ------------------------------------------------------------------ */
/*  COLORS                                                              */
/* ------------------------------------------------------------------ */

export const COLORS = {
  background: '#FEF7F3',
  circleBackground: '#FFFFFF',
  orange: '#FF6B35',
  textPrimary: 'rgb(43, 32, 24)',
  textSecondary: 'rgb(154, 136, 119)',
  shadowNeutral: 'rgb(58, 42, 26)',
};

/* ------------------------------------------------------------------ */
/*  SIZING (needed by FlatList snap logic in Categories.js)            */
/* ------------------------------------------------------------------ */

export const SIZING = {
  cardWidth: 90,
  gap: 0,
};

/* ------------------------------------------------------------------ */
/*  STYLES                                                              */
/* ------------------------------------------------------------------ */

const categoriesStyles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: COLORS.background,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
    overflow: 'visible',
    borderRadius: 20,
    marginTop: -22,
  },

  /* LOGO */
  logoWrapper: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  logo: {
    width: 200,
    height: 100,
  },

  /* LIST */
  categoryList: {
    paddingLeft: 2,
    paddingRight: 20,
    alignItems: 'flex-start',
  },

  categoryWrapper: {
    width: 98,
    marginRight: 10,
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
  },

  pressableHitArea: {
    width: '100%',
    alignItems: 'center',
  },

  itemInner: {
    alignItems: 'center',
  },

  /* Fixed-size box that holds the image. Same footprint whether
     active or not — so nothing shifts when the circle fades in. */
  imageWrapper: {
    width: 82,
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  /* White circle + orange border + glow + shadow — fully transparent
     (opacity 0) when inactive, faded in via Animated when active. */
  circleBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 41,
    backgroundColor: COLORS.circleBackground,
    borderWidth: 2.5,
    borderColor: COLORS.orange,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.orange,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      },
      android: { elevation: 6 },
    }),
  },

  /* Food image — same size and position in both states */
  categoryImage: {
    width: 74,
    height: 74,
  },

  /* TITLE */
  categoryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },

  categoryTitleActive: {
    color: COLORS.orange,
    fontWeight: '700',
  },

  /* SELECTED INDICATOR */
  activeUnderline: {
    marginTop: 4,
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.orange,
  },
});

export default categoriesStyles;