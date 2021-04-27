import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/actions/user";
import Colors from "../../constants/colors";
import {
  connectAsync,
  getProductsAsync,
  setPurchaseListener,
  IAPResponseCode,
  disconnectAsync,
  purchaseItemAsync,
  finishTransactionAsync,
} from "expo-in-app-purchases";

const skus = Platform.select({
  ios: ["20", "40", "120", "160"],
  android: [],
});

const Options = (props) => {
  const dispatch = useDispatch();
  const { coinAmount } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await connectAsync();
      const { responseCode, results } = await getProductsAsync(skus);
      if (responseCode === IAPResponseCode.OK) {
        setItems(results);
      }
      setIsLoading(false);
    })();
    setPurchaseListener(({ responseCode, results, errorCode }) => {
      // Purchase was successful
      if (responseCode === IAPResponseCode.OK) {
        results.forEach(async (purchase) => {
          if (!purchase.acknowledged) {
            dispatch(
              userActions.updateData({
                coinAmount: coinAmount + parseInt(purchase.productId),
              })
            );
            await finishTransactionAsync(purchase, true);
            props.goBack();
          }
        });
      } else if (responseCode === IAPResponseCode.USER_CANCELED) {
        console.log("User canceled the transaction");
      } else if (responseCode === IAPResponseCode.DEFERRED) {
        console.log(
          "User does not have permissions to buy but requested parental approval (iOS only)"
        );
      } else {
        console.warn(
          `Something went wrong with the purchase. Received errorCode ${errorCode}`
        );
      }
    });

    return () => {
      disconnectAsync();
    };
  }, []);

  const sorted = items.sort((a, b) => {
    const priceA = parseInt(a.price.replace("$", ""));
    const priceB = parseInt(b.price.replace("$", ""));
    return priceB - priceA;
  });

  if (isLoading) {
    return (
      <ActivityIndicator style={styles.indicator} color={Colors.primary} />
    );
  }

  const renderItem = (item, i) => {
    const src =
      i <= 1
        ? require("../../assets/coins_small.png")
        : require("../../assets/coins_large.png");
    return (
      <TouchableOpacity
        onPress={() => purchaseItemAsync(item.productId)}
        key={i}
        activeOpacity={0.7}
        style={styles.option}
      >
        <View style={styles.imgContainer}>
          <Image source={src} style={styles.img} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.pricePer}>{item.description}</Text>
        </View>

        <Text style={styles.price}>{item.price}</Text>
      </TouchableOpacity>
    );
  };
  return <>{sorted.reverse().map((item, i) => renderItem(item, i))}</>;
};

const styles = StyleSheet.create({
  option: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    aspectRatio: 4,
    borderRadius: wp("5%"),
    alignItems: "center",
    marginTop: "5%",
    paddingVertical: "5%",
    paddingHorizontal: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imgContainer: {
    height: "80%",
    aspectRatio: 1,
  },
  img: {
    height: "100%",
    width: "100%",
  },
  title: {
    fontFamily: "popB",
    fontSize: wp("4%"),
  },
  pricePer: {
    fontFamily: "popM",
    color: "gray",
    fontSize: wp("3.5%"),
  },
  price: {
    fontFamily: "popB",
    fontSize: wp("4%"),
  },
  indicator: {
    marginTop: "20%",
  },
});

export default Options;
