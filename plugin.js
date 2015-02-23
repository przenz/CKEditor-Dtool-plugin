CKEDITOR.plugins.add( 'dtool',{
    init: function( editor ) {
      var pluginDirectory = this.path;
      // Verification template
      editor.addCommand( 'dtool-verifTemplate', {
        exec: function( editor ) {
          editor.insertHtml(' \
                <br />CORRECTION VERIFIED  ON \
                <br />------------------------------------------ \
                <br />Project/Branch: MTAS \
                <br />MTAS code label: FCP \
                <br />TTCN code label: FCP \
                <br />Maia \
                <br /> \
                <br />CORRECTION VERIFIED BY \
                <br />------------------------------------------ \
                <br />Running FT Testcase(s): \
                <br /> ' );
        }
      });
      editor.ui.addButton( 'dtool-verifTemplate', {
        label: 'Verification info',
        command: 'dtool-verifTemplate',
        icon: pluginDirectory + 'veriftemplate.png',
        toolbar: 'insert'
      });
      
      // Show/Hide
      editor.addCommand( 'dtool-showHide', {
        exec: function( editor ) {
          var showHideContent = "";
          editor.insertHtml( ' \
              <br /><div class="showhide-wrap"> \
                <div class="showhide"> \
                  <input type="button" value="+ Show" class="showhide-switch"/><br /> \
                  <br /> \
                </div> \
              </div><br />' );
        },
        allowedContent: 'div(showhide*);input(*)[*]'
      });
      editor.ui.addButton( 'dtool-showHide', {
        label: 'Show/Hide',
        command: 'dtool-showHide',
        icon: pluginDirectory + 'showhide.png',
        toolbar: 'insert'
      });
      
      editor.addContentsCss( pluginDirectory + 'style.css' );
    }
});