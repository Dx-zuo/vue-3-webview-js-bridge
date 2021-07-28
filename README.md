# vue-webview-js-bridge

![GitHub](https://img.shields.io/github/license/kntt/vue-js-bridge.svg)
![GitHub package.json version](https://img.shields.io/github/package-json/v/kntt/vue-js-bridge.svg)

- WebviewJavascriptBridge plugin for Vue.js
- Based on [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)(ios), [JsBridge](https://github.com/lzyzsd/JsBridge)(android) Development
- Promise Encapsulation，support `then` or `async/await`

## Install

yarn:

```bash
yarn add vue-webview-js-bridge
```

npm:

```bash
npm i vue-webview-js-bridge
```

## [Example](https://github.com/Kntt/vue-js-bridge/tree/dev/example/client)

```js
// main.js
import { createApp } from "vue";
import AppLayout from "./layout/index.vue";
import VueJsBridge from 'vue-webview-js-bridge'

const app = createApp(AppLayout);
app.use(VueJsBridge);

// component.vue
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      code: ''
    }
  },
  mounted () {
    // Native call Web
    this.$bridge.registerHandler('handlerName', (data, callback) => {
      this.code = data
      console.log('data from native:', data)
      callback(data)
    })
  },
  methods: {
    async callNative () {
      // Web call Mobile
      this.$bridge.callHandler("handlerName", payload)
      .then((data) => {
        console.log('data',data)
      })
      .catch((error) => {
        console.log('error', error)
      });
    }
  }
}
```

<!-- ## TypeScript 支持
### main.ts
```ts
// ...
import VueJsBridge, { pluginOption } from 'vue-webview-js-bridge'

interface Payload<T = any> {
  type: string
  data?: T
}
interface Response<T = any> {
  code: number
  data?: T
}

const option:pluginOption<Payload, Response> = {
  debug: true,
  nativeHandlerName: 'testObjcCallback',
  mock: false,
  mockHandler (payload, next) {
    next(Object.assign({ code: 200 }, {
      data: 'code from native'
    }))
  }
}

Vue.use(VueJsBridge, option)
// ...
```
### component.vue
```ts
import { Vue, Component, Prop } from 'vue-property-decorator'

interface Payload<T = any> {
  type: string
  data?: T
}

interface Response<T = any> {
  code: number
  data?: T
}
@Component
export default class HelloWorld extends Vue {
  @Prop({ default: '' }) private msg!: string
  code: string = ''
  mounted () {
    this.$bridge.registerHandler<string, object>('testJavascriptHandler', (data, callback) => {
      this.code = data
      console.log('data from native:', data)
      const responseData:object = { 'Javascript Says': 'Right back atcha!' }
      console.log('JS responding with', responseData)
      callback(responseData)
    })
  }
  private async callNative () {
    try {
      let res = await this.$bridge.callHandler<Payload<object>, Response<string>>({
        type: 'optionType',
        data: {
          name: 'optionData'
        }
      })
      this.code = res.data
    } catch (error) {
      console.log('error', error)
    }
  }
}
```

## 配置参数(Options)
### debug
- type: boolean
- default: `true`
- description: 输出调用信息

### delay
- type: number
- default: `200`
- description: 由于birdge初始化需要时间导致的registerHandler失败的处理，延时调用时间，单位`ms`
> native调用前端注册的方法最好也要延时处理，避免前端还未注册时候native调用导致的问题

### nativeHandlerName
- type: string, 必填项
- default: `'nativeHandler'`
- description: 和原生开发人员协商的nativeHandlerName

### mock
- type: boolean
- default: `true`
- description: 开发阶段是否开启mock服务，需要配合mockHandler使用，两者都设置的情况下mock生效

### mockHandler
- type: Function
- default: `null`
- description: 开发阶段mockHandler服务，需要配合mock使用，两者都设置的情况下mock生效. 是一个函数，第一个参数接收payload, 第二个参数接受bridge回调函数
```js
mockHandler (payload, next) {
  // mock by payload
  // switch(payload) {
  //  case 1:
  //    next(mockData)
  //    break
  //    ...
  // }
  // call next(data) to mock data
}
``` -->

<!-- ## 提供的方法(Methods)
### registerHandler
- description：注册一个bridge提供给原生开发者调用，第一个参数name(和原生开发者协商好的bridgeName)，第二个参数callback函数，
- callback: callback函数接收两个参数，第一个参数是native传来的数据data，第二个参数是原生传来的responseCallback，当需要时通知native我们的状态
```js
this.$bridge.registerHandler('testJavascriptHandler', (data, callback) => {
  this.code = data
  console.log('data from native:', data)
  const responseData = { 'Javascript Says':'Right back atcha!' }
  console.log('JS responding with', responseData)
  callback(responseData)
})
```

### callHandler
- description: 接受一个参数payload（和原生开发人员协商格式）例如：
```js
  this.$bridge.callHandler({
    type: 'optionType', // 标识调用native的功能
    data: { // 传到native的数据
      name: 'optionData'
    }
  })
```

## Todo

* [ ] 增加单元测试
* [x] 增加 TypeScript types 支持 -->

## Reference

[vue-webview-js-bridge](https://www.npmjs.com/package/vue-webview-js-bridge)

## License

[MIT](http://opensource.org/licenses/MIT)