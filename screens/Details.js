import React, {useState, useEffect} from 'react';
import {
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Modal,
  Pressable,
} from 'react-native';
import Error from '../components/Error';
import StarRating from 'react-native-star-rating';
import {getMovieById} from '../services/services';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';

// import Video from 'react-native-video';

const Details = ({route, navigation}) => {
  const {id} = route.params;
  const [details, setDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  const [modalView, setModalView] = useState(false);

  useEffect(() => {
    if (!details || !details.id) {
      getMovieById(id)
        .then(data => {
          setDetails(data);
        })
        .catch(err => {
          setError(String(err));
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [details]);

  const showVideo = () => {
    setModalView(!modalView);
  };

  return (
    <React.Fragment>
      {loader ? (
        <ActivityIndicator size="large" color="#A32A0D" />
      ) : error ? (
        <Error err1="" err2={error} />
      ) : (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{uri: pathPrefix + details.poster_path}}
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={showVideo} />
              </View>
              <Text style={styles.movieName}>{details.title}</Text>
              {details.genres.length > 0 && (
                <View style={styles.genresContainer}>
                  {details.genres.map(item => {
                    return (
                      <Text style={styles.genre} key={item.id}>
                        {item.name}
                      </Text>
                    );
                  })}
                </View>
              )}

              <StarRating
                disabled={true}
                maxStars={5}
                rating={details.vote_average / 2}
                fullStarColor={'gold'}
                starSize={30}
              />
              <Text style={styles.text}>{details.overview}</Text>
              <Text style={styles.release}>
                Release date:{' '}
                {dateFormat(details.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalView}>
            <View style={styles.videoModal}>
              <Video onClose={showVideo} />
            </View>
          </Modal>
        </View>
      )}
    </React.Fragment>
  );
};

const pathPrefix = 'https://image.tmdb.org/t/p/w500';

const dimensions = Dimensions.get('screen');
const hight = dimensions.height;

const styles = StyleSheet.create({
  image: {
    height: hight / 2.5,
  },
  movieName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  text: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
