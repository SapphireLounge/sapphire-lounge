# Create .vscode directory if it doesn't exist
if (-not (Test-Path -Path ".vscode")) {
    New-Item -Path ".vscode" -ItemType Directory
    Write-Host "Created .vscode directory"
}

# Create settings.json with CSS validation disabled
$settings = @{
    "css.validate" = $false
    "less.validate" = $false
    "scss.validate" = $false
    "stylelint.validate" = @("css", "scss")
    "editor.codeActionsOnSave" = @{
        "source.fixAll.stylelint" = $true
    }
}

# Convert to JSON and save to file
$settingsJson = ConvertTo-Json $settings -Depth 10
Set-Content -Path ".vscode\settings.json" -Value $settingsJson

Write-Host "`n✅ Done! Please restart VSCode or reload the window."
Write-Host "(Ctrl+Shift+P, then type 'Reload Window')`n"

# Keep console open
Read-Host "Press Enter to exit"
