self.addEventListener("push", event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; }
  catch (_) { data = {title:"Therapist Monitor", body:event.data ? event.data.text() : "通知を受信しました"}; }

  // Works with ordinary Web Push payloads and Apple's declarative Web Push format.
  if (data.web_push === 8030 && data.notification) {
    event.waitUntil(self.registration.showNotification(
      data.notification.title || "Therapist Monitor",
      {
        body: data.notification.body || "",
        icon: "icon-192.png",
        badge: "icon-192.png",
        data: { url: data.notification.navigate || "./" }
      }
    ));
    return;
  }

  event.waitUntil(self.registration.showNotification(
    data.title || "Therapist Monitor",
    {
      body: data.body || "変更を検知しました。",
      icon: "icon-192.png",
      badge: "icon-192.png",
      data: { url: data.url || "./" }
    }
  ));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url ? event.notification.data.url : "./";
  event.waitUntil(clients.openWindow(url));
});
