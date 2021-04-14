export class WifiUtils {
    constructor(newWifiList) {
        this.wifiList = newWifiList;
    }

    async getBeacons() {

        let piMACAddrs = {
            1: 'B8:27:EB',
            2: 'DC:A6:32',
            3: 'E4:5F:01'
        };

        let piHotspots = [];

        this.wifiList.forEach(function (hotspot, index) {
            for (let i = 0; i < 3; i++) {
                if ((hotspot.BSSID).slice(0, 8).toUpperCase() === piMACAddrs[i]) {
                    piHotspots.push(hotspot);
                }
            };
        });

        if (piHotspots) {

            let fetchBody = {'beacons': piHotspots}

            const response = await fetch(`https://kmm29lgrb5.execute-api.us-east-1.amazonaws.com/dev/verify-beacons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': 'gKVDCeos6l9ZzgYMjb0F9R1IGXcOoyM66R2aMn79',
                },
                body: JSON.stringify(fetchBody),
            });

            if (response.ok) {
                piHotspots = response.json();
            } else {
                piHotspots = "Error" // TODO
            }
        }

        return piHotspots;
    }
}
