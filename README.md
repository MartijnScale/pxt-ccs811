
> Open this page at [https://martijnscale.github.io/pxt-ccs811/](https://martijnscale.github.io/pxt-ccs811/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.
It is a basic micro:bit extension for the CCS811, an ultra-low power digital gas sensor for monitoring Indoor Air Quality (IAQ)
made by **ScioSense B.V.** from Eindhoven, the Netherlands. More info about ScioSense can be found at: www.sciosense.com
The author of this extensions has no links or interests in ScioSense B.V. or it's products, other than as a user.
The code is developed for and tested with a CJMCU-8118 breakout board, on which the CCS811 and a HDC1080 sensor are mounted.

To use this **extension** with the micro:bit:
* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/martijnscale/pxt-ccs811** and import

## Blocks preview

The extension has the following blocks:
- CCS811 Init: Should be used in the **on start** block of the micro:bit code, to inititalize the CCS811 sensor
- Get HardwareID: Returns the hardware-id of the sensor, currently 129 (0x81).
- Get HardwareVersion: Returns the hardware-version of the sensor, currently 18 (0x12)
- Get Firmware App version: Returns the firmware version for the application code, currently 32 (0x20)
- Get Firmware Boot version: Returns the firmware version for the boot code, currently 16 (0x10)
- Get eCO2: Returns a value with the ppm estimate of the equivalent CO2 (eCO2) level at the CCS811 sensor
- Get VOC: Returns a value with the ppb estimate of the total VOC level.

## Harwdare

The CCS811 sensor uses I2C to communicate with the micro:bit and uses one of general purpose input/output (GPIO) ports of the micro:bit for the Wake signal of the CCS811 sensor. The following connections should be made:
*CCS811         micro:bit*
  Vdd             3V
GND (EP)          GND
  SCL         SCL (GPIO 19)
  SDA         SDA (GPIO 20)
nWake (WAK)      GPIO 8
(I used the simple CJMCU-8118 breakout board, on which the CCS811 and a HDC1080 sensor are mounted. For this board, the remaining pins (INT, RST and ADD) are not connected).

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
* ScioSense
* CCS811
* CJMCU-8118
* Indoor Air Quality
* IAQ
