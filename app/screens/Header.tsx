import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Image source={require('../../assets/images/vieri.png')} style={styles.logo} />
            {/* <View style={styles.nav}>
                <Text style={styles.navItem}>Acerca de Vieri</Text>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
    },
    logo: {
        width: 170,
        height: 50,
    },
    nav: {
        flexDirection: 'row',
    },
    navItem: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
});