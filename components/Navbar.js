import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../themes/Colors';

class Navbar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <Image
              style={styles.logo}
              source={require('../assets/images/movies.png')}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon
                name={'search-outline'}
                size={30}
                color={Colors.lightGray}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={40} color={Colors.white} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

Navbar.propTypes = {
  main: PropTypes.bool,
};
Navbar.defaultProps = {
  main: false,
};
const styles = StyleSheet.create({
  reg: {
    margin: 0,
  },
  logo: {
    height: 50,
    width: 50,
  },
  mainNav: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 7,
    alignItems: 'center',
  },
});

export default Navbar;
