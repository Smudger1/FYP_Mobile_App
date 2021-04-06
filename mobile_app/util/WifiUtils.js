export class WifiUtils {
    constructor(newWifiList) {
        this.wifiList = newWifiList;
    }

    getBeacons(){

        let piMACAddrs = {
            1 : 'B8:27:EB',
            2 : 'DC:A6:32',
            3 : 'E4:5F:01'
        };

        let piHotspots = [];

        this.wifiList.forEach(function (hotspot, index) {
            for (let i = 0; i < 3; i++){
                if ((hotspot.BSSID).slice(0,8).toUpperCase() === piMACAddrs[i] ){
                    piHotspots.push(hotspot);
                }
            };
        });

        // Query Backend server

        return piHotspots;
    }
}
