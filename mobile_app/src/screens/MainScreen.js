import React, {useState}  from 'react';
import { StyleSheet, View } from 'react-native';
import { IndexPath, Layout, Text, Button, Select, SelectItem } from '@ui-kitten/components';

import {styles} from '../styles'

const LocationSelector = () => {

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
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            {data.map(renderOption)}
        </Select>
    );

}

const MainScreen = () => {

    const [isCheckedIn, setCheckedIn] = useState(false);

    return(

        <Layout style={styles.container}>

            <Layout style={[styles.layout, {justifyContent: 'center'}]} level="2">
                <>
                    {isCheckedIn ? (
                        <View>
                            <Text style={styles.textStatus}>{isCheckedIn ? "Currently Checked-In To..." : "Not Currently Checked-In"}</Text>

                            <LocationSelector/>

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

            <Layout style={styles.layout} level="2">
                <Text>History, results, advice, etc</Text>
            </Layout>

        </Layout>
    );
}

export default MainScreen;
