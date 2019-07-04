export default class LocalStorageUtils {
  static getSidebarToggled () {
    const value = window.localStorage.getItem('sidebarToggled')
    return value === 'true'
  }
  static setSidebarToggled (value) {
    window.localStorage.setItem('sidebarToggled', value)
  }
  static getSortField () {
    return window.localStorage.getItem('sortField')
  }
  static setSortField (value) {
    window.localStorage.setItem('sortField', value)
  }
  static getSortAscending () {
    return window.localStorage.getItem('sortAscending')
  }
  static setSortAscending (value) {
    window.localStorage.setItem('sortAscending', value)
  }
  static getWatchSelectedArcId () {
    const value = window.localStorage.getItem('watchSelectedArcId')
    if (isNaN(value)) {
      return null
    }
    return value
  }
  static setWatchSelectedArcId (value) {
    if (isNaN(value)) {
      value = null
    }
    window.localStorage.setItem('watchSelectedArcId', value)
  }
  static getWatchSelectedEpisodeId () {
    const value = window.localStorage.getItem('watchSelectedEpisodeId')
    if (isNaN(value)) {
      return null
    }
    return value
  }
  static setWatchSelectedEpisodeId (value) {
    if (isNaN(value)) {
      value = null
    }
    window.localStorage.setItem('watchSelectedEpisodeId', value)
  }
}
