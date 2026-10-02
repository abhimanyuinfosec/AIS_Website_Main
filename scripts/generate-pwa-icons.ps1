Add-Type -AssemblyName System.Drawing

function Resize-Png($sourcePath, $destPath, $targetWidth, $targetHeight) {
    $fullSrc = Resolve-Path $sourcePath
    $srcImg = [System.Drawing.Image]::FromFile($fullSrc)
    $destBitmap = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($destBitmap)

    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $graphics.DrawImage($srcImg, 0, 0, $targetWidth, $targetHeight)

    $destBitmap.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $graphics.Dispose()
    $destBitmap.Dispose()
    $srcImg.Dispose()
    Write-Host "Created $destPath (${targetWidth}x${targetHeight})"
}

Resize-Png "public/applogo.png" "public/pwa-192x192.png" 192 192
Resize-Png "public/applogo.png" "public/pwa-512x512.png" 512 512
Resize-Png "public/applogo.png" "public/pwa-maskable-512x512.png" 512 512
Resize-Png "public/applogo.png" "public/apple-touch-icon.png" 180 180
Resize-Png "public/applogo.png" "public/favicon.png" 64 64
