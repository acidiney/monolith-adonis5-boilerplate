export class BrowserNotificationService {
  static requestNotificationPermission() {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((value) => {
        console.log(value);
      });
    }
  }

  static notify(title, { body, icon }) {
    // if (typeof document.hidden !== "undefined") {
      // document.addEventListener("visibilitychange", function () {
        if (!document.hasFocus()) {
          if (window.Notification && Notification.permission === "granted") {
            const notification = new Notification(title, {
              body,
              icon,
            });

            notification.onclick = function () {
              window.focus();
            };
          }
        // }
      // });
    }
  }
}
