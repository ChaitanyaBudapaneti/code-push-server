var config = {};
config.development = {
  //db credentials
  db: {
    username: "root",
    password: "admin",
    database: "codepush",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  
  qiniu: {
    accessKey: "",
    secretKey: "",
    bucketName: "",
    downloadUrl: "" //quini url
  },
  //local storage
  local: {
    storageDir: "C:/Users/Anurag/Documents/nodejs/store",
    //ap path
    downloadUrl: "http://192.168.10.27:3000/download"
  },
  common: {
    //coode push login secrect
    loginSecret: "CodePushServer",
    tryLoginTimes: 0,
    diffNums: 3,
    dataDir: "C:/Users/Anurag/Documents/nodejs/data",
    storageType: "local"
  },
  smtpConfig:{
    host: "",
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: ""
    }
  },
  //
  redis: {
    default: {
      host: "127.0.0.1",
      port: 6379,
      retry_strategy: function (options) {
        if (options.error.code === 'ECONNREFUSED') {
          // End reconnecting on a specific error and flush all commands with a individual error
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.times_connected > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.max(options.attempt * 100, 3000);
      }
    }
  }
}
config.production = Object.assign({}, config.development);
module.exports = config;
