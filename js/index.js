//pky85yencyysk4tnselgo3kjd8pc0n8
//https://api.twitch.tv/kraken/users/44322889?client_id=XXXXX
$(function(){
    var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];
    $.getJSON('https://api.twitch.tv/kraken/users/freecodecamp?client_id=pky85yencyysk4tnselgo3kjd8pc0n8').done(function(data){
        if(data.stream === null) {
            $('#fcc').html(' is offline');
        } else {
            $('#fcc').html(' is online');
        }
    });

    for(var i = 0; i < streams.length; i++) {
        $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/channels/' + streams[i],
            headers: {
                'client-ID':'pky85yencyysk4tnselgo3kjd8pc0n8'
            },
            success: function(dataI){
                $.getJSON('https://api.twitch.tv/kraken/streams/'+ dataI.name +'?client_id=pky85yencyysk4tnselgo3kjd8pc0n8').done(function(data2){
                    //console.log(data2);
                    var name = data2._links.self.slice(37);
                    if(data2.stream === null) {
                        $('#user').append('<a target="blank" href="https://www.twitch.tv/' + name +'">'+ name +'</a><br>');
                        $('#status').append('offline<br>');
                        $('#game').append('N/A<br>');
                    } else {
                        $('#user').append('<a target="blank" href="https://www.twitch.tv/' + name +'">'+ name +'</a><br>');
                        $('#status').append('ONLINE!<br>');
                        $('#game').append(data2.stream.game + '<br>');
                    }
                });
            },
            error: function(err){
                $('#user').append('Invalid User<br>');
                $('#status').append('Not Found<br>');
                $('#game').append('N/A<br>');
            }
        })
    };
});