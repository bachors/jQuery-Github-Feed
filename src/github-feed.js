/***********************************************************
* #### jQuery-Github-Feed v3.0 ####
* Coded by Ican Bachors 2014.
* https://github.com/bachors/jQuery-Github-Feed
* Updates will be posted to this site.
***********************************************************/

$.fn.githubfeed = function(h, width, height) {
	
	$(this).each(function(i, a) {
		var b = ($(this).attr('id') != null ? '#' + $(this).attr('id') : '.' + $(this).attr('class')),
			g = $(this).data('username'),
			j = '';
			
		j += '<div class="github-feed" style="width: ' + width + '">';
		j += '<div class="head"></div>';
		j += '<div class="gftabs"><div class="gftab aktip" data-dip="repos">Repositories <sup class="repc"></sup></div><div class="gftab" data-dip="activ">Activity</div><div class="gftab" data-dip="gists">Gists <sup class="gisc"></sup></div></div>';
		j += '<div class="bod" style="height: ' + height + '">';
		j += '	<div class="feed bachorsrepos"></div>';
		j += '	<div class="feed bachorsgists" style="display:none"></div>';
		j += '	<div class="feed bachorsactiv" style="display:none"></div>';
		j += '</div>';
		j += '<div class="foot">';
		j += '	Github Feed <a href="https://github.com/bachors/jQuery-Github-Feed" class="jgf" target="_blank">made with <i class="octicon octicon-heart" style="color:salmon"></i></a>';
		j += '</div>';
		j += '</div>';
		$(this).html(j);
		
		ibacor_profil(g, i, b);
		ibacor_repos(g, i, b);
		ibacor_gists(g, i, b);
		ibacor_activs(g, i, b);
    });    

    function ibacor_profil(d, x, z) {
        $.ajax({
            url: 'https://api.github.com/users/' + d,
            crossDomain: true,
            dataType: 'json'
        }).done(function(b) {
            var c = '<div class="left">',
                ibacor = $('.jgf').attr('href').split("/");
            c += '		<a href="https://github.com/' + b.login + '" target="_blank"><img src="' + b.avatar_url + '"></a>';
            c += '	</div>';
            c += '	<div class="right">';
            c += '		<a href="https://github.com/' + b.login + '" target="_blank">' + b.name + '</a>';
			if(b.type != 'User'){
				c += '		<p>' + (b.bio != null ? b.bio : '') + '</p>';
            }
            c += '		<p><span class="octicon octicon-location"></span> ' + (b.location != null ? b.location : '') + '</p>';
			if(b.type == 'User'){
				c += '		<p><span class="user">Followers <span>'+ b.followers + '</span></span> <span class="user">Following <span>'+ b.following + '</span></span></p>';
            }
			c += '	</div>';
            $(z + ':eq(' + x + ') .github-feed .head').html(c);
            $(z + ':eq(' + x + ') .github-feed sup.repc').html(b.public_repos);
            $(z + ':eq(' + x + ') .github-feed sup.gisc').html(b.public_gists);
            $(z + ':eq(' + x + ') .github-feed .gftab').click(function() {
                $(z + ':eq(' + x + ') .github-feed .gftab').removeClass('aktip');
                $(z + ':eq(' + x + ') .github-feed .feed').css('display', 'none');
                var a = $(this).data('dip');
                $(this).addClass('aktip');
                $(z + ':eq(' + x + ') .' + ibacor[3] + a).css('display', 'block');
                return false
            })
        })
    }

    function ibacor_repos(d, x, z) {
        $.ajax({
            url: 'https://api.github.com/users/' + d + '/repos?type=all&sort=' + h,
            crossDomain: true,
            dataType: 'json'
        }).done(function(b) {
            var c = '',
                ibacor = $('.jgf').attr('href').split("/");
            $.each(b, function(i, a) {
                c += '<div class="result">';
                c += '	<div class="icon">';
                c += '		<span class="octicon octicon-repo"></span>';
                c += '	</div>';
                c += '	<div class="gfpost">';
                c += '		<a href="' + b[i].html_url + '" target="_blank">' + b[i].name + '</a>';
                c += '		<p>' + b[i].description + '</p>';
                c += '		<p class="date">' + relative_time(b[i].created_at) + ' ago - update ' + relative_time(b[i].updated_at) + ' ago</p>';
                c += '	</div>';
                c += '	<div class="contributor">';
                c += '		<a href="' + b[i].html_url + '/stargazers" target="_blank"><span>' + addCommas(b[i].stargazers_count) + '</span> <i class="octicon octicon-star"></i></a><br>';
                c += '		<a href="' + b[i].html_url + '/network/members" target="_blank"><span>' + addCommas(b[i].forks_count) + '</span> <i class="octicon octicon-repo-forked"></i></a><br>';
                c += '		<a href="' + b[i].html_url + '/issues" target="_blank"><span>' + addCommas(b[i].open_issues) + '</span> <i class="octicon octicon-issue-opened"></i></a>';
                c += '	</div>';
                c += '</div>'
            });
            $(z + ':eq(' + x + ') .' + ibacor[3] + 'repos').html(c)
        })
    }

    function ibacor_gists(d, x, z) {
        $.ajax({
            url: 'https://api.github.com/users/' + d + '/gists',
            crossDomain: true,
            dataType: 'json'
        }).done(function(b) {
            var c = '',
                ibacor = $('.jgf').attr('href').split("/");
            $.each(b, function(i, a) {
				var keys = Object.keys(b[i].files);
                c += '<div class="result">';
                c += '	<div class="icon">';
                c += '		<span class="octicon octicon-code"></span>';
                c += '	</div>';
                c += '	<div class="gfpost">';
                c += '		<a href="' + b[i].html_url + '" target="_blank">' + keys[0] + '</a>';
				c += '		<p>' + (b[i].description != null ? b[i].description : '') + '</p>';
                c += '		<p class="date">' + relative_time(b[i].created_at) + ' ago - update ' + relative_time(b[i].updated_at) + ' ago</p>';
                c += '	</div>';
                c += '	<div class="contributor">';
                c += '		<a href="' + b[i].html_url + '" target="_blank"><span>' + addCommas(b[i].comments) + '</span> <i class="octicon octicon-comment"></i></a>';
                c += '	</div>';
                c += '</div>'
            });
            $(z + ':eq(' + x + ') .' + ibacor[3] + 'gists').html(c)
        })
    }

    function ibacor_activs(f, x, z) {
        $.ajax({
            url: 'https://api.github.com/users/' + f + '/events',
            crossDomain: true,
            dataType: 'json'
        }).done(function(d) {
            var e = '',
                ibacor = $('.jgf').attr('href').split("/");
            $.each(d, function(i, a) {
                if (d[i].type == "WatchEvent") {
                    e += '<div class="result">';
                    e += '	<div class="icon">';
                    e += '		<span class="octicon octicon-star"></span>';
                    e += '	</div>';
                    e += '	<div class="gfpost">';
                    e += '		<a href="https://github.com/' + d[i].actor.login + '" target="_blank">' + d[i].actor.login + '</a> ';
                    e += d[i].payload.action + ' ';
                    e += '		<a href="https://github.com/' + d[i].repo.name + '" target="_blank">' + d[i].repo.name + '</a>';
                    e += '		<span class="date">' + relative_time(d[i].created_at) + ' ago</span>';
                    e += '	</div>';
                    e += '</div>'
                } else if (d[i].type == "ForkEvent") {
                    e += '<div class="result">';
                    e += '	<div class="icon">';
                    e += '		<span class="octicon octicon-repo-forked"></span>';
                    e += '	</div>';
                    e += '	<div class="gfpost">';
                    e += '		<a href="https://github.com/' + d[i].actor.login + '" target="_blank">' + d[i].actor.login + '</a> ';
                    e += '		forked ';
                    e += '		<a href="https://github.com/' + d[i].repo.name + '" target="_blank">' + d[i].repo.name + '</a> to';
                    e += '		<a href="https://github.com/' + d[i].payload.forkee.full_name + '" target="_blank">' + d[i].payload.forkee.full_name + '</a>';
                    e += '		<span class="date">' + relative_time(d[i].created_at) + ' ago</span>';
                    e += '	</div>';
                    e += '</div>'
                } else if (d[i].type == "ReleaseEvent") {
                    e += '<div class="result">';
                    e += '	<div class="icon">';
                    e += '		<span class="octicon octicon-tag"></span>';
                    e += '	</div>';
                    e += '	<div class="gfpost">';
                    e += '		<p class="date">' + relative_time(d[i].created_at) + ' ago</p>';
                    e += '		<a href="https://github.com/' + d[i].actor.login + '" target="_blank">' + d[i].actor.login + '</a> ';
                    e += '		released ';
                    e += '		<a href="https://github.com/' + d[i].repo.name + '/release/tag/' + d[i].payload.release.tag_name + '" target="_blank">' + d[i].payload.release.tag_name + '</a> at';
                    e += '		<a href="https://github.com/' + d[i].repo.name + '" target="_blank">' + d[i].repo.name + '</a>';
                    e += '		<p><img class="letik" src="' + d[i].actor.avatar_url + '"/> <span class="octicon octicon-cloud-download"></span> <a href="' + d[i].payload.release.tarball_url + '" target="_blank">Download Source Code (tar)</a></p>';
                    e += '		<p><img class="letik" src="' + d[i].actor.avatar_url + '"/> <span class="octicon octicon-cloud-download"></span> <a href="' + d[i].payload.release.zipball_url + '" target="_blank">Download Source Code (zip)</a></p>';
                    e += '	</div>';
                    e += '</div>'
                } else if (d[i].type == "IssueCommentEvent") {
                    e += '<div class="result">';
                    e += '	<div class="icon">';
                    e += '		<span class="octicon octicon-comment-discussion"></span>';
                    e += '	</div>';
                    e += '	<div class="gfpost">';
                    e += '		<p class="date">' + relative_time(d[i].created_at) + ' ago</p>';
                    e += '		<a href="https://github.com/' + d[i].actor.login + '" target="_blank">' + d[i].actor.login + '</a> ';
                    e += '		commented on issue ';
                    e += '		<a href="' + d[i].payload.issue.html_url + '" target="_blank">' + d[i].repo.name + '#' + d[i].payload.issue.number + '</a>';
                    e += '		<p><img src="' + d[i].actor.avatar_url + '"/> ' + d[i].payload.comment.body + '</p>';
                    e += '	</div>';
                    e += '</div>'
                } else if (d[i].type == "IssuesEvent") {
                    var b = "";
                    if (d[i].payload.action == "closed") {
                        b += "closed issue"
                    } else if (d[i].payload.action == "opened") {
                        b += "opened issue"
                    }
                    e += '<div class="result">';
                    e += '	<div class="icon">';
                    e += '		<span class="octicon octicon-issue-' + d[i].payload.action + '"></span>';
                    e += '	</div>';
                    e += '	<div class="gfpost">';
                    e += '		<p class="date">' + relative_time(d[i].created_at) + ' ago</p>';
                    e += '		<a href="https://github.com/' + d[i].actor.login + '" target="_blank">' + d[i].actor.login + '</a> ';
                    e += b + ' ';
                    e += '		<a href="' + d[i].payload.issue.html_url + '" target="_blank">' + d[i].repo.name + '#' + d[i].payload.issue.number + '</a>';
                    e += '		<p><img src="' + d[i].actor.avatar_url + '"/> ' + d[i].payload.issue.title + '</p>';
                    e += '	</div>';
                    e += '</div>'
                } else if (d[i].type == "PushEvent") {
					if (d[i].payload.ref.substring(0, 11) === 'refs/heads/') {
						rep = d[i].payload.ref.substring(11);
					} else {
						rep = d[i].payload.ref;
					}
                    e += '<div class="result">';
                    e += '	<div class="icon">';
                    e += '		<span class="octicon octicon-git-commit"></span>';
                    e += '	</div>';
                    e += '	<div class="gfpost">';
                    e += '		<p class="date">' + relative_time(d[i].created_at) + ' ago</p>';
                    e += '		<a href="https://github.com/' + d[i].actor.login + '" target="_blank">' + d[i].actor.login + '</a> ';
                    e += '		pushed to ';
                    e += '		<a href="https://github.com/' + d[i].repo.name + '/tree/' + d[i].payload.ref + '" target="_blank">' + rep + '</a> at ';
                    e += '		<a href="https://github.com/' + d[i].repo.name + '" target="_blank">' + d[i].repo.name + '</a>';
                    var c = d[i].payload.commits.length;
                    if (c === 2) {
                        e += '	<p><img class="letik" src="' + d[i].actor.avatar_url + '"/> <a href="https://github.com/' + d[i].repo.name + '/commit/' + d[i].payload.commits[0].sha + '" target="_blank">' + d[i].payload.commits[0].sha.substr(0, 6) + '</a> ' + d[i].payload.commits[0].message + '</p>';
                        e += '	<p><img class="letik" src="' + d[i].actor.avatar_url + '"/> <a href="https://github.com/' + d[i].repo.name + '/commit/' + d[i].payload.commits[1].sha + '" target="_blank">' + d[i].payload.commits[1].sha.substr(0, 6) + '</a> ' + d[i].payload.commits[1].message + '</p>';
                        e += '	<br><p><a href="https://github.com/' + d[i].repo.name + '/compare/' + d[i].payload.before + '...' + d[i].payload.head + '" target="_blank">View comparison for these 2 commits &raquo;</a></p>'
                    } else if (c > 2) {
                        e += '	<p><img class="letik" src="' + d[i].actor.avatar_url + '"/> <a href="https://github.com/' + d[i].repo.name + '/commit/' + d[i].payload.commits[0].sha + '" target="_blank">' + d[i].payload.commits[0].sha.substr(0, 6) + '</a> ' + d[i].payload.commits[0].message + '</p>';
                        e += '	<p><img class="letik" src="' + d[i].actor.avatar_url + '"/> <a href="https://github.com/' + d[i].repo.name + '/commit/' + d[i].payload.commits[1].sha + '" target="_blank">' + d[i].payload.commits[1].sha.substr(0, 6) + '</a> ' + d[i].payload.commits[1].message + '</p>';
                        e += '	<br><p><a href="https://github.com/' + d[i].repo.name + '/compare/' + d[i].payload.before + '...' + d[i].payload.head + '" target="_blank">' + (c - 2) + ' more commit &raquo;</a></p>'
                    } else {
                        e += '	<p><img class="letik" src="' + d[i].actor.avatar_url + '"/> <a href="https://github.com/' + d[i].repo.name + '/commit/' + d[i].payload.commits[0].sha + '" target="_blank">' + d[i].payload.commits[0].sha.substr(0, 6) + '</a> ' + d[i].payload.commits[0].message + '</p>'
                    }
                    e += '	</div>';
                    e += '</div>'
                } else if (d[i].type == "CreateEvent") {
                    if (d[i].payload.ref_type == "branch") {
                        e += '<div class="result">';
                        e += '	<div class="icon">';
                        e += '		<span class="octicon octicon-git-branch"></span>';
                        e += '	</div>';
                        e += '	<div class="gfpost">';
                        e += '		<a href="https://github.com/' + d[i].actor.login + '" target="_blank">' + d[i].actor.login + '</a> ';
                        e += '		created branch ';
                        e += '		<a href="https://github.com/' + d[i].repo.name + '/tree/' + d[i].payload.ref + '" target="_blank">' + d[i].payload.ref + '</a> at ';
                        e += '		<a href="https://github.com/' + d[i].repo.name + '" target="_blank">' + d[i].repo.name + '</a>';
                        e += '		<span class="date">' + relative_time(d[i].created_at) + ' ago</span>';
                        e += '	</div>';
                        e += '</div>'
                    } else if (d[i].payload.ref_type == "repository") {
                        e += '<div class="result">';
                        e += '	<div class="icon">';
                        e += '		<span class="octicon octicon-plus"></span>';
                        e += '	</div>';
                        e += '	<div class="gfpost">';
                        e += '		<a href="https://github.com/' + d[i].actor.login + '" target="_blank">' + d[i].actor.login + '</a> ';
                        e += '		created repository ';
                        e += '		<a href="https://github.com/' + d[i].repo.name + '" target="_blank">' + d[i].repo.name + '</a>';
                        e += '		<span class="date">' + relative_time(d[i].created_at) + ' ago</span>';
                        e += '	</div>';
                        e += '</div>'
                    } else if (d[i].payload.ref_type == "tag") {
                        e += '<div class="result">';
                        e += '	<div class="icon">';
                        e += '		<span class="octicon octicon-tag"></span>';
                        e += '	</div>';
                        e += '	<div class="gfpost">';
                        e += '		<a href="https://github.com/' + d[i].actor.login + '" target="_blank">' + d[i].actor.login + '</a> ';
                        e += '		created tag ';
                        e += '		<a href="https://github.com/' + d[i].repo.name + '/tree/'+d[i].payload.ref+'" target="_blank">' + d[i].payload.ref + '</a> at';
                        e += '		<a href="https://github.com/' + d[i].repo.name + '" target="_blank">' + d[i].repo.name + '</a>';
                        e += '		<span class="date">' + relative_time(d[i].created_at) + ' ago</span>';
                        e += '	</div>';
                        e += '</div>'
                    }
                }
            });
            $(z + ':eq(' + x + ') .' + ibacor[3] + 'activ').html(e)
        })
    }

    function relative_time(a) {
        if (!a) {
            return
        }
        a = $.trim(a);
        a = a.replace(/\.\d\d\d+/, "");
        a = a.replace(/-/, "/").replace(/-/, "/");
        a = a.replace(/T/, " ").replace(/Z/, " UTC");
        a = a.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
        var b = new Date(a);
        var c = (arguments.length > 1) ? arguments[1] : new Date();
        var d = parseInt((c.getTime() - b) / 1000);
        d = (d < 2) ? 2 : d;
        var r = '';
        if (d < 60) {
            r = 'jst now'
        } else if (d < 120) {
            r = 'a min'
        } else if (d < (45 * 60)) {
            r = (parseInt(d / 60, 10)).toString() + ' mins'
        } else if (d < (2 * 60 * 60)) {
            r = 'an hr'
        } else if (d < (24 * 60 * 60)) {
            r = (parseInt(d / 3600, 10)).toString() + ' hrs'
        } else if (d < (48 * 60 * 60)) {
            r = 'a day'
        } else {
            dd = (parseInt(d / 86400, 10)).toString();
            if (dd <= 30) {
                r = dd + ' dys'
            } else {
                mm = (parseInt(dd / 30, 10)).toString();
                if (mm <= 12) {
                    r = mm + ' mon'
                } else {
                    r = (parseInt(mm / 12, 10)).toString() + ' yrs'
                }
            }
        }
        return r
    }

    function addCommas(a) {
        var b = parseInt(a, 10);
        if (b === null) {
            return 0
        }
        if (b >= 1000000000) {
            return (b / 1000000000).toFixed(1).replace(/\.0$/, "") + "G"
        }
        if (b >= 1000000) {
            return (b / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
        }
        if (b >= 1000) {
            return (b / 1000).toFixed(1).replace(/\.0$/, "") + "K"
        }
        return b
    }
}
