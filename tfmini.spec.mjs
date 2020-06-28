import TFMiniParser from "./tfmini.mjs";
import chai from "chai";

const {expect} = chai;

let checksum = (...args) => {return args.reduce((a,b) => a + b) % 256}

describe("TFMini class", () => {
    let tfmini;
    let goodByteSequence;
    let distance = -1;
    beforeEach(() => {
        tfmini = new TFMiniParser({distance: function(dist) {distance = dist} });
        goodByteSequence = [89,89,211,30,0,0,0,0,checksum(89,89,211,30)];
        distance = -1;
    })
    
    describe("receives a valid distance packet of 7891", () => {
        beforeEach(async () => {
            await tfmini.parse(goodByteSequence);
        });

        it("emits a distance event", () => {
            expect(distance).to.equal(7891);
        });
    });

    describe("receives a valid distance packet in the middle of garbage", () => {
        beforeEach(async () => {
            await tfmini.parse([44,100,44,0]);
            await tfmini.parse(goodByteSequence);
        });

        it("emits a distance event", () => {
            expect(distance).to.equal(7891);
        });
    });

    describe("receives a valid distance packet in the middle of garbage", () => {
        beforeEach(async () => {
            tfmini.parse([44,89,100,44,0]);
            tfmini.parse(goodByteSequence)
        });

        it("emits a distance event", () => {
            expect(distance).to.equal(7891);
        });
    });

});
