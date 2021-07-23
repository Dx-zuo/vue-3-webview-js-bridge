import VueJsBridgePlugin from './plugin'
import defaultOptions from './default'

export default {
  install (Vue, options) {
    const initConfig = Object.assign({}, defaultOptions, options)
    Object.defineProperty(Vue.config.globalProperties, '$bridge', { value: new VueJsBridgePlugin(initConfig) })
  },
  version: '__VERSION__'
}
