
embleme2 = embleme.slice 0
embleme3 = embleme.slice 0

parse_mana = (html) ->
  html = html.replace /\{([0-9BWRUGPSTQXYZ]+)\}/g, (match, match2) ->
    "<i class=\"mana nk_icon_"+match2.toLowerCase()+"\" title=\""+match+"\"></i>"

  return html

htmlForTextWithEmbeddedNewlines = (text) ->
  htmls = []
  lines = text.split(/\n/)

  tmpDiv = $(document.createElement("div"))
  i = 0

  while i < lines.length
    htmls.push tmpDiv.text(lines[i]).html()
    i++
  htmls.join "<br>"

shuffle = (a) ->
  i = a.length
  while --i > 0
    j = ~~(Math.random() * (i + 1))
    t = a[j]
    a[j] = a[i]
    a[i] = t
  a

get_emblem = (anzahl, automatic, permanent) ->
  for [0...anzahl]
    shuffle(embleme3)
    chosen_emblem = embleme3[0]
    emblem = $('<li class="table-view-cell">' + parse_mana(htmlForTextWithEmbeddedNewlines(chosen_emblem.text) + '</li>')).hide()
    if automatic && !permanent then emblem.css('background-color', '#ccc')
    if permanent
      emblem.css('background-color', 'yellow')
      $('#permanent_embleme').prepend(emblem).show('slow')
    else
      $('#embleme').prepend(emblem).show('slow')
    $(if permanent then '#permanent_embleme > ' else '#embleme > ' + 'li').first().fadeIn('slow')
    $('#anzahl').text(parseInt($('#anzahl').text()) + 1)
    if chosen_emblem.draw_others
      get_emblem(chosen_emblem.draw_others, true, if chosen_emblem.permanent then true else false)

get_emblem2 = ->
  shuffle(embleme2)
  chosen_emblem = embleme2.pop()
  emblem = $('<li class="table-view-cell">' + parse_mana(htmlForTextWithEmbeddedNewlines(chosen_emblem.text) + '</li>')).hide()
  $('#embleme').prepend(emblem).show('slow')
  $('#embleme > li').first().fadeIn('slow')
  $('#anzahl').text(parseInt($('#anzahl').text()) + 1)
  if chosen_emblem.draw_others
    console.log("get_emblem(#{chosen_emblem.draw_others}, true, #{if chosen_emblem.permanent then true else false})")
    get_emblem(chosen_emblem.draw_others, true, if chosen_emblem.permanent then true else false)

reset_emblems = ->
  embleme2 = embleme.slice 0
  $('#embleme').hide('slow').html('')
  $('#permanent_embleme').hide('slow').html('')
  $('#anzahl').text('0')

$ ->
  $('#send').click ->
    get_emblem2()
  $('#reset').click ->
    reset_emblems()
  $('#total-emblem-count').text(embleme.length + ' Emblems in the database')
