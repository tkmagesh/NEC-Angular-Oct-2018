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

	async function addAsyncPromiseClient(x,y){
		console.log(`[@Client] triggering addSync`);
		let result = await addAsyncPromise(x,y);
		console.log(`[@Client result = ${result}`)
	}

	window['addAsyncPromiseClient'] = addAsyncPromiseClient;
})();

/*
Client
======

var p = addAsyncPromise(100,200);
p.then(function(result){
	console.log(`[@Client] result = ${result}`);
});

1. If the follow up operation is ASYNC
var p2 = p.then(function(result){
	console.log('result = ', result);
	var p2 = new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
            var doubleResult = result * 2;
			resolveFn(doubleResult);
        },4000);
    });
	return p2;
});
p2.then(function(doubleResult){
	console.log(`doubleResult = ${doubleResult}`);
})

2. If the follow up operation is SYNC
var p2 = p.then(function(result){
	console.log('result = ', result);
	var p2 = new Promise(function(resolveFn, rejectFn){
        var doubleResult = result * 2;
        resolveFn(doubleResult);
    });
	return p2;
});

OR

var p2 = p.then(function(result){
	console.log('result = ', result);
	var doubleResult = result * 2;
	var p2 = Promise.resolve(doubleResult);
	return p2;
});

OR

var p2 = p.then(function(result){
	console.log('result = ', result);
	var doubleResult = result * 2;
	return doubleResult;
});

*/


