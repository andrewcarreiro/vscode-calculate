# Test cases
* Calculate
	* Base case
		* Open a new editor
		* write 1+1
		* select
		* Calculate
		* Should equal 1+1=2
	* Multi-select
		* Open a new editor
		* write 1+1, 2*4, and 8%3 on three lines.
		* Create a cursor on each line
		* Calculate
		* Should equal 1+1=2, 2*4=8, 8%3=2
	* trying to calculate non-number expression
		* Open a new editor
		* write test+1
		* select
		* Calculate
		* Error: Could not calculate 'test+1'
* Calculate and replace
	* Base case
		* Open a new editor
		* write 1+1
		* select
		* Calculate and Replace
		* Should equal 2
	* Multi-select
		* Open a new editor
		* write 1+1, 2*4, and 8%3 on three lines.
		* Create a cursor on each line
		* Calculate and Replace
		* Should equal 2, 8, 2
	* trying to calculate non-number expression
		* Open a new editor
		* write test+1
		* select
		* Calculate and Replace
		* Error: Could not calculate 'test+1'
* Count
	* Base case
		* Open a new editor
		* Select 10 lines
		* Count
		* Numbers 0-9 should appear, one per line
	* Selection case
		* Open a new editor
		* Four lines should exist "test,test,test,test"
		* Select all copy on every line
		* Count
		* Error: Count cannot act on selections.
* Count Alpha
	* Base case
		* Open a new editor
		* Select 10 lines
		* Count Alpha
		* Letters a,b,c,d,e,f,g,h,i,j should appear, one per line
	* Selection case
		* Open a new editor
		* Four lines should exist "test,test,test,test"
		* Select all copy on every line
		* Count Alpha
		* Error: Count Alpha cannot act on selections.