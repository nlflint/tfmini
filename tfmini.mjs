const DISTANCE_HEADER = 89;
const CONFIG_HEADER = [42, 57];


export default class TFMiniParser {
  position = 0;
  frameData = [];
  headerBuffer = [];
  
  constructor(callbacks) {
    this.callbacks = callbacks;
    this.position = 0;

    this.funcs = [
      // first byte
      this.header,
      this.header,
      this.framePush,
      this.framePush,
      this.framePush,
      this.framePush,
      this.framePush,
      this.framePush,
      this.checkSum
    ]
  }

  header(byte) {
    if (byte == DISTANCE_HEADER) {
      this.position++;
    }
    else {
      this.position = 0;
      this.frameData = [];
    }
  }

  framePush(byte) {
    this.frameData.push(byte);
    this.position++;
  }

  checkSum(byte) {
    if (this.frameData.reduce((a,b) => a + b, DISTANCE_HEADER * 2) % 256 == byte) {
      this.callbacks.distance(this.frameData[0] + this.frameData[1] * 256);
    }
   
    this.frameData = [];
    this.position = 0;
  }

  async parse(bytes) {
    bytes.forEach(byte => {
      let someFunc = this.funcs[this.position].bind(this);
      someFunc(byte);
    }); 
    return;
  }





}