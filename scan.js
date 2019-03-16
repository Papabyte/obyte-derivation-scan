"use strict";

var Mnemonic = require('bitcore-mnemonic');
var Bitcore = require('bitcore-lib');
var ecdsa = require('secp256k1');
var objectHash = require('./object_hash.js');

var seed ='dégager visqueux punaise tonneau hiver lexique mascotte embellir poney brebis prince pierre';
var targetAddress = 'RJNAES5X2J2IGROAYPED6IVVRTEQ5FLO';

if (Mnemonic.isValid(seed)){
	console.log("mnemonic valid");
}else{
	return console.log("mnemonic invalid");
}

var mnemonic = new Mnemonic(seed);

for (var walletId = 0; walletId < 100; walletId++){
	
console.log("Process wallet id: " + walletId +"\n");
	
	var xPrivKey = mnemonic.toHDPrivateKey("");
	var xPubkeym4400 = Bitcore.HDPublicKey(xPrivKey.derive("m/44'/0'/"+ walletId + "'"))

	for (var addressIndex = 0; addressIndex < 100; addressIndex++){
		console.log(addressIndex+ "\n");
		var address = objectHash.getChash160(["sig", {"pubkey": derivePubkey(xPubkeym4400, 'm/0/' + addressIndex)}]);
		console.log(address+ "\n");
		if (address == targetAddress){
			return console.log("Address found fuck yeah! Path:" + "m/44'/0'/"+ walletId + "'" + '/0/' + addressIndex);
		}
		
		var changeAddress = objectHash.getChash160(["sig", {"pubkey": derivePubkey(xPubkeym4400, 'm/1/' + addressIndex)}]);
		if (changeAddress == targetAddress){
			return console.log("Address found fuck yeah! Path:" + "m/44'/0'/"+ walletId + "'" + '/1/' + addressIndex);
		}
		console.log(changeAddress+ "\n");
	}
}
console.log("address not found");

function derivePubkey(xPubKey, path){
	var hdPubKey = new Bitcore.HDPublicKey(xPubKey);
	return hdPubKey.derive(path).publicKey.toBuffer().toString("base64");
}