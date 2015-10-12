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
                <br />CORRECTION VERIFIED ON\
                <br />------------------------------------------\
                <br />Project/WP name:           <e.g. MTAS 15B - WP123>\
                <br />WP label                   <e.g. FCP1309964_WP123_010 - Always use the WP label here!>\
                <br />AS Intergration Label:     <e.g. FCP1309964_TELAS_012 - Always use IB branch label here!>\
                <br />[AS Design label:]         <e.g. FCP1309964_TELAS_DB_034 - Always use DB branch label here!>\
                <br /><CompX.Integration Label:> <e.g. FCP1309964_<CompIB>_170 - Always use comp. IB branch label!>\
                <br />[CompX.Design Label:]      <e.g. FCP1309964_<CompIB>_DB_291 - Always use comp. DB branch label!>\
                <br /><TTCN code label:>         <e.g. FCP1309964_WP123_FT_077 - Always use FT TEAM branch label here!>\
                <br /><NSP/Maia/Vega:>           <e.g. NSP6.0/SMALLNOFS, NSP6.1, Large Node>\
                <br /><Doc. Updated :>           <e.g. CPI, MTAS Performance Measurements, 1/1553-AVA 901 09/7, into Rev.PD2>\
                <br />\
                <br />\
                <br />CORRECTION VERIFIED BY\
                <br />------------------------------------------\
                <br /><Running NWST test(s):> \
                <br /><Running NWFT test(s):> \
                <br /><Running eST traffic mix for [nn] hours>\
                <br /><Running FT Testcase(s): TC,TC...>\
                <br /><Running CT Testcase(s): TC,TC...>\
                <br /><Review of document: <Doc Num and Rev reviewed>, <Review Result>, <IR number>>\
                <br /><Other type of verification>\
                <br />\
                <br />(Please specify exactly what test cases are executed with what result.\
                <br />In case of regression, extend it with the exact scope and pass/fail rate.)\
                <br />\
                <br />\
                <br />ADDITIONAL VERIFICATION NEEDED\
                <br />------------------------------------------\
                <br />(e.g. Higher level NWFT/NWST/IMS/Live tests are required\
                <br /> e.g. Common test object functions or eST/FT FW impacted)\
                <br />\
                <br />Is there any other activity needed to verify\
                <br />the solution? (Yes/No):\
                <br />If yes: <Describe what more is needed>\
                <br />Have you considered regression if you have impacted FT common test object functions or FT FW?' );
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
          parent.getLast().hide();
        } else { // Showing
          parent.addClass( "showhide-open" );
          sender.setValue("- Hide");
          sender.addClass( "showhide-switch-open" );
          parent.getLast().show();
        }
      }

      function createShowHide() {
        var showHideWrap = editor.document.createElement( 'div', { 'attributes' : { 'class': 'showhide-wrap' } } );
        var showHide = editor.document.createElement( 'div', { 'attributes' : { 'class': 'showhide showhide-open' } } );
        var showHideContent = editor.document.createElement( 'div' );
        var showHideSwitch = editor.document.createElement( 'input', { 'attributes' : { 
                              'class': 'showhide-switch showhide-switch-open', 'type': 'button', 'value': '- Hide' } } );
        
        showHideSwitch.on( 'click', function( event ) {
          switcherShowHide( event.sender );
        });
        
        showHide.append( showHideSwitch );
        showHideContent.appendHtml( 'Place your content here.' );
        showHide.append( showHideContent );
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
          var date = curr_year + "-" + curr_month + "-" + curr_day;

          var getSignum = document.querySelectorAll(".logout > strong");
          var signum = getSignum[0].innerHTML.substring(0, 7);

          editor.insertHtml( "<br />&#8226<strong> " + date + "</strong> (" + signum + "): " );
        }
      });
      
      editor.ui.addButton( 'dtool-timestamp', {
        label: 'Timestamp',
        command: 'dtool-timestamp',
        icon: pluginDirectory + 'timestamp.png',
        toolbar: 'insert'
      });
      
      // CSS
      editor.addContentsCss( pluginDirectory + 'style.css' );
    }
});
