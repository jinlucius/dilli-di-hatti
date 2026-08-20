import { StyleSheet, Platform } from 'react-native';

/* ------------------------------------------------------------------ */
/* COLORS */
/* ------------------------------------------------------------------ */
export const COLORS = {
  background: '#FFF8F3',
  cardBackground: '#FFFFFF',
  orange: '#FF6B35',
  textPrimary: '#2B2018',
  textSecondary: '#9A8877',
  shadowNeutral: '#3A2A1A',
  starYellow: '#FFA41C',
  placeholder: '#F3E7DD',
};

/* ------------------------------------------------------------------ */
/* STYLES */
/* ------------------------------------------------------------------ */
const foodStyles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: COLORS.background,
    paddingTop: 20,
    paddingBottom: 24,
  },

  /* HEADER */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.orange,
  },

  /* LIST */
  listContent: {
    paddingLeft: 18,
    paddingRight: 8,
  },

  /* CARD */
  cardShadow: {
    width: 200,
    marginRight: 16,
    borderRadius: 22,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: 'rgba(58,42,26,0.08)',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowNeutral,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 0 },
    }),
  },
  card: {
    borderRadius: 22,
    backgroundColor: COLORS.cardBackground,
    overflow: 'hidden',
  },

  /* IMAGE */
  imageWrapper: {
    width: '100%',
    height: 130,
    position: 'relative',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  /* Fallback shown when no real image asset is available yet */
  foodImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: COLORS.placeholder,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  foodImagePlaceholderText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  favouriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowNeutral,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  favouriteIcon: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  favouriteIconActive: {
    color: COLORS.orange,
  },
  vegBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  /* DETAILS */
  details: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
  },
  foodName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },

  /* ORDER COUNT ROW (new) — sits right under the food name, above rating */
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginLeft: 5,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  deliveryText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default foodStyles;