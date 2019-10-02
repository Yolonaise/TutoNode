export default function generateKey(appName: string) {
    var index = Math.floor((Math.random() * 999999999) + 1);
    return appName + index;
}