#!/usr/bin/env ts-node

require('dotenv').config();

const program = require('commander');

const StellarSdk = require('stellar-sdk');

StellarSdk.Network.usePublicNetwork();

const ADDRESS = 'GATXYCZDOR5H4FTILZ3HDOIOPBMCDZWSSFWIOQIBIQUVY5XRBDMQGW7L';

var account = new StellarSdk.Account(ADDRESS, '84688001933770754');

var prompt = require('prompt');

var server = new StellarSdk.Server('https://horizon.stellar.org');

try {

program
  .command('setdomain <domain>')
  .action(async (domain) => {

    try {

      var transaction = new StellarSdk.TransactionBuilder(account)

        .addOperation(StellarSdk.Operation.setOptions({
          homeDomain: 'any.anypay.global'
        }))

        .build();

        } catch(error) {

          console.error('error building transaction', error.message);
        }

    transaction.sign(StellarSdk.Keypair.fromSecret(process.env.STELLAR_SECRET));

    let transactionResult = await server.submitTransaction(transaction);

    console.log('transaction result', transactionResult);
  
  });

program
  .command('getsequencenumber <address>')
  .action(async (address) => {

    let account = await server.loadAccount(address); 

    console.log(account);

  });


program.parse(process.argv);

} catch(error) {

  console.error(error.message);

}

