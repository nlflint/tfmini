import SerialPort from 'serialport';
import ByteLength from '@serialport/parser-byte-length';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import TFMini from "./tfmini.mjs";

const port = new SerialPort('/dev/ttyUSB0', {
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    parity: "none"
  })



let count = 0;

const parser = port.pipe(new ByteLength({length: 1}))
// parser.on('data', async (bytes) => {
//     // console.log(bytes);

//     if (count++ < 100) {
//       return;
//     }

//     count = 0;

//     let distance = bytes[2] + (bytes[3] * 255);
//     let stength = bytes[4] + (bytes[5] * 255);
//     let mode = bytes[6];
//     let spareByte = bytes[7];
//     let checksum = bytes[8];

//     let expectedChecksum = (bytes.slice(0,8).reduce((left,right) => left + right) % 256);

//     console.log(`Distance: ${roundToTwoFixedDecimals(distance * 0.393701)} inches`);
//     // console.log(`Signal Stength: ${stength}`);
//     // console.log(`Mode: ${mode}`);
//     // console.log(`Spare Byte: ${spareByte}`);
//     // console.log(`Checksum: ${checksum}`);
//     // console.log(`Checksum comparison: ${checksum == expectedChecksum ? "MATCHES!!!!!!!!" : "Uh oh??????????"}`);

//     // console.log(``);
// });

let tfmini = new TFMini({distance: (dist) => console.log("Feet: " + (dist / 30.48))});

parser.on('data', async (byte) => tfmini.receive(byte[0]));
    

function roundToTwoFixedDecimals(number) {
  return (Math.round(number * 100) / 100).toFixed(2);
}