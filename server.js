
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


/***********************************
Database
************************************/

var Storage = {
	add: function(name) {
		var item = {name: name, id: this.setId};
		this.items.push(item);
		this.setId += 1;
		return item;
	},
	delete: function(id){
		var idNum = Number(id);
		var chosenItem = [];
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].id === idNum){
				chosenItem = this.items[i];
				this.items.splice(i,i+1);

			}
		}
		return this.items;
	},
	edit: function(id, name){
		var idNum = Number(id);
		var chosenItem = "";
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].id === idNum){
				this.items[i].name = name;			
				chosenItem = this.items[i];

			}
		}
		return chosenItem;
	},
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.username = "Joe";
  storage.items = [];
  storage.setId = 1;
  return storage;
}

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

/*************************
</end of Database>
**************************/



var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
  response.json(storage.items);
});

app.get('/users/:username', function(request, response){

	if (!request.params.username){
	response.sendStatus(400)
	};

	response.json(storage);
	return;
})

app.post('/items', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.delete('/items/:id', function(request, response){
	if (!request.params.id){
		return response.sendStatus(400);
	} 
	var item = storage.delete(request.params.id);

	response.status(201).json(item);

});

app.put('/items/:id', jsonParser, function(request, response){
	if (!request.params.id){
		return response.sendStatus(400);
	} 

	var item = storage.edit(request.params.id, request.body.name)

	response.status(200).json(item);
});

app.listen(process.env.PORT || 8080, process.env.IP);


exports.app = app;
exports.storage = storage;