/* global localStorage */

export default class LocalStorageUtils {
  static getSidebarToggled() {
    const value = localStorage.getItem('sidebarToggled');
    return value === 'true';
  }

  static setSidebarToggled(value) {
    localStorage.setItem('sidebarToggled', value);
  }

  static getSortField() {
    return localStorage.getItem('sortField');
  }

  static setSortField(value) {
    localStorage.setItem('sortField', value);
  }

  static getSortAscending() {
    return localStorage.getItem('sortAscending');
  }

  static setSortAscending(value) {
    localStorage.setItem('sortAscending', value);
  }

  static getWatchSelectedArcId() {
    const value = localStorage.getItem('watchSelectedArcId');
    if (Number.isNaN(value)) {
      return null;
    }
    return value;
  }

  static setWatchSelectedArcId(value) {
    let val = value;
    if (Number.isNaN(value)) {
      val = null;
    }
    localStorage.setItem('watchSelectedArcId', val);
  }

  static getWatchSelectedEpisodeId() {
    const value = localStorage.getItem('watchSelectedEpisodeId');
    if (Number.isNaN(value)) {
      return null;
    }
    return value;
  }

  static setWatchSelectedEpisodeId(value) {
    let val = value;
    if (Number.isNaN(value)) {
      val = null;
    }
    localStorage.setItem('watchSelectedEpisodeId', val);
  }

  static getLocale() {
    const locale = localStorage.getItem('locale')
    if (!locale) {
      return 'en-US'
    }
    return locale
  }

  static setLocale(value) {
    localStorage.setItem('locale', value)
  }
}
