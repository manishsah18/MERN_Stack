const {createLogger, colorize, transports, format} = require('winston');

const databaseLogger = createLogger({
    transports: [
        new transports.File({ 
            filename: 'database.log',
            level: 'info',
            format: format.combine( format.timestamp(), format.json())
           }), 

      new transports.File({ 
          filename: 'database-error.log',
          level: 'error',
          format: format.combine( format.timestamp(), format.json())
         }),
      
    ],
  });

  module.exports = (databaseLogger);

//   colorize({ all:true }),