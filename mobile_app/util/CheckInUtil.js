import DeviceStore from 'react-native-simple-store';

export class CheckInUtil{
    constructor() {
    }

    async getCheckInHistory(){

        console.log(await DeviceStore.get('FYP_DeviceID'))

        const response = await fetch(`https://orange-puzzle-jet.glitch.me/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: `
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
            }),
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
                    "user": this.deviceID,
                }
            }),
        });

        if (response.ok){
            const res = response.json().data;


            if (res.success){
                // return success or smt
            }
            else{
                // return error
            }
        }
        else{
            // return error
        }
    }

    async checkOut(id){
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
                    "id": id,
                }
            }),
        });

        if (response.ok){
            const res = response.json().data;

            if (res.success){
                // return success or smt
            }
            else{
                // return error
            }
        }
        else{
            // return error
        }
    }
}
