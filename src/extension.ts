import * as math from "mathjs";
import * as vscode from "vscode";
import ErrorAlert from "./erroralert";

/**
 * Initialization code
 */
export function activate(context) {
	
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.calculate', runCalculate(insertResultWithEquals))
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.calculateReplace', runCalculate(overwriteResult))
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.count', ()=>runCount(insertResult))
	);
}

function runCount ( editMaker : IEditMaker ) {
	let erroralert = new ErrorAlert();

	let actorFunction : IActorOnEveryEditor  = function ( errorLogger : ErrorAlert, textEditorEdit: vscode.TextEditorEdit, activeTextEditor, selection : vscode.Selection, index : number ){
		editMaker( textEditorEdit, selection, index);
	};

	onEveryEditor(erroralert,actorFunction);
}

/**
 * Runs the calculation with a given edit strategy
 */
function runCalculate ( editMaker : IEditMaker ){
	return () => {
		let erroralert = new ErrorAlert(); 
		onEveryEditor(erroralert, function ( errorLogger : ErrorAlert, textEditorEdit: vscode.TextEditorEdit, activeTextEditor, selection : vscode.Selection ) {
			var selectedText = activeTextEditor.document.getText(selection);


			if ( selectedText === "" ){
				erroralert.saveError("NO_SELECT");
				return;
			}
			
			try{
				var evaluatedMath = math.eval(selectedText.toString());
				editMaker(textEditorEdit,selection,evaluatedMath);
			}catch (e){
				erroralert.saveError("CALC_ERR",selectedText.toString());
			}
		})
		
	}
}

interface IActorOnEveryEditor {
	( errorLogger : ErrorAlert, textEditorEdit: vscode.TextEditorEdit, activeTextEditor : vscode.TextEditor, selection : vscode.Selection, index? : number ) : void
}

function onEveryEditor ( errorLogger, ActorOnEveryEditor : IActorOnEveryEditor) {
	var win = vscode.window;

	var activeTextEditor = win.activeTextEditor;
	
	if( activeTextEditor === undefined ){
		errorLogger.throwSingleErrorImmediately("NO_FOCUS");
		return false;
	}

	activeTextEditor.edit( (textEditorEdit) => {
		activeTextEditor.selections.forEach( (selection, index) => {
			ActorOnEveryEditor(errorLogger,textEditorEdit,activeTextEditor,selection,index);
		});

		errorLogger.throwSavedErrorIfNecessary();
		
	});
}


/**
 * A standard interface for making the edits
 */
interface IEditMaker {
	( edit : vscode.TextEditorEdit, selection : vscode.Selection, result : number ) : void;
}

let insertResultWithEquals : IEditMaker = function ( edit : vscode.TextEditorEdit, selection : vscode.Selection, result : number){
	edit.insert(selection.end, "="+result);
}

let insertResult : IEditMaker = function ( edit : vscode.TextEditorEdit, selection : vscode.Selection, result : number){
	edit.insert(selection.end, String(result));
}

let overwriteResult : IEditMaker = function ( edit : vscode.TextEditorEdit, selection : vscode.Selection, result : number){
	edit.replace(selection,String(result));
}


// this method is called when your extension is deactivated
export function deactivate() {
}


// exports.activate = activate;
// exports.deactivate = deactivate;