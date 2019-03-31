const Block =　require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length-1], data);
    this.chain.push(block);
    //console.log('After add block');
    //console.log(block.toString());
    //console.log(Block.blockhash(block));

    return block;
  }

  isValidChain(chain) {
      if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
  
      for (let i=1; i<chain.length; i++) {
        /*  console.log('just check block in chain');
          console.log(chain[i]);
        */  const block = chain[i];
          const lastBlock = chain[i-1];
          if(block.lastHash !== lastBlock.hash) {
              /*console.log('block lasthash and lastblock hash is different');
              console.log(block.lastHash);
              console.log(lastBlock.hash);
             */ return false;
          }
          if(block.hash !== Block.blockhash(block)) {
             /* console.log('block hash and blockhash(block) is different');
              console.log(block.hash);
              console.log(Block.blockhash(block));
              console.log(block.timestamp, block.lastHash, block.data);
              console.log(Block.hash(block.timestamp, block.lastHash, block.data));
             */ return false;
          }
      }
      return true;
    }

    replaceChain(newChain) {
      console.log(this.chain.length);
      console.log(newChain.length);
      if (newChain.length <= this.chain.length) {
        console.log('Received chain is not longer than the current chain');
        return;
      } else if (!this.isValidChain(newChain)) {
        console.log('The received chain is not valid');
        return;
      }

      console.log('Replacing blockchain with the new chain') 
        this.chain = newChain;
    }
}

module.exports = Blockchain;

