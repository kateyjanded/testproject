import Json from '../../notifications.json';
import Notification from "./Notification";

export default class NotificationsCollection {
    private notifications: Notification[]
    public get Notifications(){
        return this.notifications
    }
    constructor(jsonFile: typeof Json) {
        this.notifications = jsonFile as Notification[]
    }
}