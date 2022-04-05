import React, {useState, useEffect} from "react";
import Home from "../pages/Home";
import {ethers, utils} from "ethers";
import abi from "../contracts/ProjectCadena.json";

const HomeContainer = () => {

    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [inputValue, setInputValue] = useState({ walletAddress: "", transferAmount: "", burnAmount: "", mintAmount: "", depositAmount : "", companyName : "" });
    const [tokenName, setTokenName] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [tokenTotalSupply, setTokenTotalSupply] = useState(0);
    const [isTokenOwner, setIsTokenOwner] = useState(false);
    const [tokenOwnerAddress, setTokenOwnerAddress] = useState(null);
    const [yourWalletAddress, setYourWalletAddress] = useState(null);
    const [error, setError] = useState(null);
    const [currentCompanyName, setCurrentCompanyName] = useState("");
    const [customerTotalBalance, setCustomerTotalBalance] = useState(null);
 
    const contractAddress = '0x4D49f14bC4E9e0D6097c0f68C160f26A92e87528';
    const contractABI = abi.abi;
    const {ethereum} = window;


    const checkIfWalletIsConnected = async () => {
        try {
        if (ethereum) {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            const account = accounts[0];
            setIsWalletConnected(true);
            setYourWalletAddress(account);
            console.log("Account Connected: ", account);
            customerBalance(account);
        } else {
            setError("Install a MetaMask wallet to get our token.");
            console.log("No Metamask detected");
        }
        } catch (error) {
        console.log(error);
        }
    }

    const getContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const cadenaContract = new ethers.Contract(contractAddress, contractABI, signer);
        return {cadenaContract, signer}
    
    }

    const parsingString = (string) => (utils.parseBytes32String(string));

    const getCompanyName = async () => {
        try {
          if(ethereum){
            const {cadenaContract} = getContract();
            let companyName = await cadenaContract.companyName();
            console.log(companyName);
            setCurrentCompanyName(companyName.toString());
          }else{
            setError("Please install a MetaMask wallet to use our app.");
            console.log("No Metamask detected");
          }
        } catch (error) {
          console.log(error);
        }
      }
      const setCompanyName = async (e) => {
        e.preventDefault();
        try {
          if (ethereum) {
            const {cadenaContract} = getContract();
            const txn = await cadenaContract.setCompanyName(inputValue.companyName);
            console.log("Setting Company Name...");
            await txn.wait();
            console.log("Company Name Changed", txn.hash);
            await getCompanyName();
    
          } else {
            console.log("Ethereum object not found, install Metamask.");
            setError("Please install a MetaMask wallet to use our company.");
          }
        } catch (error) {
          console.log(error);
        }
      }  
    const getTokenInfo = async () => {
        try {
            if (ethereum) {
                const {cadenaContract} = getContract();
                const [account] = await ethereum.request({ method: 'eth_requestAccounts' });

                let tokenName = await cadenaContract.name();
                let tokenSymbol = await cadenaContract.symbol();
                let tokenOwner = await cadenaContract.owner();
                let tokenSupply = await cadenaContract.totalSupply();
                tokenSupply = utils.formatEther(tokenSupply)

                setTokenName(tokenName);
                setTokenSymbol(tokenSymbol);
                setTokenTotalSupply(tokenSupply);
                setTokenOwnerAddress(tokenOwner);

                if (account.toLowerCase() === tokenOwner.toLowerCase()) {
                setIsTokenOwner(true)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const transferToken = async (e) => {
        e.preventDefault();
        try {
        if (ethereum) {
            const {cadenaContract} = getContract();

            const txn = await cadenaContract.transfer(inputValue.walletAddress, utils.parseEther(inputValue.transferAmount));
            console.log("Transfering tokens...");
            await txn.wait();
            console.log("Tokens Transfered", txn.hash);

        } else {
            console.log("Ethereum object not found, install Metamask.");
            setError("Install a MetaMask wallet to get our token.");
        }
        } catch (error) {
        console.log(error);
        }
    }

    const burnTokens = async (e) => {
        e.preventDefault();
        try {
        if (ethereum) {
            const {cadenaContract} = getContract();

            const txn = await cadenaContract.burn(utils.parseEther(inputValue.burnAmount));
            console.log("Burning tokens...");
            await txn.wait();
            console.log("Tokens burned...", txn.hash);

            let tokenSupply = await cadenaContract.totalSupply();
            tokenSupply = utils.formatEther(tokenSupply)
            setTokenTotalSupply(tokenSupply);

        } else {
            console.log("Ethereum object not found, install Metamask.");
            setError("Install a MetaMask wallet to get our token.");
        }
        } catch (error) {
        console.log(error);
        }
    }

    const customerBalance = async (account) => {
        try {
          if (ethereum) {
            const {cadenaContract} = getContract();
            console.log(yourWalletAddress);
            let balance = await cadenaContract.balanceOf(account);
            setCustomerTotalBalance(utils.formatEther(balance));
            console.log("Retrieved balance...", balance);
    
          } else {
            console.log("Ethereum object not found, install Metamask.");
            setError("Please install a MetaMask wallet to use our bank.");
          }
        } catch (error) {
          console.log(error)
        }
    }

    const depositMoney = async (e) => {
        e.preventDefault();
        try {
        if (ethereum) {
            const {cadenaContract} = getContract();
            console.log(inputValue.depositAmount);
            const txn = await cadenaContract.depositMoney({value : utils.parseEther(inputValue.depositAmount)});
            console.log("Deposting money...");
            await txn.wait();
            console.log("Deposited money...done", txn.hash);

            customerBalance();
            

        } else {
            console.log("Ethereum object not found, install Metamask.");
            setError("Install a MetaMask wallet to get our token.");
        }
        } catch (error) {
        console.log(error);
        }
    }

    const mintTokens = async (e) => {
        e.preventDefault();
        try {
        if (ethereum) {            
            const {cadenaContract} = getContract();
            
            let tokenOwner = await cadenaContract.owner();
            const txn = await cadenaContract.mint(tokenOwner, utils.parseEther(inputValue.mintAmount));
            console.log("Minting tokens...");
            await txn.wait();
            console.log("Tokens minted...", txn.hash);

            let tokenSupply = await cadenaContract.totalSupply();
            tokenSupply = utils.formatEther(tokenSupply)
            setTokenTotalSupply(tokenSupply);

        } else {
            console.log("Ethereum object not found, install Metamask.");
            setError("Install a MetaMask wallet to get our token.");
        }
        } catch (error) {
        console.log(error);
        }
    }
    ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    ethereum.on('accountsChanged', () => { 
        window.location.reload();
    });

    const handleInputChange = (e) => {
        setInputValue(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }));
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        getTokenInfo();
        getCompanyName();
        customerBalance();
    }, [])

return <Home isWalletConnected = {isWalletConnected}
             handleInputChange = {handleInputChange}
             mintTokens = {mintTokens}
             transferToken = {transferToken}
             burnTokens = {burnTokens}
             tokenName = {tokenName}
             tokenSymbol = {tokenSymbol}
             tokenTotalSupply = {tokenTotalSupply}
             isTokenOwner = {isTokenOwner}
             tokenOwnerAddress = {tokenOwnerAddress}
             yourWalletAddress = {yourWalletAddress}
             error = {error}
             currentCompanyName = {currentCompanyName}
             inputValue = {inputValue}
             customerTotalBalance = {customerTotalBalance}
             depositMoney = {depositMoney}
             contractAddress = {contractAddress}
             setCompanyName = {setCompanyName}
             />
}

export default HomeContainer