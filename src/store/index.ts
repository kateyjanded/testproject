import Vue from 'vue'
import Vuex from 'vuex'
import json from '../notifications.json'
import Notification from './Models/Notification'
import NotificationCollection from './Models/NotificationCollection'


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    NotificationsCollection: new NotificationCollection(json),
    ShowingNotifications: (new NotificationCollection(json)).Notifications,
    Start: 0,
    End: 0,
  },
  getters: { 
    start: state =>{
      if (state.ShowingNotifications.length > 0) {
        return 1
      } else {
        return 0;
      }
    },
    end: state =>{
      if (state.ShowingNotifications.length > 0 && state.ShowingNotifications.length < 30) {
        return state.ShowingNotifications.length
      } else if (state.ShowingNotifications.length > 0 && state.ShowingNotifications.length > 30) {
        return 30
      }
      return state.ShowingNotifications.length
    },
    total: state =>{
      return state.ShowingNotifications.length
    },
    ShowingNotification: state => {
      const notifications: Notification[] = []
      if (state.Start > 0) {
        for (let i = state.Start - 1; i < state.End; i++) {
          notifications.push(state.ShowingNotifications[i])
        }
      }
      return notifications
    },
    CanBackward: state =>{
      if (state.Start > 30) {
        return false
        }
      return true
    },
  },
  mutations: {
    AssignValues: state => {
      state.Start = store.getters.start
      state.End = store.getters.end
    },
    FilterByImportance: state => {
      const ImportantNotification: Notification[] = [] 
      for (let i = 0; i < state.NotificationsCollection.Notifications.length; i++) {
        if (state.NotificationsCollection.Notifications[i].Important) {
          ImportantNotification.push(state.NotificationsCollection.Notifications[i])
        }
      }
      state.ShowingNotifications = ImportantNotification
      state.Start = store.getters.start
      state.End = store.getters.end
    },
    CanForward: state=> {
      if (store.getters.total >= state.End + 30) {
        return false
      } else if (store.getters.total > state.End && store.getters.total < state.End + 30) {
        return false
      } else {
        return true
      }
    },
    NextPage: state=> {
      if (state.ShowingNotifications.length >= state.End + 30) {
        state.Start = state.End + 1
        state.End = state.End + 30
      } else if (state.ShowingNotifications.length > state.End && state.ShowingNotifications.length < state.End + 30) {
        state.Start = state.End + 1
        state.End = state.ShowingNotifications.length
      }
    },
    PreviousPage: state =>{
      if (state.Start > 30) {
        state.End = state.Start - 1
        state.Start = state.Start - 30
      }
    },
    FilterByRead: state => {
      const ImportantNotification: Notification[] = [] 
      for (let i = 0; i < state.NotificationsCollection.Notifications.length; i++) {
        if (state.NotificationsCollection.Notifications[i].read) {
          ImportantNotification.push(state.NotificationsCollection.Notifications[i])
        }
      }
      state.ShowingNotifications = ImportantNotification
      state.Start = store.getters.start
      state.End = store.getters.end
    },
    FilterByUnRead: state => {
      const ImportantNotification: Notification[] = []
      for (let i = 0; i < state.NotificationsCollection.Notifications.length; i++) {
        if (!state.NotificationsCollection.Notifications[i].read) {
          ImportantNotification.push(state.NotificationsCollection.Notifications[i])
        }
      }
      state.ShowingNotifications = ImportantNotification
      state.Start = store.getters.start
      state.End = store.getters.end
    },
    ShowAll:state=>{
      state.ShowingNotifications = state.NotificationsCollection.Notifications
      state.Start =  store.getters.start
      state.End =  store.getters.end
    },
    SearchWord: (state, payload) =>{
      const ImportantNotification: Notification[] = [] 
      payload = payload.toLowerCase()
      for (let i = 0; i < state.NotificationsCollection.Notifications.length; i++) {
        const text1 = state.NotificationsCollection.Notifications[i].Subject.toLowerCase()
        const text2 = state.NotificationsCollection.Notifications[i].Body.toLowerCase()
        if (text1.indexOf(payload) > -1 || text2.indexOf(payload) > -1) {
          ImportantNotification.push(state.NotificationsCollection.Notifications[i])
        }
      }
      state.ShowingNotifications = ImportantNotification
      state.Start =  store.getters.start
      state.End =  store.getters.end
    },
    Delete: (state, payload: Notification) =>{
      const b = state.NotificationsCollection.Notifications.indexOf(payload)
      state.NotificationsCollection.Notifications.splice(b, 1)
      if (state.ShowingNotifications.indexOf(payload) > -1) {
        state.ShowingNotifications.splice(state.ShowingNotifications.indexOf(payload), 1)
      }
      state.Start =  store.getters.start
      state.End =  store.getters.end
    },
    DeleteAll: state=>{
      for (let i = 0; i < state.NotificationsCollection.Notifications.length; i++) {
        const notification = state.NotificationsCollection.Notifications[i]
        if (notification.IsChecked) {
          state.NotificationsCollection.Notifications.splice(i, 1)
          i--
        }
      }
      for (let i = 0; i <  state.ShowingNotifications.length; i++) {
        const notification =  state.ShowingNotifications[i]
        if (notification.IsChecked) {
          state.ShowingNotifications.splice(i, 1)
          i--
        }
      }
      state.Start =  store.getters.start
      state.End =  store.getters.end
    },
    MarkAllAsRead: state=>{
      state.NotificationsCollection.Notifications.forEach(element => {
        if (element.IsChecked) {
          element.read = true
        }
      })
    },
    CheckAll: (state, payload: boolean) =>{
      for (let i = 0; i < store.getters.ShowingNotification.length; i++) {
        const element = store.getters.ShowingNotification[i];
        element.IsChecked = payload
        
      }
    }
  },
  actions: {
    SearchWord:(context, payload: string)=>{
      context.commit('SearchWord', payload)
    },
    Delete:(context, payload: Notification)=>{
      context.commit('Delete', payload)
    },
    OpenNotification:(context, payload: Notification) =>{
      context.commit('OpenNotification', payload)
    }
  },
  modules: {
  }
})
