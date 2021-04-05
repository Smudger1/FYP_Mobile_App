import React, {useState}  from 'react';

import PermissionsAndroid from "react-native";
import WifiManager from "react-native-wifi-reborn";


const requestFineLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Check-In Location Permission",
                message:
                    "COVID Check-In needs access to your fine location " +
                    "so you can check-in to the correct venue.",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Wifi Scanning Enabled");
            return true;
        } else {
            console.log("Wifi Scanning Denied");
            return false;
        }
    } catch (err) {
        console.warn(err);
    }
};

export async function getBeacons(props){

    await requestFineLocationPermission();

    const [wifiList, setWifiList] = useState(/* initialValue */); // you may provide an initial value (optional, defaults to undefined)

    WifiManager.setEnabled(true);
    WifiManager.reScanAndLoadWifiList().then((data) => {
        // update the state here
        setWifiList(data);
    });
    return wifiList;

    //for (const hotspot in wifiList){
    //    let hotspotMACAddr = hotspot.BSSID.slice(0, 7)
        //console.log(hotspotMACAddr);
        //if (hotspot.BSSID.slice(0, 7)){
    //        console.log(hotspot)
        //}
    //}
};
