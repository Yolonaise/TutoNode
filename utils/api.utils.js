exports.generateKey = function(appName){
    var index = Math.floor((Math.random() * 999999999)+ 1);
    return appName + index;
}