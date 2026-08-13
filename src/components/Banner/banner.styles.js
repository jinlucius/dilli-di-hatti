import { StyleSheet, Platform, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default StyleSheet.create({
  bannerWrapper: {
    width: "100%",
    height: 430,
    overflow: "hidden", // ⚠️ zaroori hai, warna dusra slide side me dikhega
    position: "relative",
    backgroundColor: "transparent",
  },

  /* ---------- Image track (slide hoti hai) ---------- */

  slideTrack: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 3, // ab 3 banners hai: prev + current + next
    height: 430,
  },

  slideItem: {
    width: SCREEN_WIDTH,
    height: 430,
  },

  banner: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },

  image: {},

  /* image ke upar sirf dark tint, koi text nahi (text ab alag layer me hai) */
  dimOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 8, 4, 0.22)",
  },

  /* ---------- Text overlay (image se independent, apna fade) ---------- */

  textOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    paddingBottom: 20,
    justifyContent: "flex-end", // content hamesha neeche chipka rahega
    zIndex: 15,
    // ⚠️ elevation yahan MAT lagana — Android pe elevation wali View apna
    // khud ka touch surface bana leti hai aur neeche wale slideTrack tak
    // finger ke touches pahunchne hi nahi deti (swipe kaam nahi karta).
  },

  navSpacer: {
    height: 118,
  },

  heroContent: {
    paddingHorizontal: 28 ,
  },

  logoBlock: {
    alignItems: "flex-start",
    marginBottom: 6,
  },

  tagline: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 36,
  },

  titleAccent: {
    color: "#FF6B35",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 6,
  },

  dividerLine: {
    width: 60,
    height: 1.5,
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  button: {
    marginTop: 18,
    backgroundColor: "#FF6B35",
    alignSelf: "flex-start",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 14,

    ...Platform.select({
      ios: {
        shadowColor: "#FF6B35",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },

  dotsContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 10,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 3,
  },

  dotActive: {
    backgroundColor: "#FF6B35",
    width: 16,
  },
});