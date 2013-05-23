
embleme2 = embleme.slice 0

parse_mana = (html) ->
  html = html.replace /\{([0-9BWRUGPSTQXYZ]+)\}/g, (match, match2) ->
    "<i class=\"mana nk_icon_"+match2.toLowerCase()+"\" title=\""+match+"\"></i>"

  return html

shuffle = (a) ->
  i = a.length
  while --i > 0
    j = ~~(Math.random() * (i + 1))
    t = a[j]
    a[j] = a[i]
    a[i] = t
  a

get_emblem = ->
  shuffle(embleme2)
  emblem = $('<li>' + parse_mana(embleme2[0].text + '</li>')).hide()
  $('#embleme').prepend(emblem).show('slow')
  $('li').first().fadeIn('slow')
  $('#anzahl').text(parseInt($('#anzahl').text()) + 1)

get_emblem2 = ->
  shuffle(embleme2)
  emblem = $('<li>' + parse_mana(embleme2.pop().text + '</li>')).hide()
  $('#embleme').prepend(emblem).show('slow')
  $('li').first().fadeIn('slow')
  $('#anzahl').text(parseInt($('#anzahl').text()) + 1)

reset_emblems = ->
  embleme2 = embleme.slice 0
  $('#embleme').hide('slow').html('')
  $('#anzahl').text('0')

$ -> 
  $('#send').click -> 
    get_emblem2()
  $('#reset').click ->
    reset_emblems()
  $('#total-emblem-count').text(embleme.length + ' Emblems in the database')
