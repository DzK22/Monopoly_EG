/*const electron = require('electron')
const path = require('path')

if (process.env.NODE_ENV === 'development') { require('electron-reload')(__dirname) }

var isDev = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : false;

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}


const { app, BrowserWindow, Menu} = electron
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let mainWindow, test2

app.on('ready', () => {
	mainWindowLoad()
	const menu = Menu.buildFromTemplate(mainMenuTemplate)
	Menu.setApplicationMenu(menu)
})

// function for creating our test2 window
const test2_Window = () => {
	test2 = new BrowserWindow({
		webPreferences: {
			nodeIntegration: false
		},
		title: 'test2'
	})
	test2.loadURL('file://${__dirname}/test2.html')
}

const mainWindowLoad = () => {
	mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: false
		}
	})
	mainWindow.loadURL('file://${__dirname}/index.html')
}

const mainMenuTemplate = [
	{
		label: 'Devtool',
		accelerator: 'Ctrl+D',
		click() {
			mainWindow.webContents.openDevTools()
		}
	},
	{
		label: 'Reload',
		accelerator: 'Ctrl+R',
		click() {
			BrowserWindow.getFocusedWindow().reload()
		}
	},
	{
		label: 'test2',
		click() {
			test2_Window()
		}
	}
]*/
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Cree la fenetre du navigateur.
  let win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('test2.html')
}

app.whenReady().then(createWindow)