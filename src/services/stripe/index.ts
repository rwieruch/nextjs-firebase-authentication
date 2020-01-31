const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET);

export default stripe;
