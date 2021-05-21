export default async function makeRequest(body){
    const response = await fetch(`https://orange-puzzle-jet.glitch.me/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return response;
}
