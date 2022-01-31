// tests go here; this will not be compiled when this package is used as an extension.
CCS811.CCS811_Init()
basic.forever(function () {
    basic.showNumber(CCS811.GetAlgResulteCO2())
    basic.pause(1000)
})
