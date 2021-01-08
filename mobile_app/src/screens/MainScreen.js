import React, {useState}  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const MainScreen = () => {

    const [isCheckedIn, setCheckedIn] = useState(false);

    return(
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
    );
}

export default MainScreen;
