local quickCoords = false

local copyCoords = false

RegisterCommand(Config.DisplayCoordsCommand, function()
  quickCoords = not quickCoords
  SendNUIMessage({
    quickCoords = quickCoords
  })
end, false)

RegisterCommand(Config.CoordsMenuCommand, function()
  copyCoords = not copyCoords
  SendNUIMessage({
    copyCoords = copyCoords,
    cCoords = GetEntityCoords(PlayerPedId()),
    cHeading = GetEntityHeading(PlayerPedId())
  })
  SetNuiFocus(copyCoords, copyCoords)
end, false)

RegisterNUICallback("closeCopy", function()
  ExecuteCommand(Config.CoordsMenuCommand)
end)

CreateThread(function()
  while true do 
    Wait(3000)
    while quickCoords do
      Wait(50)
      SendNUIMessage({
        coords = GetEntityCoords(PlayerPedId()),
        heading = GetEntityHeading(PlayerPedId())
      })
    end
  end
end)