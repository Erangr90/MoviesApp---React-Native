import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class Error extends React.PureComponent {
  render() {
    const {err1, err2} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{err1}</Text>
        <Text style={styles.text}>{err2}</Text>
      </View>
    );
  }
}

Error.propType = {
  err1: PropTypes.string,
  err2: PropTypes.string,
};

Error.defaultProps = {
  err1: 'Error',
  err2: 'Something went wrong',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'red',
  },
});

export default Error;
