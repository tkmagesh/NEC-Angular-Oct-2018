var app = (function(){
	//Sync
	function addSync(x,y){
		console.log(`	[@Service] processing ${x} and ${y}`);
		let result = x + y;
		console.log(`	[@Service] returning result`);
		return result;
	}

	function addSyncClient(x,y){
		console.log(`[@Client] triggering addSync`);
		let result = addSync(x,y);
		console.log(`[@Client result = ${result}`)
	}

	window['addSyncClient'] = addSyncClient;

	//Async
	function addAsync(x,y, callback){
		console.log(`	[@Service] processing ${x} and ${y}`);
		setTimeout(function(){
			let result = x + y;
			console.log(`	[@Service] returning result`);
			callback(result);
		}, 4000);
	}

	function addAsyncClient(x,y){
		console.log(`[@Client] triggering addAsync`);
		addAsync(x,y, function(result){
			console.log(`[@Client] result = ${result}`);	
		});
	}

	window['addAsyncClient'] = addAsyncClient;

	var addAsyncEvents = (function(){
		var _callbacks = [];
		function process(x,y){
			console.log(`	[@Service] processing ${x} and ${y}`);
			setTimeout(function(){
				let result = x + y;
				console.log(`	[@Service] returning result`);
				_callbacks.forEach(callback => callback(result));
			}, 4000);
		}
		function subscribe(callback){
			_callbacks.push(callback);
		}
		return {
			process,
			subscribe
		};
	})();

	window['addAsyncEvents'] = addAsyncEvents;

	function addAsyncPromise(x,y){

		var promise = new Promise(function(resolveFn, rejectFn){
			console.log(`	[@Service] processing ${x} and ${y}`);
			setTimeout(function(){
				let result = x + y;
				console.log(`	[@Service] returning result`);
				resolveFn(result);
			}, 4000);
		});
		return promise;
	}

	window['addAsyncPromise'] = addAsyncPromise;
})();

/*
Client
======

var p = addAsyncPromise(100,200);
p.then(function(result){
	console.log(`[@Client] result = ${result}`);
});
*/


