import React, {useState}  from 'react';
import { StyleSheet, View } from 'react-native';

import { Layout, Text, Button } from '@ui-kitten/components';

const MainScreen = () => {

    const [isCheckedIn, setCheckedIn] = useState(false);

    return(

        <Layout style={styles.layout} level="1">
            <Text>Test</Text>
        </Layout>

        /*
        <View>

            <>
                {isCheckedIn ? (
                    <View>
                        <Text>Currently Checked-In To...</Text>
                        <Button title="Check-Out" onPress={() => {setCheckedIn(false)}}/>
                    </View>
                ) : (
                    <View>
                        <Text>Not Currently Checked-In</Text>
                        <Button title="Check-In" onPress={() => {setCheckedIn(true)}}/>
                    </View>
                )}
                </>
        </View>

         */


    );
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
