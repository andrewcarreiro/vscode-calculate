import * as lib from "../src/lib";


describe("lib", function () {
	describe("indexToAlpha", function() {
		it("should convert 0 to a", function () {
			expect(lib.indexToAlpha(0)).toBe("a")
		});
		
		it("should convert 26 to aa", function () {
			expect(lib.indexToAlpha(26)).toBe("aa")
		});
		
		it("should convert 27 to ab", function () {
			expect(lib.indexToAlpha(27)).toBe("ab")
		});
	});
});