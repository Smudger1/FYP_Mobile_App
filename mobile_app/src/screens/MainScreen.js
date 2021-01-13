import React, {useState}  from 'react';
import { StyleSheet, Linking, View, TouchableOpacity  } from 'react-native';
import { IndexPath, Layout, Text, Button, Select, SelectItem } from '@ui-kitten/components';
import { Icon } from 'react-native-eva-icons';

import {styles} from '../styles'

const PinIcon = () => (
    <Icon name='pin-outline' width={24} height={24} fill='#000'/>
);
const InfoIcon = () => (
    <Icon name='info-outline' width={50} height={50} fill='#000'/>
);
const ClipBoardIcon = () => (
    <Icon name='clipboard-outline' width={50} height={50} fill='#000'/>
);
const ClockIcon = () => (
    <Icon name='clock-outline' width={50} height={50} fill='#000'/>
);

const adviceURL = "https://www.gov.uk/coronavirus";


const LocationSelector = (props) => {

    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    const data = [
        'The One Eyed Dog',
        'Fat Fox',
        'The Deco',
    ];

    const displayValue = data[selectedIndex.row];

    const renderOption = (title) => (
        <SelectItem title={title}/>
    );

    return(
        <Select
            style={styles.select}
            size="large"
            placeholder='Default'
            value={displayValue}
            disabled={props.disabled}
            accessoryLeft={PinIcon}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            {data.map(renderOption)}
        </Select>
    );

}

const MainScreen = ({navigation}) => {

    const [isCheckedIn, setCheckedIn] = useState(false);

    const loadInBrowser = () => {
        Linking.openURL(adviceURL).catch(err => console.error("Couldn't load page", err));
    };

    return(

        <Layout style={styles.container}>

            <Layout style={[styles.layout, {flex: 2,justifyContent: 'center'}]} level="2">
                <>
                    {isCheckedIn ? (
                        <View>
                            <Text style={styles.textStatus}>{isCheckedIn ? "Currently Checked-In To..." : "Not Currently Checked-In"}</Text>

                            <LocationSelector disabled="1"/>

                            <Button size='giant' status='warning' onPress={() => {setCheckedIn(false)}}>Check-Out</Button>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.textStatus}>Not Currently Checked-In</Text>

                            <LocationSelector/>

                            <Button size='giant' status='info' onPress={() => {setCheckedIn(true)}}>Check-In</Button>
                        </View>
                    )}
                </>
            </Layout>

            <Layout style={[styles.layout, {alignContent:'center'}]} level="2">

                <TouchableOpacity style={styles.directionCards} onPress={() => navigation.navigate('History')}>
                    <View style={styles.iconBox}><ClockIcon/></View>
                    <View style={styles.titleBox}><Text category="h4">Check-In History</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.directionCards} onPress={() => navigation.navigate('NewResult')}>
                    <View style={styles.iconBox}><ClipBoardIcon/></View>
                    <View style={styles.titleBox}><Text category="h4">Enter Test Result</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.directionCards} onPress={loadInBrowser}>
                    <View style={styles.iconBox}><InfoIcon/></View>
                    <View style={styles.titleBox}><Text category="h4">Check Advice</Text></View>
                </TouchableOpacity>
            </Layout>

        </Layout>
    );
}

export default MainScreen;
