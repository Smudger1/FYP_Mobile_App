import DeviceStore from 'react-native-simple-store';
import makeRequest from "./fetchScript";

export class CheckInUtil{
    constructor() {
    }

    async getCheckInHistory(){

        console.log(await DeviceStore.get('FYP_DeviceID'))

        const response = await makeRequest({
            query: `
                query CheckInHistory($visitor: String!){
                  checkInsByUser(user: $visitor){
                    beacon{
                      venue{
                        venueName
                      }
                    }
                    dateIn
                    dateOut
                  }
                }`,
            variables: {
                "visitor": await DeviceStore.get('FYP_DeviceID'),
            }
        });

        if (response.ok){
            const res = await response.json();

            console.log(res.data)

            if (res.data.checkInsByUser){ // if not empty
                return res.data.checkInsByUser
            }
            else{
                return false
            }
        }
        else{
            return false
        }

    }

    async createNewCheckIn(beacon){

        const deviceID = await DeviceStore.get('FYP_DeviceID');

        console.log("deviceId", deviceID)

        const response = await fetch(`https://orange-puzzle-jet.glitch.me/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'gKVDCeos6l9ZzgYMjb0F9R1IGXcOoyM66R2aMn79',
            },
            body: JSON.stringify({ query: `
                    mutation CreateCheckIn($beacon: ID!, $user: String!){
                      createNewCheckIn(beacon: $beacon, user: $user){
                        success
                        message
                      }
                    }`,
                variables: {
                    "beacon": beacon,
                    "user": deviceID,
                }
            }),
        });

        if (response.ok){
            let res = await response.json();

            res = res.data.createNewCheckIn;

            if (res.success){
                return res.success
            }
            else{
                return res.success
            }
        }
        else{
            console.log("not ok")
            return false
        }
    }

    async checkOut(){

        console.log("Checking out ----------")

        const deviceID = await DeviceStore.get('FYP_DeviceID');
        const response = await fetch(`https://orange-puzzle-jet.glitch.me/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'gKVDCeos6l9ZzgYMjb0F9R1IGXcOoyM66R2aMn79',
            },
            body: JSON.stringify({ query: `
                    mutation CheckOut($id: ID!){
                      updateCheckOut(id: $id){
                        success
                        message
                      }
                    }`,
                variables: {
                    "id": deviceID,
                }
            }),
        });

        console.log(response)

        if (response.ok){
            let res = await response.json();

            console.log(res)

            res = res.data.updateCheckOut;

            console.log("res", res)

            if (res.success){
                return res.success
            }
            else{
                return res.success
            }
        }
        else{
            return false
        }
    }
}
