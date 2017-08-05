import * as lib from "../src/lib";


describe("lib", function () {
	describe("indexToAlpha", function() {
		it("should convert 0 to a", function () {
			expect(lib.indexToAlpha(0)).toBe("a")
    });
    
    it("should convert 25 to z", function () {
			expect(lib.indexToAlpha(25)).toBe("z")
		});
		
		it("should convert 26 to aa", function () {
			expect(lib.indexToAlpha(26)).toBe("aa")
		});
		
		it("should convert 27 to ab", function () {
			expect(lib.indexToAlpha(27)).toBe("ab")
    });
    
    it("should convert 28 to ac", function () {
      expect(lib.indexToAlpha(28)).toBe("ac")
    });
    
    it("should never generate an identical record", function () {
      let arr = [];
      for( let j=0; j<200000; j++){
        arr.push(j);
      }
      arr = arr.map( ( v, i ) => lib.indexToAlpha(i) );
      expect(Array.from(new Set(arr)).length).toBe(arr.length)
    });
	});
});