//% color=190 weight=100 icon="\uf1fb" block="CCS811"

namespace CCS811 {
    const chipAddress = 0x5A
    const wakPin = DigitalPin.P8
    const CCS811_STATUS = 0x00
    const CCS811_MEAS_MODE = 0x01
    const CCS811_ALG_RESULT_DATA = 0x02
    const CCS811_RAW_DATA = 0x03
    const CCS811_ENV_DATA = 0x05
    const CCS811_THRESHOLDS = 0x10
    const CCS811_BASELINE = 0x11
    const CCS811_HW_ID = 0x20
    const CCS811_HW_VERSION = 0x21
    const CCS811_FW_BOOT_VERSION = 0x23
    const CCS811_FW_APP_VERSION = 0x24
    const CCS811_ERROR_ID = 0xE0
    const CCS811_APP_ERASE = 0xF1
    const CCS811_APP_DATA = 0xF2
    const CCS811_APP_VERIFY = 0xF3
    const CCS811_APP_START = 0xF4
    const CCS811_SW_RESET = 0xFF
    const resetWord = hex`11E5728A`
    const measWord = hex`10` //measure mode 1: cons power, IAQ Meas., every sec
    const emptyWord = hex``

    function command(address: number, register: number, data: Buffer) {
        let len1 = data.length
        let tempbuf = pins.createBuffer(len1 + 1)
        tempbuf[0] = register
        for (let teller = 1; teller <= len1; teller++) {
            tempbuf[teller] = data.getUint8(teller - 1)
        }
        pins.i2cWriteBuffer(address, tempbuf, false)
    }

    //% block="SW Reset"
    function SWReset() {
        pins.digitalWritePin(wakPin, 0)
        command(chipAddress, CCS811_SW_RESET, resetWord)
        pins.digitalWritePin(wakPin, 1)
    }

    //% block="App Start"
    function AppStart() {
        pins.digitalWritePin(wakPin, 0)
        command(chipAddress, CCS811_APP_START, emptyWord)
        pins.digitalWritePin(wakPin, 1)
    }

    //% block="Measure Mode"
    function MeasMode() {
        pins.digitalWritePin(wakPin, 0)
        command(chipAddress, CCS811_MEAS_MODE, measWord)
        pins.digitalWritePin(wakPin, 1)
    }

    //% block="Get HardwareID"
    export function GetHWID() {
        pins.digitalWritePin(wakPin, 0)
        command(chipAddress, CCS811_HW_ID, emptyWord)
        let i2cBuffer = pins.i2cReadBuffer(chipAddress, 1, false)
        let tempnum = i2cBuffer.getUint8(0)
        pins.digitalWritePin(wakPin, 1)        
        return i2cBuffer.getUint8(0)
    }

    //% block="Get HardwareVersion"
    export function GetHWVer() {
        pins.digitalWritePin(wakPin, 0)
        command(chipAddress, CCS811_HW_VERSION, emptyWord)
        let i2cBuffer = pins.i2cReadBuffer(chipAddress, 1, false)
        pins.digitalWritePin(wakPin, 1)        
        return i2cBuffer.getUint8(0)
    }

    //% block="Get Status"
    export function GetStat() {
        pins.digitalWritePin(wakPin, 0)
        command(chipAddress, CCS811_STATUS, emptyWord)
        let i2cBuffer = pins.i2cReadBuffer(chipAddress, 1, false)
        pins.digitalWritePin(wakPin, 1)        
        return i2cBuffer.getUint8(0)
    }

    //% block="Get Firmware App version"
    export function GetFWAppVer() {
        pins.digitalWritePin(wakPin, 0)
        command(chipAddress, CCS811_FW_APP_VERSION, emptyWord)
        let i2cBuffer = pins.i2cReadBuffer(chipAddress, 2, false)
        pins.digitalWritePin(wakPin, 1)       
        return i2cBuffer.getUint8(0)
    }

    //% block="Get Firmware Boot version"
    export function GetFWBootVer() {
        pins.digitalWritePin(wakPin, 0)
        command(chipAddress, CCS811_FW_BOOT_VERSION, emptyWord)
        let i2cBuffer = pins.i2cReadBuffer(chipAddress, 2, false)
        return i2cBuffer.getUint8(0)
        pins.digitalWritePin(wakPin, 1)
    }

    //% block="Get eCO2"
    export function GetAlgResulteCO2() {
        pins.digitalWritePin(wakPin, 0)
        command(chipAddress, CCS811_ALG_RESULT_DATA, emptyWord)
        let i2cBuffer = pins.i2cReadBuffer(chipAddress, 8, false)
        pins.digitalWritePin(wakPin, 1)        
        return i2cBuffer.getNumber(NumberFormat.UInt16BE, 0)
    }

    //% block="Get VOC"
    export function GetAlgResultVOC() {
        pins.digitalWritePin(wakPin, 0)
        command(chipAddress, CCS811_ALG_RESULT_DATA, emptyWord)
        let i2cBuffer = pins.i2cReadBuffer(chipAddress, 8, false)
        pins.digitalWritePin(wakPin, 1)        
        return i2cBuffer.getNumber(NumberFormat.UInt16BE, 2)
    }

    //% block="CCS811 Init"
    export function CCS811_Init() {
        // init uses all commands so to be able to measure ccs811 response with protocol analyser
        pins.digitalWritePin(wakPin, 1)
        basic.pause(10)
        GetStat()
        SWReset()
        basic.pause(2)
        GetHWID()
        GetHWVer()
        GetStat()
        GetFWAppVer()
        AppStart()
        basic.pause(1)
        GetStat()
        GetHWVer()
        GetFWBootVer()
        GetFWAppVer()
        MeasMode()
    }
}
