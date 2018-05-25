

const electron = require('electron')

// Module to control application life.
const app = electron.app
const Menu= electron.Menu
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const path = require('path')
const url = require('url')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
 //mainWindow.loadURL('file://${__dirname}/index.html');
//mainWindow.webContents.openDevTools();

mainWindow.on('closed', () => {
    mainWindow = null;
  });

			const mainMenu = Menu.buildFromTemplate(menuTemplate);
			Menu.setApplicationMenu(mainMenu);
}


app.on('ready', createWindow);
function createAddWindow(){
	addWindow = new BrowserWindow({
	width:300,
	height:200,
	title:'Add New Todo'
	});
	addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'Add.html'),
    protocol: 'file:',
    slashes: true
  }))
	
}
ipcMain.on('todo:add',(event,todo)=>{
	mainWindow.webContents.send('todo:add',todo);
	addWindow.close();
	//addWindow=null;
}

);
const menuTemplate =[

{
	label: 'File',
		submenu:[
		{
			label: 'New Todo',
			click(){createAddWindow();}
		},
		{
			label: 'Clear Todo',
			click(){
				mainWindow.webContents.send('todo:clear');
			}
		},
		
		
		{
			label: 'Quit',
			
			click(){
				app.quit();
			}
		}
	]
}
];

if(process.env.NODE_ENV!=='production')
{
	menuTemplate.push({
		label: 'View',
		submenu:[
		{
			label: 'Toggle Developer Tools',
			click(item,focusedWindow){
				
				focusedWindow.toggleDevTools();
			}
		}
		]
		
	
	});
}



