# wincc-ar
This project demonstrates the capabilities of augmented reality for industrial control systems. Data read from WinCC is displayed for nodes marked with a barcode in realtime. 

This is just a demo project. Do not use it for real industrial facilities. 
![AR - demonstration](https://media.giphy.com/media/eJ4KZ4GIRy2hA8kZCe/giphy.gif)
# Usage
## Print Matrix Barcode
You can find matrix-barcodes [here](https://github.com/artoolkit/artoolkit5/tree/master/doc/patterns/Matrix%20code%203x3%20(72dpi)), they need to be printed.

## Configure tags names
Tag configuration is stored in [tags.json](../public/tags.json) file. The value of the field `id` must match the value of the matrix barcode for their mapping.

## Start server
```
npm start
```