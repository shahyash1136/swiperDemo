var JOR = JOR || {};
JOR.baseUrl = '/js/json/318.json';
JOR.loadJson = function () {
    $.ajax({
        type: 'GET',
        url: JOR.baseUrl,
        success: function (data) {
            JOR.playerData = data;
            JOR.playerJourney();
        }
    });
}
JOR.seasons = [{
    name: "Season 7",
    displayName: "Season 7",
    id: "49",
    year: "2019"
}, {
    name: "Season 6",
    displayName: "Season 6",
    id: "26",
    year: "2018"
}, {
    name: "Season 5",
    displayName: "Season 5",
    id: "8",
    year: "2017"
}, {
    name: "Season 4",
    displayName: "Season 4",
    id: "4",
    year: "2016"
}, {
    name: "Season 3",
    displayName: "Season 3",
    id: "3",
    year: "2016"
}, {
    name: "Season 2",
    displayName: "Season 2",
    id: "2",
    year: "2015"
}, {
    name: "Season 1",
    displayName: "Season 1",
    id: "1",
    year: "2014"
}]
JOR.playerJourney = function () {
    var data = JOR.playerData;
    data.seasons = JOR.seasons.sort((a, b) => a.id - b.id);
    var markup;
    for (let i = 0; i < data.seasons.length; i++) {

        markup = `<div class="swiper-slide seasons-swipe" data-seasonId="${data.seasons[i].id}" data-year="${data.seasons[i].year}" data-season="${data.seasons[i].name}"><div class="sikb-box"><a><p class="year-block"><i class="year season-played">${data.seasons[i].year}</i></p></a></div></div>`
        document.querySelector('.journey-swiper-container .swiper-wrapper').innerHTML += markup;
    }


    JOR.journeySwiper = new Swiper(".journey-swiper-container", {
        slidesPerView: 5,
        loop: !0,
        centeredSlides: !0,
        loopAdditionalSlides: 2,
        nextButton: ".squad-next",
        prevButton: ".quad-prev",
        navigation: {
            nextEl: ".squad-next",
            prevEl: ".squad-prev"
        },
        /* breakpoints: {
            1024: {
                slidesPerView: 3
            },
            992: {
                slidesPerView: 2
            },
            640: {
                setWrapperSize: !0,
                slidesPerView: 5
            },
            320: {
                setWrapperSize: !0,
                slidesPerView: 5
            }
        } */
    })


    var lastestSeason = data.seasons[data.seasons.length - 1].id;
    var latestSlide = $('body').find('.swiper-slide[data-seasonId="' + lastestSeason + '"]').first().index();



    function slideData(seasonId, seasonName, seasonYear) {
        for (let j = 0; j < data.over_all_stats.length; j++) {
            if (Number(seasonId) === data.over_all_stats[j].series_id) {
                var playerData = data.over_all_stats[j];
                var firstName = playerData.player_team_arr[0].team_name.split(" ")[0];
                var space = playerData.player_team_arr[0].team_name.indexOf(" ");
                var lastName = playerData.player_team_arr[0].team_name.substring(space);
                var headerMarkup = `<div class="jy-header-block"> <div class="jy-logo"><img src="../images/teams/small/${playerData.player_team_arr[0].team_id}.png"></div><div class="jy-teamname"> <p class="logotxt">${firstName}</p><p class="logotxt-2">${lastName}</p><p class="logotxt-3">${seasonYear}</p><p class="logotxt-4">${seasonName}</p></div></div>`;
                document.querySelector('.journey-header').innerHTML = headerMarkup;
                
                document.querySelector('.total-points-earned').innerHTML = playerData.point;
                document.querySelector('.matches-played').innerHTML = playerData.match_played;
                document.querySelector('.tackle-sr').innerHTML = Math.round(playerData.tackle_success_rate) + "%";
                document.querySelector('.raid-sr').innerHTML = Math.round(playerData.success_raid_percent) + "%";

                var tackleSvg = 340 - 3.4 * playerData.tackle_success_rate;
                var raidSvg = 340 - 3.4 * playerData.success_raid_percent; 
                document.querySelector('.tackle-svg').style.strokeDashoffset = tackleSvg;
                document.querySelector('.raid-svg').style.strokeDashoffset = raidSvg;
                break;
            }
            if (!data.over_all_stats[j].series_id) {
                JOR.journeySwiper.slideNext();
            }
        }
    }

    var slideChange = JOR.journeySwiper.on('slideChange', function () {
        var newSeasonId = $('body').find('.swiper-slide').eq(JOR.journeySwiper.activeIndex).attr('data-seasonId');
        var newSeasonName = $('body').find('.swiper-slide').eq(JOR.journeySwiper.activeIndex).attr('data-season');
        var newSeasonYear = $('body').find('.swiper-slide').eq(JOR.journeySwiper.activeIndex).attr('data-year');
        slideData(newSeasonId, newSeasonName, newSeasonYear);
    });

    if (JOR.journeySwiper.slideTo(latestSlide), slideChange) {
        var newSeasonId = $('body').find('.swiper-slide').eq(JOR.journeySwiper.activeIndex).attr('data-seasonId');
        var newSeasonName = $('body').find('.swiper-slide').eq(JOR.journeySwiper.activeIndex).attr('data-season');
        var newSeasonYear = $('body').find('.swiper-slide').eq(JOR.journeySwiper.activeIndex).attr('data-year');
        slideData(newSeasonId, newSeasonName, newSeasonYear);
    }

}


$(document).ready(function () {
    JOR.loadJson();
});