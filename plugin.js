CKEDITOR.plugins.add( 'dtool',{
    init: function( editor ) {
      var pluginDirectory = this.path;
      
      // Editor mode change for Showhide switch hooks refresh
      editor.on( 'mode', function() {
        if ( this.mode != 'wysiwyg' )
          return;
        
        var elements = editor.document.find( ".showhide-switch" );
        for ( var i = 0; i < elements.count(); ++i ) {
          elements.getItem(i).on( 'click', function( event ) {
            switcherShowHide( event.sender );
          });
        }
      });
      
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
                <br /> \
                <br />ADDITIONAL VERIFICATION NEEDED \
                <br />------------------------------------------ \
                <br />No \
                <br /> \
                <br />IMPACTED DOCUMENTS (FTD, DR, CPI etc) \
                <br />------------------------------------------ \
                <br />N/A ' );
        }
      });
      
      editor.ui.addButton( 'dtool-verifTemplate', {
        label: 'Verification info',
        command: 'dtool-verifTemplate',
        icon: pluginDirectory + 'veriftemplate.png',
        toolbar: 'insert'
      });
      
      // Show/Hide
      function switcherShowHide( sender ) {
        var parent = sender.getParent();
        if ( parent.hasClass( "showhide-open" ) ) { // Hiding
          parent.removeClass( "showhide-open" );
          sender.setValue("+ Show");
          sender.removeClass( "showhide-switch-open" );
        } else { // Showing
          parent.addClass( "showhide-open" );
          sender.setValue("- Hide");
          sender.addClass( "showhide-switch-open" );
        }
      }

      function createShowHide() {
        var showHideWrap = editor.document.createElement( 'div', { 'attributes' : { 'class': 'showhide-wrap' } } );
        var showHide = editor.document.createElement( 'div', { 'attributes' : { 'class': 'showhide showhide-open' } } );
        var showHideSwitch = editor.document.createElement( 'input', 
                             { 'attributes' : { 'class': 'showhide-switch showhide-switch-open', 'type': 'button', 'value': '- Hide' } } );
        showHideSwitch.on( 'click', function( event ) {
          switcherShowHide( event.sender );
        });
        
        showHide.append( showHideSwitch );
        showHide.appendHtml( '<br />Place your hidden content here.<br />' );
        showHideWrap.append( showHide );
        return showHideWrap;
      }
      
      editor.addCommand( 'dtool-showHide', {
        exec: function( editor ) {
          var showHide = createShowHide();
          editor.insertElement( showHide );
          editor.insertHtml( "<br />" );
        },
        allowedContent: 'div(showhide*);input(*)[*]'
      });
      editor.ui.addButton( 'dtool-showHide', {
        label: 'Show/Hide',
        command: 'dtool-showHide',
        icon: pluginDirectory + 'showhide.png',
        toolbar: 'insert'
      });
      
      // Timestamp
      editor.addCommand( 'dtool-timestamp', {
        exec: function( editor ) {
          var d = new Date();
          var curr_day = d.getDate();
          if( curr_day < 10 ) {
            curr_day = "0" + curr_day;
          }
          var curr_month = d.getMonth()+1;
          if( curr_month < 10 ) {
            curr_month = "0" + curr_month;
          }
          var curr_year = d.getFullYear();
          var date = curr_year +"-"+ curr_month +"-"+ curr_day;

          var getSignum = document.querySelectorAll(".logout > strong");
          var signum = getSignum[0].innerHTML.substring(0, 7);

          editor.insertHtml( "<br />&#8226<strong>" + date + "</strong> (" + signum + "): " );
        }
      });
      editor.ui.addButton( 'dtool-timestamp', {
        label: 'Timestamp',
        command: 'dtool-timestamp',
        icon: pluginDirectory + 'timestamp.png',
        toolbar: 'insert'
      });
      
      editor.addContentsCss( pluginDirectory + 'style.css' );
    }
});