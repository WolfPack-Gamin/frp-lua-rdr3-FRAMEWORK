--BlueBerryRP creator

fx_version "adamant"
games {"rdr3"}
rdr3_warning "I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships."

client_scripts {
    "@_core/lib/warmenu.lua",
    "client.lua",
    "config.lua"
}

server_scripts {
    "@_core/lib/utils.lua",
    "config.lua",
    "server.lua"
}
