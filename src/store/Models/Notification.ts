
export default class Notification {
    public Subject: string
    public IsChecked: boolean
    public Body: string
    public Time: string
    public read: boolean
    public Important: boolean
    public IsOpen: boolean
    public sender: string
    constructor() {
        this.Subject=""
        this.IsChecked= false
        this.Body = ""
        this.Time = ""
        this.read = false
        this.Important = false
        this.IsOpen = false
        this.sender = ""
    }
}