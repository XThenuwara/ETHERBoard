const WebSocket = require('ws');

// websocket example to get new block headers
const ws = new WebSocket('wss://ethereum-rpc.publicnode.com');

ws.on('open', () => {

    const subscriptionRequest = {
        id: 1,
        method: 'eth_subscribe',
        params: ['newHeads'],
    };

    ws.send(JSON.stringify(subscriptionRequest));
});

ws.on('message', (data) => {
    const response = JSON.parse(data);
    console.log('Received message:', response);

    if (response.id === 1 && response.result) {
        console.log('Subscription successful. Subscription ID:', response.result);
    }

    if (response.method === 'eth_subscription' && response.params) {
        const blockHeader = response.params.result;
        console.log('New Block Header:', blockHeader);
    }
});

ws.on('error', (error) => {
    console.error('WebSocket error:', error);
});

ws.on('close', () => {
    console.log('WebSocket connection closed');
});
