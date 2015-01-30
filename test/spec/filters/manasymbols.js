'use strict';

describe('Filter: manaSymbols', function () {

  // load the filter's module
  beforeEach(module('mtgEmblemsApp'));

  // initialize a new instance of the filter before each test
  var manaSymbols;
  beforeEach(inject(function ($filter) {
    manaSymbols = $filter('manaSymbols');
  }));

  it('should return the input with all mana symbols to be replaced:"', function () {
    var text = '{0}{1}{2}{2B}{2G}{2R}{2U}{2W}{3}{4}{5}{6}{7}{8}{9}{10}{11}{12}{13}{14}{15}{16}{17}{18}{19}{20}{100}{1000000}{B}{BG}{BP}{BR}{C}{G}{GP}{GU}{GW}{H}{HR}{HW}{INF}{P}{Q}{R}{RG}{RP}{RW}{S}{Slash}{T}{Tv2}{Tv3}{U}{UB}{UP}{UR}{W}{WB}{WOld}{WP}{WU}{X}{Y}{Z}';
    expect(manaSymbols(text).$$unwrapTrustedValue()).toBe('<i class="mana nk_icon_0" title="{0}"></i><i class="mana nk_icon_1" title="{1}"></i><i class="mana nk_icon_2" title="{2}"></i><i class="mana nk_icon_2b" title="{2B}"></i><i class="mana nk_icon_2g" title="{2G}"></i><i class="mana nk_icon_2r" title="{2R}"></i><i class="mana nk_icon_2u" title="{2U}"></i><i class="mana nk_icon_2w" title="{2W}"></i><i class="mana nk_icon_3" title="{3}"></i><i class="mana nk_icon_4" title="{4}"></i><i class="mana nk_icon_5" title="{5}"></i><i class="mana nk_icon_6" title="{6}"></i><i class="mana nk_icon_7" title="{7}"></i><i class="mana nk_icon_8" title="{8}"></i><i class="mana nk_icon_9" title="{9}"></i><i class="mana nk_icon_10" title="{10}"></i><i class="mana nk_icon_11" title="{11}"></i><i class="mana nk_icon_12" title="{12}"></i><i class="mana nk_icon_13" title="{13}"></i><i class="mana nk_icon_14" title="{14}"></i><i class="mana nk_icon_15" title="{15}"></i><i class="mana nk_icon_16" title="{16}"></i><i class="mana nk_icon_17" title="{17}"></i><i class="mana nk_icon_18" title="{18}"></i><i class="mana nk_icon_19" title="{19}"></i><i class="mana nk_icon_20" title="{20}"></i><i class="mana nk_icon_100" title="{100}"></i><i class="mana nk_icon_1000000" title="{1000000}"></i><i class="mana nk_icon_b" title="{B}"></i><i class="mana nk_icon_bg" title="{BG}"></i><i class="mana nk_icon_bp" title="{BP}"></i><i class="mana nk_icon_br" title="{BR}"></i><i class="mana nk_icon_c" title="{C}"></i><i class="mana nk_icon_g" title="{G}"></i><i class="mana nk_icon_gp" title="{GP}"></i><i class="mana nk_icon_gu" title="{GU}"></i><i class="mana nk_icon_gw" title="{GW}"></i><i class="mana nk_icon_h" title="{H}"></i><i class="mana nk_icon_hr" title="{HR}"></i><i class="mana nk_icon_hw" title="{HW}"></i><i class="mana nk_icon_inf" title="{INF}"></i><i class="mana nk_icon_p" title="{P}"></i><i class="mana nk_icon_q" title="{Q}"></i><i class="mana nk_icon_r" title="{R}"></i><i class="mana nk_icon_rg" title="{RG}"></i><i class="mana nk_icon_rp" title="{RP}"></i><i class="mana nk_icon_rw" title="{RW}"></i><i class="mana nk_icon_s" title="{S}"></i><i class="mana nk_icon_slash" title="{Slash}"></i><i class="mana nk_icon_t" title="{T}"></i><i class="mana nk_icon_tv2" title="{Tv2}"></i><i class="mana nk_icon_tv3" title="{Tv3}"></i><i class="mana nk_icon_u" title="{U}"></i><i class="mana nk_icon_ub" title="{UB}"></i><i class="mana nk_icon_up" title="{UP}"></i><i class="mana nk_icon_ur" title="{UR}"></i><i class="mana nk_icon_w" title="{W}"></i><i class="mana nk_icon_wb" title="{WB}"></i><i class="mana nk_icon_wold" title="{WOld}"></i><i class="mana nk_icon_wp" title="{WP}"></i><i class="mana nk_icon_wu" title="{WU}"></i><i class="mana nk_icon_x" title="{X}"></i><i class="mana nk_icon_y" title="{Y}"></i><i class="mana nk_icon_z" title="{Z}"></i>');
  });

  it('should not change anything else:"', function () {
    var text = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
    expect(manaSymbols(text).$$unwrapTrustedValue()).toBe('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.');
  });
});