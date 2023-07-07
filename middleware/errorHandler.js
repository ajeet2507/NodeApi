const { constants } = require('../constants');
const errorHandler = (err,req,res,next)=>{
    const  statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title:'Validation Failed',message:err.message,stackTrack : err.stackTrack});
        break;
        case constants.NOT_FOUND:
            res.json({title:'Not Found',message:err.message,stackTrack : err.stackTrack})
        break;
        case constants.FORBIDDEN:
            res.json({title:'Forbidden',message:err.message,stackTrack : err.stackTrack})
        break;
        case constants.UNAUTHORIZED:
            res.json({title:'Unathorized',message:err.message,stackTrack : err.stackTrack})
        break;
        case constants.SERVER_ERROR:
            res.json({title:'Server Error',message:err.message,stackTrack : err.stackTrack})
        break;
        default:
            break;
    }
    
    
};

module.exports = errorHandler;