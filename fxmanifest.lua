fx_version 'adamant'

game 'gta5'

client_script { 
"config.lua",
"main/client.lua",
"main/notify.lua"
}

server_script {
"main/server.lua",
'@mysql-async/lib/MySQL.lua',
"config.lua"
} 

ui_page "html/index.html"

files {
    'html/index.html',
    'html/main.js',

    'html/assets/akrobat/*.eot',
    'html/assets/akrobat/*.ttf',
    'html/assets/akrobat/*.woff',
    
    'html/assets/akrobat/font.css',

    'html/assets/druk/*.eot',
    'html/assets/druk/*.ttf',
    'html/assets/druk/*.woff',
    'html/assets/druk/*.woff2',
    'html/assets/druk/stylesheet.css',

    'html/assets/Gilroy/*.eot',
    'html/assets/Gilroy/*.ttf',
    'html/assets/Gilroy/*.woff',
    'html/assets/Gilroy/*.woff2',

    'html/assets/Gilroy/font.css',

    'html/assets/img/*.png',
    'html/assets/img/*.svg',


    'html/assets/css/style.css',

}

escrow_ignore { 'customize.lua' }

lua54 'yes'