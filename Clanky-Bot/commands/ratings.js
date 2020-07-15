let players = require('../players.js');

function baseballs(num){
	let bb=""
	for (var i=0; i<num;i++){
		bb+=":baseball:"
	}
	return bb;
}

module.exports = {
	name: 'ratings',
	description: 'Ratings',
	execute(message, args) {

		let result="hmmm..";
		if (args.length==1){
		if (args[0].length==2){
			result = players.Players[args[0]].Name +"\n";
			result += "Batting  :" + baseballs(parseInt(players.Players[args[0]].Batting)) +"\n";
			result += "Running:" + baseballs(parseInt(players.Players[args[0]].Running)) +"\n";
			result += "Pitching:" + baseballs(parseInt(players.Players[args[0]].Pitching)) +"\n";
			result += "Fielding:" + baseballs(parseInt(players.Players[args[0]].Fielding));
		}
		}

		message.channel.send(result);

	},
};
