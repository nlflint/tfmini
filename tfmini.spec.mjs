import TFMini from "./tfmini.mjs";
import chai from "chai";

const {expect} = chai;

let checksum = (...args) => {return args.reduce((a,b) => a + b) % 256}

describe("TFMini class", () => {
    let tfmini;
    let distance = -1;
    beforeEach(() => {
        tfmini = new TFMini({distance: function(dist) {distance = dist} })
    })
    describe("receives a valid distance packet of 7891", () => {
        beforeEach(() => {
            tfmini.receive(89);
            tfmini.receive(89);
            tfmini.receive(211);
            tfmini.receive(30);
            tfmini.receive(0);
            tfmini.receive(0);
            tfmini.receive(0);
            tfmini.receive(0);
            tfmini.receive(checksum(89,89,211,30));
        });

        it("emits a distance event", () => {
            expect(distance).to.equal(7891);
        });
    });

    describe("receives a valid distance packet in the middle of garbage", () => {
        beforeEach(() => {
            tfmini.receive(44);
            tfmini.receive(44);
            tfmini.receive(100);
            tfmini.receive(44);
            tfmini.receive(0);
            tfmini.receive(89);
            tfmini.receive(89);
            tfmini.receive(211);
            tfmini.receive(30);
            tfmini.receive(0);
            tfmini.receive(0);
            tfmini.receive(0);
            tfmini.receive(0);
            tfmini.receive(checksum(89,89,211,30));
        });

        it("emits a distance event", () => {
            expect(distance).to.equal(7891);
        });
    });

    describe("receives a valid distance packet in the middle of garbage", () => {
        beforeEach(() => {
            tfmini.receive(44);
            tfmini.receive(89);
            tfmini.receive(100);
            tfmini.receive(44);
            tfmini.receive(0);
            tfmini.receive(89);
            tfmini.receive(89);
            tfmini.receive(211);
            tfmini.receive(30);
            tfmini.receive(0);
            tfmini.receive(0);
            tfmini.receive(0);
            tfmini.receive(0);
            tfmini.receive(checksum(89,89,211,30));
        });

        it("emits a distance event", () => {
            expect(distance).to.equal(7891);
        });
    });

});
