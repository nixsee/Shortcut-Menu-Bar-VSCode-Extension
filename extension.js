"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';
var init = false;
var hasCpp = false;
// let fs = require("fs");
const vscode_1 = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    if (!init) {
        init = true;
        vscode_1.commands.getCommands().then(function (value) {
            let result = value.indexOf("C_Cpp.SwitchHeaderSource");
            if (result >= 0) {
                hasCpp = true;
            }
        });
    }
    console.log("extension is now active!");
    // 1) Add simple commands to array -----------------------------------------------------------
    let commandArray = [
        //=> ["name in package.json" , "name of command to execute"]
        ["extension.save", "workbench.action.files.save"],
        ["extension.toggleTerminal", "workbench.action.terminal.toggleTerminal"],
        ["extension.toggleActivityBar", "workbench.action.toggleActivityBarVisibility"],
        ["extension.back", "workbench.action.navigateBack"],
        ["extension.forward", "workbench.action.navigateForward"],
        ["extension.toggleWhitespace", "editor.action.toggleRenderWhitespace"],
        ["extension.quickOpen", "workbench.action.quickOpen"],
        ["extension.findReplace", "editor.action.startFindReplaceAction"],
        ["extension.undo", "undo"],
        ["extension.redo", "redo"],
        ["extension.commentLine", "editor.action.commentLine"],
        ["extension.saveAll", "workbench.action.files.saveAll"],
        ["extension.newNote", "vscodeMarkdownNotes.newNote"],
        ["extension.dailyNote", "foam-vscode.open-daily-note"],
        ["extension.addFavorite", "favorites.addToFavorites"],
        ["extension.toggleZenMode", "workbench.action.toggleZenMode"],
        ["extension.expandURL", "markdown-link-expander.expand"],
        ["extension.focusBacklinks", "vscodeMarkdownNotesBacklinks.focus"],
        ["extension.openGraph", "markdown-links.showGraph"],
        ["extension.updateReferences", "foam-vscode.update-wikilinks"],
        ["extension.janitor", "foam-vscode.janitor"],
        
        
        
        
        
    ];
    let disposableCommandsArray = [];
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    commandArray.forEach((command) => {
        disposableCommandsArray.push(vscode_1.commands.registerCommand(command[0], () => {
            vscode_1.commands.executeCommand(command[1]).then(function () { });
        }));
    });
    // 2) or Add complex commands separately (not needed if done step 1)----------------------------------------------------
    let disposableBeautify = vscode_1.commands.registerCommand("extension.beautify", () => {
        let editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        if (vscode_1.window.state.focused === true && !editor.selection.isEmpty) {
            vscode_1.commands
                .executeCommand("editor.action.formatSelection")
                .then(function () { });
        }
        else {
            vscode_1.commands
                .executeCommand("editor.action.formatDocument")
                .then(function () { });
        }
    });
    let disposableFormatWith = vscode_1.commands.registerCommand("extension.formatWith", () => {
        let editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        if (vscode_1.window.state.focused === true && !editor.selection.isEmpty) {
            vscode_1.commands
                .executeCommand("editor.action.formatSelection.multiple")
                .then(function () { });
        }
        else {
            vscode_1.commands
                .executeCommand("editor.action.formatDocument.multiple")
                .then(function () { });
        }
    });
    // see opened files list
    let disposableFileList = vscode_1.commands.registerCommand("extension.filelist", () => {
        let editor = vscode_1.window.activeTextEditor;
        if (!editor || !editor.viewColumn) {
            return; // No open text editor
        }
        vscode_1.commands
            .executeCommand("workbench.action.showAllEditorsByMostRecentlyUsed")
            .then(function () { });
    });
    let disposableSwitch = vscode_1.commands.registerCommand("extension.switch", () => {
        if (hasCpp) {
            vscode_1.commands.executeCommand("C_Cpp.SwitchHeaderSource").then(function () { });
        }
        else {
            vscode_1.window.showErrorMessage("C/C++ extension (ms-vscode.cpptools) is not installed!");
        }
    });
    // Adding 1) to a list of disposables which are disposed when this extension is deactivated.----------------------
    disposableCommandsArray.forEach((i) => {
        context.subscriptions.push(i);
    });
    // Adding 2) to a list of disposables which are disposed when this extension is deactivated.----------------------
    context.subscriptions.push(disposableFileList);
    context.subscriptions.push(disposableBeautify);
    context.subscriptions.push(disposableFormatWith);
    context.subscriptions.push(disposableSwitch);
    //also update button in package.json.. see "Adding new buttons" in help.md file
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map