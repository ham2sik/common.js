var swipeData=function(urlName, urlNum, $path) {
	$.ajax({
		type: "GET",
		url: "/include/Main/Main_"+urlName+"_List_Ajax.asp",
		data: {Page_No: urlNum},
		success: function(data, textStatus, jqXHR) {
			$path.innerHTML=data;
			$path.setAttribute('data-check', 1);
			console.log(urlName+': [page number '+urlNum+'] load '+textStatus);
		}
	});
}


...
					, onSlideChangeStart : function(swiper) {
						var wrapId=swiper.wrapper['0'].parentElement.id, // wrap id
							swiperPrevIndex=swiper.previousIndex, // previous index number(init value=0)
							swiperActiveIndex=swiper.activeIndex, // active index number(init value=1)
							$slideActive=swiper.slides[swiperActiveIndex], // active slide path
							$slideActiveNext=$slideActive.nextElementSibling, // next slide path
							$slideActivePrev=$slideActive.previousElementSibling, // prev slide path
							slideLength=swiper.slides.length-2, // silde list size
							urlName=wrapId.split('_'), // url name(MGOLD, MSILVER, Group30, Best1000)
							urlNum; // load page number
						//console.log(swiper);
						if (slideLength < 4) { // 주요 채용공고(slideLength=2) 제외
							return false;
						}
						//console.log('ActiveIndex:'+swiperActiveIndex);
						if ($slideActiveNext==null) { // case max number
							//console.log('null');
							return false;
						}
						if ((swiperPrevIndex < swiperActiveIndex)&&($slideActiveNext.getAttribute('data-check')==null)) { // swipe next
							urlNum=swiperActiveIndex;
							swipeData(urlName[1], urlNum, $slideActiveNext);
						}
						if ($slideActivePrev==null) { // case 0
							if (swiper.slides[slideLength-1].getAttribute('data-check')==null) {
								urlNum=slideLength-2;
								$slideActivePrev=swiper.slides[slideLength-1];
								swipeData(urlName[1], urlNum, $slideActivePrev);
							}
							return false;
						}
						if ((swiperPrevIndex > swiperActiveIndex)&&($slideActivePrev.getAttribute('data-check')==null)) { // swipe prev
							urlNum=swiperActiveIndex-2;
							swipeData(urlName[1], urlNum, $slideActivePrev);
						}
						if ($slideActive.getAttribute('data-check')==null) { // provision
							console.log('%c provision mode!!!', 'color: red');
							urlNum=swiperActiveIndex-1;
							swipeData(urlName[1], urlNum, $slideActive);
						}
					}
