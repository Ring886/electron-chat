import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production'

// 让 app:// 协议可用于加载 Vue 项目中的资源
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let mainWindow

async function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hiddenInset', // 保留macOS的三个按钮，隐藏默认标题栏内容
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: true,
      preload: path.join(__dirname, process.env.NODE_ENV === 'development' 
        ? '../src/preload.js' // 开发模式下使用 src 目录中的 preload.js
        : 'preload.js' // 生产模式下使用打包后的 preload.js
      )
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 在开发模式中加载 Webpack 的开发服务器
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // 在生产模式中加载应用资源
    // mainWindow.loadURL('app://./index.html')
    // mainWindow.loadURL('http://localhost:8080')
    mainWindow.loadURL(NODE_ENV === 'development' ? 'http://localhost:8080' : `file://${path.join(__dirname, '../dist/index.html')}`)
  }

  // 启动 DevTools
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
}

// 监听主进程中的事件并更新窗口标题
ipcMain.on('set-title', (event, title) => {
  mainWindow.setTitle(title)
})

// ipcMain.on('reverse', () => {
  
// })

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})