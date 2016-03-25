var r = require('../lib')

var v4true = r.cidrv4.test('1.1.1.1/24')
console.log('cidrv4 true is', v4true)

var v4false = r.cidrv4.test('1.1.1.256/24')
console.log('cidrv4 false is', v4false)

var v6true = r.cidrv6.test('fe80:0000:0000:0000:0204:61ff:fe9d:f156')
console.log('cidrv6 true is', v6true)

var v6false = r.cidrv6.test('fe80:0000:0000:0000:0204:61ff:fe9d:f156/sdfsdfs')
console.log('cidrv6 false is', v6false)

