const URLapi = "https://swapi.co/api/films/";

$(document).ready(function() {
	let jsonData = "";

    search();

	function search() {
		// empty result area first
		$("#resultData").empty();
        
        $.getJSON(URLapi)
	    .done(function(resp) {
	    	// console.log(resp);
            jsonData = resp.results;
            let datas = [];

            if (jsonData.length > 1) {
                for (const data of jsonData) {
                    datas[data.episode_id - 1] = data;
                }
            }
            
	    	displaySearchData(datas);
		});
	}

	function displaySearchData(datas) {
		datas.forEach(function(data) {
            const id = data.url.substring(data.url.length-2, data.url.length-1);

            $("#resultData").append(
				"<div class='resultItem' id='"+id+"'><h2>"+data.title+"</h2><h3>Episode "+data.episode_id+"</h3>"+data.opening_crawl+"</div>"
            );
            
            displayDetail(data.characters, id);
        });
        
        $("div.resultItem").on('click', function() {
            const elementID = this.getAttribute('id');
            const classVal = $("div#"+elementID+".itemDetail").attr('class');
            if (classVal.indexOf('hidden') > -1) {
                $("div#"+elementID+".itemDetail").attr('class', 'itemDetail');
            } else {
                $("div#"+elementID+".itemDetail").attr('class', 'itemDetail hidden');
            }
        })
    }
    
    function displayDetail(characters, id) {
        // console.log(characters);
        for (let i=0; i<characters.length; i++) {
            const url = characters[i];
            
            let jsonDetail = "";

        // searchDetail();

        // function searchDetail() {
            if ($("div#"+id+".itemDetail").length == 0) {
                $("#resultData").append(
                    "<div class='itemDetail hidden' id='"+id+"'><h3>Characters</h3><span class='char'></span></div>"
                );
            } 
            
            $.getJSON(url)
            .done(function(resp) {
                // console.log(`${resp.name}, ${id}`);
                let koma = '';

                if ($("div#"+id+".itemDetail span.char").html() == "") {
                    koma = '';
                } else {
                    koma = ', ';
                }

                $("div#"+id+".itemDetail span.char").append(
                    koma+resp.name
                );
            });
        // }
        }
    }

});