import { ethers } from 'ethers';
import  { tokenAddresses } from './erc20List';

// A Web3Provider wraps a standard Web3 provider, which is
// what Metamask injects as window.ethereum into each page

class EtherUtils {

static async getWalletBalance(address) {
    const balance = await EtherUtils.provider.getBalance(address);
    const formattedBalance = ethers.utils.formatEther(balance);
    return formattedBalance;
}

static async getWalletTokenBalance(walletAddress,tokenContractAddress) {
    let balance=0.0
    const contract = new ethers.Contract(tokenContractAddress, EtherUtils.genericErc20Abi, EtherUtils.provider);
    try{
    balance = await contract.balanceOf(walletAddress);
    }catch (error) {
            console.error(error);
    }
    if(balance>0) return  ethers.utils.formatEther(balance);
}

 static async getWalletTokensWithBalance(walletAddress) {

    return new Promise((resolve, reject) => {
        const tokensWithBalance=[];
        var promisesResolved=0;

    //const tokenAddressesi = tokenAddresses.slice(0, 2500);
    for (let i = 0; i < tokenAddresses.length; ++i) {
        
        // eslint-disable-next-line no-loop-func
        EtherUtils.getWalletTokenBalance(walletAddress,tokenAddresses[i]).then((balance) => {
            promisesResolved++;
            if(balance>0){
                tokensWithBalance[tokenAddresses[i]]= {"balance":balance};
            }
            if(promisesResolved===tokenAddresses.length) {
                return resolve(tokensWithBalance);
            }
          }).catch(e => {
            console.log(e);
        });
    }
     });
}

static async getTokenInfo(tokenAddress){
    const response= await fetch('/etherwatch/tokens/'+tokenAddress+'.json');
    const info= await response.json();
    return info;
}

static async getWalletTokensWithBalanceFull(walletAddress){
    const tokens= await EtherUtils.getWalletTokensWithBalance(walletAddress);
    for (const [key, value] of Object.entries(tokens)) {
    const tokenInfo = await EtherUtils.getTokenInfo(key);
    tokens[key]['symbol'] = tokenInfo.symbol;
    tokens[key]['name'] = tokenInfo.name;
    tokens[key]['info'] = tokenInfo;
    }
    return tokens;
}

}

EtherUtils.provider = new ethers.providers.Web3Provider(window.ethereum);
EtherUtils.genericErc20Abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

export default EtherUtils;