const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString(){
        return `Block  - 
            Timestamp :${this.timestamp}
            Lasthash  :${this.lastHash.substring(0,10)}
            Hash      :${this.hash}
            Nonce     :${this.nonce}
            Difficulty:${this.difficulty}
            Data      :${this.data}`;
    }

    static genesis(){
        return new this('Gnenesistime', '-------','f1r57-jukesy',[], 0, DIFFICULTY);
    }

    static mineBlock(lastBlock, data){
        let hash;
        let timestamp = Date.now();
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty); 
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty) );

       /* console.log('after mine block');
        console.log(timestamp);
        console.log(lastHash);
        console.log(hash);
        console.log(data); */

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockhash(block){
        const { timestamp, lastHash, data, nonce, difficulty} = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty +1 : difficulty -1;
        return difficulty;
    }

}


module.exports = Block;