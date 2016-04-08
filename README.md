jQuery-Github-Feed
==================
<p>This is a small and simple jQuery plugin to make github repositories, activity and gists widget</p>
<h2>USAGE</h2>
<pre>&lt;!-- Include Octicons --&gt;
&lt;link href="//cdnjs.cloudflare.com/ajax/libs/octicons/2.0.2/octicons.min.css" rel="stylesheet"&gt;    
    
&lt;!-- Custom Github Feed style --&gt;
&lt;link type="text/css" rel="stylesheet" href="src/github-feed.css" /&gt;
        
&lt;!-- Demo --&gt;
&lt;div class="anu"&gt;&lt;/div&gt;
        
&lt;!-- Include jQuery --&gt;
&lt;script src="//code.jquery.com/jquery-2.1.1.min.js"&gt;&lt;/script&gt;    
    
&lt;!-- Include jQuery Github Feed--&gt;
&lt;script src="src/github-feed.js"&gt;&lt;/script&gt;

&lt;script&gt;
$(document).ready(function(){            
    // Setting
    $(".anu").githubfeed(
        username = "bachors", // your github username
        sort = "updated" // Can be one of created, updated, pushed, full_name.
    );
});
&lt;/script&gt;</pre>
<h2>SCREENSHOT</h2>
<p><img src="https://scontent.cdninstagram.com/t51.2885-15/e15/12905217_456189164579580_2077582099_n.jpg"/></p>
<a href="http://ibacor.com/sosmed/github">DEMO</a>
