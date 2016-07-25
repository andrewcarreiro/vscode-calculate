import * as vscode from "vscode";
 
type TErrorType = "NO_FOCUS" | "NO_SELECT" | "CALC_ERR";
export default class Erroralert {

	public ERRTYPES = {
		"NO_FOCUS" : ( selText : string ) => { return "Open a file and select an expression to evaluate it"; }, 
		"NO_SELECT" : ( selText : string ) => { return "Please make a selection before calculating"; },
		"CALC_ERR" : ( selText : string ) => { return "Could not calculate: '"+selText+"'"; }
	};

	private savedError : string = "";
	private errCount : number = 0;
	
	/**
	 * Multiple editors should not trigger many errors, just a single one at the end.
	 */
	public saveError ( errtype : TErrorType, selText : string = "" ){
		this.errCount ++;
		this.savedError = this.ERRTYPES[errtype](selText);
	}

	public throwSavedErrorIfNecessary () {
		if( this.savedError !== "" ){
			let extraErrorText = this.errCount > 1 ? ". Additionally, there were "+(this.errCount-1)+" other issues" : "";
			vscode.window.showErrorMessage(this.savedError+extraErrorText);
			this.savedError = "";
		}
	}

	public throwSingleErrorImmediately ( errtype : TErrorType, selText : string = "" ) {
		vscode.window.showErrorMessage(this.ERRTYPES[errtype](selText));
	}

}