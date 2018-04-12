const env = {
  development: {
    baseURL: 'localhost:5555'
  },
  test: {
    baseURL: 'http://112.74.26.159:8231/'
  },
  joint: {
    baseURL: '//192.168.1.115:8008'
  },
  production: {
    baseURL: '//bot.valp.io'
  }
}

// console.log('____________________');
// console.log(process.env.ENV_NAME || process.env.NODE_ENV); 
// console.log('____________________');

export default env[process.env.ENV_NAME || process.env.NODE_ENV];
