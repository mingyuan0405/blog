//获取用户ip
export function getUserIP(getIp : any) {
    var myPeerConnection = (<any>window).RTCPeerConnection || (<any>window).mozRTCPeerConnection || (<any>window).webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;
    function iterateIP(ip:string) {
        if (!(<any>localIPs)[ip]) getIp(ip);
        (<any>localIPs)[ip] = true;
    }
    pc.createDataChannel("");
    pc.createOffer().then(function(sdp : any) {
        sdp.sdp.split('\n').forEach(function(line : any) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason : any) {

    });
    pc.onicecandidate = function(ice : any) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}