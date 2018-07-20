import * as math from "mathjs";
import * as vscode from "vscode";
import ErrorAlert from "./erroralert";

/**
 * Initialization code
 */
export function activate(context) {
	
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.calculate', runCalculate(insertResult))
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.calculateReplace', runCalculate(overwriteResult))
	);
}

/**
 * Runs the calculation with a given edit strategy
 */
function runCalculate ( editMaker : IEditMaker ){
	return () => {

		var win = vscode.window;
		let erroralert = new ErrorAlert(); 

		var activeTextEditor = win.activeTextEditor;
		
		if( activeTextEditor === undefined ){
			erroralert.throwSingleErrorImmediately("NO_FOCUS");
			return false;
		}

		activeTextEditor.edit( (textEditorEdit) => {
			activeTextEditor.selections.forEach((selection, index) => {

				var selectedText = activeTextEditor.document.getText(selection).replace(/\$i/g, String(index + 1));


				if ( selectedText === "" ){
					erroralert.saveError("NO_SELECT");
					return;
				}
				
				try{
					var evaluatedMath = math.eval(selectedText.toString().replace(/,/g,'.'));
					editMaker(textEditorEdit,selection,evaluatedMath);
				}catch (e){
					erroralert.saveError("CALC_ERR",selectedText.toString());
				}
				
			});

			erroralert.throwSavedErrorIfNecessary();
			
		});
	}
}


/**
 * A standard interface for making the edits
 */
interface IEditMaker {
	( edit : vscode.TextEditorEdit, selection : vscode.Selection, result : number ) : void;
}

let insertResult : IEditMaker = function ( edit : vscode.TextEditorEdit, selection : vscode.Selection, result : number){
	edit.insert(selection.end, "="+round(result));
}

let overwriteResult : IEditMaker = function ( edit : vscode.TextEditorEdit, selection : vscode.Selection, result : number){
	edit.replace(selection,String(round(result)));
}

function round(n: number){
	// Round to 5 decimal places
	return Math.round(n * 1000000) / 1000000;
}


// this method is called when your extension is deactivated
export function deactivate() {
}


// exports.activate = activate;
// exports.deactivate = deactivate;
