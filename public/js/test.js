'<div title="' + e.items[a].track.id + '"5ry2OE6R2zPQFDO85XkgRb" data="' + e.items[a].track.id.substring(1, 5) + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '> <div class="info"> <div class="img first"></div> <div class="titles"> <h5

"now(\'' + e.items[a].track.id + "
', " + a + ')
" class="
block ">' + e.items[a].track.name + '</h5> <p class="
block "> <
    span class = "artistName" > ' + e.items[a].track.artists[0].name + ' < /span> <span class="albumName">· The Album</span > < /p> </div > < /div><div class="buttons">

<
div onclick = "vote(' + e.items[a].track.id.substring(1, 5) + '\', 0)"
class = "voteBtn voteDown" > < i class = "fa fa-thumbs-o-down"
aria - hidden = "true" > < /i></div > < div onclick = "vote(ry2O', 1)"
class = "voteUp voteBtn"
name = "0" > < i class = "fa fa-thumbs-o-up"
aria - hidden = "true" > < /i></div > < sup > < /sup></div > < /div>

class = "voteBtn voteDown" > < i class = "fa fa-thumbs-o-down"
aria - hidden = "true" > < /i></div > < div onclick = "vote(' + e.items[a].track.id.substring(1, 5) + '\', 1)"
class = "voteUp voteBtn" > < i class = "fa fa-thumbs-o-up"
aria - hidden = "true" > < /i></div > < /div>  </div > ') : e.items[a].track.id == localStorage.nowp || null !== e.items[a].track.id && "null" != e.items[a].track.id || $("#results").append(' < div data = "' + hashCode(e.items[a].track.name + e.items[a].track.artists[0].name).substring(1, 5) + '"
title = "' + hashCode(e.items[a].track.name + e.items[a].track.artists[0].name) + '"
name = "' + e.items[a].track.popularity + '"
class = "songLinkClick next played song-' + a + '"
id = "songLinkClick' + a + '" > < div onclick = "vote(\'' + e.items[a].track.id.substring(1, 5) + '\', 0)"
class = "voteBtn voteDown" > < i class = "fa fa-thumbs-o-down"
aria - hidden = "true" > < /i></div > < div class = "info" > < div class = "img first" > < /div> <div class="titles"> <h5 onclick="now(\'' + e.items[a].track.id + "', " + a + ')"  class="block">' + e.items[a].track.name + '</h
5 > < p class = "block" > ' + e.items[a].track.artists[0].name + "</p> </div> </div> <div onclick=\"vote('
" + e.items[a].track.id.substring(1, 5) + '\', 1)"
class = "voteUp voteBtn" > < i class = "fa fa-thumbs-o-up"
aria - hidden = "true" > < /i></div > < /div>  </div > '