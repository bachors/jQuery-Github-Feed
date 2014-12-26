var username = 'bachors';
			ibacor_repos(username);
			ibacor_gists(username);
	
			function ibacor_repos(user) {
				$.ajax({
					url: 'https://api.github.com/users/'+user+'/repos',
					crossDomain: true,
					dataType: 'json'
				}).done(function (data) {
					var html = '';
					$.each(data, function(i, item) {
						html += '<div class="result">';
						html += '<p class="left"><a href="'+data[i].html_url+'" target="_blank">'+data[i].full_name+'</a><span class="fa fa-clock-o"> update '+relative_time(data[i].updated_at)+' ago</span><br>'+data[i].description+'</p>';
						html += '<p class="right"><a href="'+data[i].html_url+'/stargazers" target="_blank" class="fa fa-star"> '+addCommas(data[i].stargazers_count)+'</a><a href="'+data[i].html_url+'/network/members" target="_blank" class="fa fa-code-fork"> '+addCommas(data[i].forks_count)+'</a><a href="'+data[i].html_url+'/issues" target="_blank" class="fa fa-info-circle"> '+addCommas(data[i].open_issues)+'</a></p>';
						html += '</div>';
					});
					$('#ibacor_repos').html(html);
				});
			}
	
			function ibacor_gists(user) {
				$.ajax({
					url: 'https://api.github.com/users/'+user+'/gists',
					crossDomain: true,
					dataType: 'json'
				}).done(function (data) {
					var html = '';
					$.each(data, function(i, item) {
						html += '<a href="'+data[i].html_url+'" target="_blank"><div class="result">';
						html += '<p class="left">'+data[i].description+'</p>';
						html += '<p class="right"><span class="fa fa-clock-o"> update '+relative_time(data[i].updated_at)+' ago</span><span class="fa fa-comment"> '+addCommas(data[i].comments)+'</span></p>';
						html += '</div></a>';
					});
					$('#ibacor_gists').html(html);
				});
			}
				
			function relative_time(date_str) {
				if (!date_str) {return;}
				date_str = $.trim(date_str);
				date_str = date_str.replace(/\.\d\d\d+/,"");
				date_str = date_str.replace(/-/,"/").replace(/-/,"/");
				date_str = date_str.replace(/T/," ").replace(/Z/," UTC");
				date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");
				var parsed_date = new Date(date_str);
				var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); 
				var delta = parseInt((relative_to.getTime()-parsed_date)/1000);
				delta=(delta<2)?2:delta;
				var r = '';
				if (delta < 60) {
					r = 'Just now';
				} else if(delta < 120) {
					r = 'a min';
				} else if(delta < (45*60)) {
					r = (parseInt(delta / 60, 10)).toString() + ' mins';
				} else if(delta < (2*60*60)) {
					r = 'an hr';
				} else if(delta < (24*60*60)) {
					r = '' + (parseInt(delta / 3600, 10)).toString() + ' hrs';
				} else if(delta < (48*60*60)) {
					r = 'a day';
				} else {
					r = (parseInt(delta / 86400, 10)).toString() + ' days';
				}
				return r;
			}
	
			function addCommas(nStr)
			{
				nStr += '';
				x = nStr.split('.');
				x1 = x[0];
				x2 = x.length > 1 ? '.' + x[1] : '';
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}
				return x1 + x2;
			}
