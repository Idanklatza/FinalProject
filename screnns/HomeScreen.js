import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import axios from "axios";
import { UserContext } from "../App";
import Recommends from "../components/Recommends";
import { userDetails } from "../App";

//homeScreen
function HomeScreen() {
  const { userDetails, setUserDetails } = useContext(UserContext);

  const { userConnect, setUserConnect } = useContext(UserContext);

  const [dataApi, setDataAPI] = useState([]);

  async function NearByAPI(attractions, location) {
    let userRadius = 100;
    selectedOption = "car";
    if (selectedOption !== null) {
      if (selectedOption === "walking") {
        userRadius = 2500;
      } else if (selectedOption === "public") {
        userRadius = 5000;
      } else if (selectedOption === "car") {
        userRadius = 10000;
      }

      try {
        const requests = attractions.map((attraction) => {
          return axios.get(
            "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
            {
              params: {
                location: "32.109333,34.855499",
                radius: 10000,
                type: "bar",
                key: "AIzaSyDOI5owICVszKfksbNqLRRwHFh-RFQbeV0",
              },
            }
          );
        });

        const responses = await Promise.all(requests);
        const data = responses.map((response) => response.data.results);
        const allData = data.flat();
        const filteredDataList = allData.filter(
          (item) => item.rating !== undefined
        );
        setDataAPI(allData);
      } catch (error) {
        console.error(error);
        return error;
      }
    }
  }

  useEffect(() => {
    NearByAPI(["bar"], "a");
    console.log(userDetails);
  }, []);

  function logout() {
    setUserConnect(false);
  }
  return (
    <ImageBackground
      source={require("../assets/background/airBallon.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View>
        <Button title="Logout" onPress={logout}></Button>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.recommends}>
          <Text style={styles.text}>Hotels:</Text>
          <Recommends dataApi={dataApi} />
        </View>

        <View style={styles.recommends}>
          <Text style={styles.text}>Attractions:</Text>
          <Recommends dataApi={dataApi} />
        </View>

        <View key={"3"} style={styles.recommends}>
          <Text style={styles.text}>Restaurants:</Text>
          <Recommends dataApi={dataApi} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  scroll: {
    marginTop: "50%",
  },
  container: {
    paddingTop: "-30%",
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  recommends: {
    margin: 10,
  },
});
