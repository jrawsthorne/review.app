import steem from 'steem';

steem.config.set('websocket', 'wss://testnet.steem.vc');
steem.config.set('address_prefix', 'STX');
steem.config.set('chain_id', '79276aea5d4877d9a25892eaa01b0adf019d3e5cb12a97478df3298ccdd01673');

const steemAPI = steem.api;


export default steemAPI;
