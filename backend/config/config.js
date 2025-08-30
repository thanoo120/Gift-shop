require('dotenv').config();

module.exports={
    port:process.env.port||5000,
    mongodb:{
        uri:process.env.MONGODB_URI || 'mongodb://localhost:27017/coffee-shop-app',
        options:{
            useNewUrlParser:true,
            useUnifieldTopology:true,
        }
    },
    auth0:{
        domain:process.env.AUTH0_DOMAIN,
        audience:process.env.AUTH0_AUDIENCE,
        clientId:process.env.AUTH0_CLIENT_ID,
        clientSecret:process.env.AUTH0_CLIENT_SECRET,
        issuer:`https://${process.env.AUTH0_DOMAIN}/`
    },
    cors:{
        origin:process.env.CLIENT_URL || 'https://localhost:5173',
        Credentials:true,
        optionSuccessStatus:200,
        methods:['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders:['Content-Type', 'Authorization']
    },
    security:{
        rateLimitWindowMs:15*60*1000,
        rateLimitMaxRequests:100,
        jwtAlgorithms:['RS256']
    },
    places: [
        'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
        'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
        'Mullaitivu', 'Vavuniya', 'Batticaloa', 'Ampara', 'Trincomalee',
        'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
        'Monaragala', 'Ratnapura', 'Kegalle'
    ],
     products: [
        'Laptop', 'Smartphone', 'Tablet', 'Headphones', 'Smart Watch',
        'Camera', 'Printer', 'Monitor', 'Keyboard', 'Mouse',
        'Router', 'Speaker', 'Power Bank', 'USB Drive', 'External HDD'
    ],
    
    deliveryTimes: ['10 AM', '11 AM', '12 PM']
}