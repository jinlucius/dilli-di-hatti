import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  fixedNav: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  upperNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    top: -10,
  },

  rightNav: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 70,
    height: 100,
    top: -5,
  },

  location: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },

  locationText: {
    marginLeft: 4,
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },

  profile: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.95)",
    justifyContent: "center",
    alignItems: "center",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  /* ---------- Search Row ---------- */

  navRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: -40,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 16,
    top: 10,
    paddingHorizontal: 14,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  searchBoxFocused: {
    borderWidth: 1,
    borderColor: "#FF6B35",
  },

  searchIcon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 19,
    color: "#222",
  },

  iconButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  /* ---------- Veg Switch ---------- */

  switchContainer: {
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    top: 10,
  },

  switchLabel: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    top: 0,
  },
});
