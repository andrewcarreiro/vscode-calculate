var math = require("mathjs"),
	vscode = require('vscode');

function activate(context) { 
	var disposable = vscode.commands.registerCommand('extension.calculate', function () {

		var win = vscode.window;
		var activeTextEditor = win.activeTextEditor;

		activeTextEditor.edit(function (textEditorEdit) {
			activeTextEditor.selections.forEach(function (selection) {

				var selectedText = activeTextEditor.document.getText(selection);
				
				try{
					var evaluatedMath = math.eval(selectedText.toString());
					textEditorEdit.insert(selection.end, "="+evaluatedMath);
				}catch (e){
					win.showErrorMessage("Could not calculate: '"+selectedText+"'");
				}
				
			});
			
		});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;