self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{let d={};try{d=e.data?e.data.json():{}}catch(_){}
if(d.web_push===8030&&d.notification){e.waitUntil(self.registration.showNotification(d.notification.title||"Therapist Monitor",{body:d.notification.body||"",icon:"./icon-192.png",badge:"./icon-192.png",data:{url:d.notification.navigate||"./"}}));return}
e.waitUntil(self.registration.showNotification(d.title||"Therapist Monitor",{body:d.body||"プッシュ通知テストです。",icon:"./icon-192.png",badge:"./icon-192.png"}));});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(a=>a.length?a[0].focus():clients.openWindow("./")))});
