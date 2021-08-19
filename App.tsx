import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import colors from './src/assets/colors';
import MainNavigation from './src/navigation/mainNavigation';
import { store } from './src/redux/Configration';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.WHITE_COLOR} barStyle='dark-content' />
        <MainNavigation />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
