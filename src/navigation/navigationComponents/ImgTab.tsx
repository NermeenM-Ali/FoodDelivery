import React from 'react';
import { StyleSheet, View } from "react-native"
import IonIcon from 'react-native-vector-icons/Ionicons'
import colors from '../../assets/colors';
import { verticalScale } from '../../utils/Scaling';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ImgTab = ({ tabName, focused, index }: any) => {
  return (
    <View style={styles.container}>
      {
        tabName === "HomeStack" ?
          <IonIcon name="ios-home" size={20} color={focused ? colors.MAIN_COLOR : colors.DARK_GRAY} style={{ alignSelf: 'center' }} />
          :

          tabName === "OrdersStack" ?
            <MaterialIcons name="shopping-basket" size={20} color={focused ? colors.MAIN_COLOR : colors.DARK_GRAY} style={{ alignSelf: 'center' }} />
            :
            tabName === "AccountStack" ?
              <MaterialIcons name="account-circle" size={20} color={focused ? colors.MAIN_COLOR : colors.DARK_GRAY} style={{ alignSelf: 'center' }} />
              : tabName === "LoginStack" ?
                <MaterialIcons name="login" size={20} color={focused ? colors.MAIN_COLOR : colors.DARK_GRAY} style={{ alignSelf: 'center' }} />
                :
                tabName === "LocationStack" ?
                  <MaterialCommunityIcons name="google-maps" size={20} color={focused ? colors.MAIN_COLOR : colors.DARK_GRAY} style={{ alignSelf: 'center' }} />
                  :
                  null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(5),
    alignSelf: "center",
  }
})

export default ImgTab;

