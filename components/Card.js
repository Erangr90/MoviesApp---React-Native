import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;
    const pressHandler = () => {
      navigation.navigate('Details', {id: item.id});
    };
    return (
      <TouchableOpacity style={styles.container} onPress={pressHandler}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{uri: pathPrefix + item.poster_path}}
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const pathPrefix = 'https://image.tmdb.org/t/p/w500';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
    marginBottom: 9,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    top: 10,
    textAlign: 'center',
  },
});

Card.propTypes = {
  item: PropTypes.object,
};

export default Card;
