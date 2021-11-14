import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List.js';
import Error from '../components/Error';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
} from '../services/services';

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState([]);
  const [poplarMovies, setPoplarMovies] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [poplarTvShows, setPoplarTvShows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData()
      .then(([upCom, popMov, famMov, popTv]) => {
        const pathPrefix = 'https://image.tmdb.org/t/p/w500';
        const imagesArray = [];
        upCom.forEach(movie => {
          imagesArray.push(pathPrefix + movie.poster_path);
        });
        setMoviesImages(imagesArray);
        setPoplarMovies(popMov);
        setFamilyMovies(famMov);
        setPoplarTvShows(popTv);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <React.Fragment>
      {loader ? (
        <ActivityIndicator size="large" color="#A32A0D" />
      ) : error ? (
        <Error />
      ) : (
        <ScrollView style={styles.scrollView}>
          {/* Upcoming movies images slider */}
          <View style={styles.sliderContainer}>
            <SliderBox
              parentWidth={width}
              sliderBoxHeight={(hight / 3) * 2}
              autoplay={true}
              circleLoop={true}
              images={moviesImages}
              dotStyle={styles.sliderDots}
            />
          </View>
          {/* Poplar movies carousel */}
          <View style={styles.carousel}>
            <List
              navigation={navigation}
              title="Poplar movies"
              content={poplarMovies}
            />
          </View>
          {/* family movies carousel */}
          <View style={styles.carousel}>
            <List
              navigation={navigation}
              title="Family movies"
              content={familyMovies}
            />
          </View>
          {/* Poplar TV shows carousel */}
          <View style={styles.carousel}>
            <List
              navigation={navigation}
              title="Poplar TV shows"
              content={poplarTvShows}
            />
          </View>
        </ScrollView>
      )}
    </React.Fragment>
  );
};

const getData = () => {
  return Promise.all([
    getUpcomingMovies(),
    getPopularMovies(),
    getFamilyMovies(),
    getPopularTv(),
  ]);
};

const dimensions = Dimensions.get('screen');
const hight = dimensions.height;
const width = dimensions.width;

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderDots: {
    width: 0,
    height: 0,
    borderRadius: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
