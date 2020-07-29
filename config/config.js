const path = require("path");

module.exports = {
    secret: 'SecretESDorg',
    dbconf: {
        dialect: 'mssql',
        host: "localhost",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    Database: 'esd', 
    Login: 'pomazafa',
    Password: 'pomazafaP1',
    cloudinaryConfig: {
        cloud_name: 'dmltbnspa',
        api_key: '645627975893984',
        api_secret: 'S30nTcpToYYogOROWNzjKFpUo9E'
    }
}