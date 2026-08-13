import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import styles from "./banner.styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.22; // itna drag karne pe hi banner change hoga

const BANNERS = [
  {
    image: require("../../../assets/banner 1.png"),
    tagline: "AUTHENTIC. DELICIOUS. DELHI.",
    titleLine1: "Taste Delhi's",
    titleLine2: "Hidden Food Gems",
    subtitle: "Order from the city's most loved restaurants",
    textStyle: {
      tagline: { color: "#fff" },
      title: { color: "#fff" },
      subtitle: { color: "#fff" },
    },
  },
  {
    image: require("../../../assets/banner 2.png"),
    tagline: "FRESH • FAST • AUTHENTIC",
    titleLine1: "Delhi's Underrated",
    titleLine2: "Food Gems",
    subtitle: "Hot meals delivered in minutes",
    textStyle: {
      tagline: { color: "#fff" },
      title: { color: "#fff" },
      subtitle: { color: "#fff" },
    },
  },
];

// helper: mod jo negative index ko bhi sahi se wrap kare
const mod = (n, m) => ((n % m) + m) % m;

// ---- sirf IMAGE (koi text nahi) — ye track me slide/swipe hoti hai ----
const BannerImage = ({ image }) => (
  <ImageBackground
    source={image}
    resizeMode="cover"
    style={styles.banner}
    imageStyle={styles.image}
    fadeDuration={0} // Android ka default native fade band, blink isi se aata tha
  >
    <View style={styles.dimOverlay} />
  </ImageBackground>
);

// ---- sirf TEXT (image se independent, apna fade timing) ----
const BannerText = ({ data }) => (
  <View style={styles.heroContent}>
    <View style={styles.logoBlock}>
      <Text style={[styles.tagline, data.textStyle.tagline]}>
        {data.tagline}
      </Text>
    </View>

    <Text style={[styles.title, data.textStyle.title]}>
      {data.titleLine1}
      {"\n"}
      <Text style={styles.titleAccent}>{data.titleLine2}</Text>
    </Text>

    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
    </View>

    <Text style={[styles.subtitle, data.textStyle.subtitle]}>
      {data.subtitle}
    </Text>

    <TouchableOpacity activeOpacity={0.8} style={styles.button}>
      <Text style={styles.buttonText}>Order Now</Text>
    </TouchableOpacity>
  </View>
);

const Banner = ({ interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevIndex = mod(currentIndex - 1, BANNERS.length);
  const nextIndex = mod(currentIndex + 1, BANNERS.length);

  // track 3-wide hai: [prev][current][next]. Isko center (current) pe
  // dikhane ke liye hamesha -SCREEN_WIDTH offset karna padta hai.
  const BASE_OFFSET = -SCREEN_WIDTH;

  const translateX = useRef(new Animated.Value(BASE_OFFSET)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  const timerRef = useRef(null);
  const isDragging = useRef(false);

  // ---------- text fade helper ----------
  const fadeTextOut = (cb) => {
    Animated.timing(textOpacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(cb);
  };

  const fadeTextIn = (delay = 600) => {
    setTimeout(() => {
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, delay);
  };

  // ---------- ek direction me transition complete karna ----------
  // direction: "next" | "prev"
  const goTo = (direction, fromValue) => {
    const target =
      direction === "next" ? BASE_OFFSET - SCREEN_WIDTH : BASE_OFFSET + SCREEN_WIDTH;

    fadeTextOut(() => {
      Animated.timing(translateX, {
        toValue: target,
        duration: 350,
        useNativeDriver: false, // 👈 native driver hi wajah thi ki image text ke upar aa jaati thi
      }).start(() => {
        setCurrentIndex((prev) =>
          direction === "next" ? mod(prev + 1, BANNERS.length) : mod(prev - 1, BANNERS.length)
        );
        // 👆 translateX ka reset yahan MAT karo — useLayoutEffect currentIndex
        // update hone ke BAAD (jab nayi prev/current/next images already
        // render ho chuki hoti hain) reset karega. Yahan turant reset karne se
        // ek frame ke liye purani image center pe dikh jaati thi = blink.
        fadeTextIn(600);
      });
    });
  };

  const snapBack = () => {
    Animated.spring(translateX, {
      toValue: BASE_OFFSET,
      useNativeDriver: false,
      friction: 8,
    }).start();
  };

  // ---------- autoplay ----------
  const startAutoplay = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isDragging.current) goTo("next");
    }, interval);
  };

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(timerRef.current);
  }, [interval]);

  useLayoutEffect(() => {
    translateX.setValue(BASE_OFFSET);
  }, [currentIndex]);

  // ---------- swipe gesture ----------
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 10 && Math.abs(g.dx) > Math.abs(g.dy),
      // parent ScrollView ko beech gesture me responder cheenne mat do,
      // warna swipe achanak ruk jaata hai
      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: () => {
        isDragging.current = true;
        clearInterval(timerRef.current); // drag ke dauran autoplay ruk jaye
      },

      onPanResponderMove: (_, g) => {
        // finger ke saath live follow, dono directions me
        translateX.setValue(BASE_OFFSET + g.dx);
      },

      onPanResponderRelease: (_, g) => {
        isDragging.current = false;

        if (g.dx <= -SWIPE_THRESHOLD) {
          // left swipe -> agla banner
          goTo("next");
        } else if (g.dx >= SWIPE_THRESHOLD) {
          // right swipe -> pichla banner
          goTo("prev");
        } else {
          // itna swipe nahi hua, wapas snap ho jao
          snapBack();
        }

        startAutoplay(); // timer restart, taaki turant dobara auto-slide na ho
      },

      onPanResponderTerminate: () => {
        isDragging.current = false;
        snapBack();
        startAutoplay();
      },
    })
  ).current;

  return (
    <View style={styles.bannerWrapper} {...panResponder.panHandlers}>
      {/* ---- IMAGE TRACK: swipe + auto-slide dono yahi handle karta hai ---- */}
      <Animated.View
        style={[styles.slideTrack, { transform: [{ translateX }] }]}
        
      >
        <View style={styles.slideItem}>
          <BannerImage image={BANNERS[prevIndex].image} />
        </View>
        <View style={styles.slideItem}>
          <BannerImage image={BANNERS[currentIndex].image} />
        </View>
        <View style={styles.slideItem}>
          <BannerImage image={BANNERS[nextIndex].image} />
        </View>
      </Animated.View>

      {/* ---- TEXT OVERLAY: image se independent, apna fade ---- */}
      <View style={styles.textOverlay} pointerEvents="box-none">
        <View style={styles.navSpacer} />
        <Animated.View style={{ opacity: textOpacity }}>
          <BannerText data={BANNERS[currentIndex]} />
        </Animated.View>
      </View>

      <View style={styles.dotsContainer}>
        {BANNERS.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

export default Banner;