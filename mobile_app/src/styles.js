import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop:40,
        paddingHorizontal: 30,

        backgroundColor: '#fafafa',

        flex: 1,
        flexDirection: 'column',
    },
    layout: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    textStatus: {
        fontSize: 25,
        textAlign: 'center',
    },
    select: {
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: '#FFF',
    },
    directionCards: {
        backgroundColor: '#FFF',

        borderWidth: 2,
        borderColor: '#ababab',
        borderRadius: 7,

        flex:1,
        flexDirection: 'row',

        marginBottom: 15,
    },
    iconBox:{
        flex:1,

        paddingLeft: 10,
        paddingRight: 10,

        alignContent: 'center',
        justifyContent: 'center',

        borderRightWidth: 2,
        borderColor: '#ababab',
    },
    titleBox:{
        flex:5,

        justifyContent: 'center',

        padding: 10,
    }
});

export {styles}
