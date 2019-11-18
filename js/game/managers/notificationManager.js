class NotificationManager {
  constructor() {
    this.initMembers()
  }

  initMembers = () => {
    this.notifs = new Map()
  }

  addNotif = string => {
    const id = performance.now()
    this.notifs.set(id, string)

    setTimeout(() => {
      this.notifs.delete(id)
    }, NOTIF_INTERVAL)
  }

  update = () => {
    let totalString = ''
    this.notifs.forEach(notif => (totalString += `${notif}<br/>`))
    notifDOM.innerHTML = totalString
  }
}
