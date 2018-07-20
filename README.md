# Visual Studio Code Calculate

## About 
Uses [Math.js](https://github.com/josdejong/mathjs) for evaluating expressions. If it works there, it should work here!

## How to use
1. Select an expression in your document. For example, ((((5*5)+1)/2)-10)^2
2. Enter the Command Pallette (F1), and type "calculate"
3. The evaluated result will appear after your selection

## Counter

The `$i` in any selection is replaced by the index of the selection. For example if you have three identical selections `2*$i+1` the results will be `3`, `5` and `7`.

![Selecting multiple items and running the calculate function](https://i.imgur.com/a1LDrLH.gif "Selecting multiple items and running the calculate function")

## Available Commands
- **Calculate** calculates selected expression, and appends "=" with the result
- **Calculate and Replace** calculates selected expression, and replaces it with the result

## Acknowledgements
- This extension is based on [Colinta's excellent Sublime Text Calculate package](https://github.com/colinta/SublimeCalculate) which has been a great tool for me for years.
- Support for comma decimals by [robertopc](https://github.com/robertopc)

## License
Copyright (c) 2018 Andrew Carreiro
Licensed under the WTFPL license.
