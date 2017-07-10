jQuery-Github-Feed
==================
<p>This is a small and simple jQuery plugin to make github repositories, activity and gists widget from multiple accounts.</p>
<h2>USAGE</h2>
<pre>&lt;!-- Include Octicons --&gt;
&lt;link href="//cdnjs.cloudflare.com/ajax/libs/octicons/2.0.2/octicons.min.css" rel="stylesheet"&gt;   

&lt;!-- Custom Github Feed style --&gt;
&lt;link type="text/css" rel="stylesheet" href="src/github-feed.css" /&gt;   

&lt;!-- by ClassName --&gt;
&lt;div class="anu" data-username="bachors"&gt;&lt;/div&gt;
&lt;div class="anu" data-username="facebook"&gt;&lt;/div&gt;

&lt;!-- by ID --&gt;
&lt;div id="unix" data-username="primer"&gt;&lt;/div&gt;

&lt;!-- Include jQuery --&gt;
&lt;script src="//code.jquery.com/jquery-2.1.1.min.js"&gt;&lt;/script&gt;     

&lt;!-- Include jQuery Github Feed--&gt;
&lt;script src="src/github-feed.js"&gt;&lt;/script&gt;

&lt;script&gt;
$(document).ready(function(){  
  
    $(".anu").githubfeed(
        sort = "updated", // Can be one of created, updated, pushed, full_name.
        width = '100%', // width widget
        height = '400px' // height post
    );
            
    $("#unix").githubfeed(
        sort = "updated", // Can be one of created, updated, pushed, full_name.
        width = '350px', // width widget
        height = '400px' // height post
    );
});
&lt;/script&gt;</pre>
