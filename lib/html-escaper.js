const {CompositeDisposable} = require('atom')

module.exports = {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {'HTML-escaper:Escape': () => this.Escape()})
    )
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  Escape () {
    const editor = atom.workspace.getActiveTextEditor()

    const EscapeHTML = function(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
    }

    if(editor) {
      const selection = editor.getSelectedText()
      const selectionEscaped = EscapeHTML(selection)
      editor.insertText(selectionEscaped)
    }
  }
}
