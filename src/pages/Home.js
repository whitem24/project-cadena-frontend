import React from "react";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'react-router-dom';

const Home = ({isWalletConnected, handleInputChange, mintTokens, transferToken, burnTokens, tokenName, tokenSymbol, tokenTotalSupply, isTokenOwner, tokenOwnerAddress, yourWalletAddress, error, currentCompanyName, inputValue, depositMoney, contractAddress, setCompanyName, customerTotalBalance}) => {
  
    return(<main className="container mt-5">
                {isWalletConnected ? (<>
                    <div className="row">
                        <h1 className="text-center">{currentCompanyName}</h1>
                        <img className="inline p-3 ml-2" src="https://i.imgur.com/5JfHKHU.png" alt="Meme Coin" width="60" height="30" />
                    </div>
                    <div className="row">
                        <h4 className="text-center mb-3">Public section</h4>
                        <div className="offset-md-1 col-md-4 col-sm-12 bg-primary rounded border border-3 border-dark">
                            <Form className="mx-2 my-4 text-light">
                                <Form.Group className="mb-3">
                                
                                    <Form.Label>Transfer Tokens</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={handleInputChange}
                                        name="walletAddress"
                                        placeholder="Wallet Address"
                                        value={inputValue.walletAddress}
                                        className="mb-2"
                                        />                               
                                    <Form.Control
                                        type="text"
                                        onChange={handleInputChange}
                                        name="transferAmount"
                                        placeholder={`Amount (0.0000 ${tokenSymbol})`}
                                        value={inputValue.transferAmount}/>
                                </Form.Group>
                            
                                <Button className="btn btn-light" type="button" onClick={transferToken}>
                                        Transfer
                                </Button>
                            
                                <Form.Group className="mb-3 mt-4">
                                    <Form.Label>Deposit Money</Form.Label>
                                    <Form.Control 
                                        type="text"  
                                        onChange={handleInputChange}
                                        name="depositAmount"
                                        placeholder={`0.0000 ETH`}
                                        value={inputValue.depositAmount}/>
                                </Form.Group>
                                <Button className="btn btn-light" type="button" onClick={depositMoney}>
                                        Deposit
                                </Button>

                            </Form>
                        </div>
                        <div className="offset-md-2 col-md-4 col-sm-12 d-flex align-items-center bd-highlight justify-content-center bg-dark rounded border border-3 border-primary">
                            {error && <p className="text-danger">{error}</p>}
                            <div className="text-center">
                                <div className="mr-5 p-2"><strong className="text-primary">Contract Address:</strong> <span className="text-light">{contractAddress}</span></div>
                                <div className="mr-5 p-2"><strong className="text-primary">Coin:</strong> <span className="text-light">{tokenName}</span></div>
                                <div className="mr-5 p-2"><strong className="text-primary">Ticker:</strong> <span className="text-light">{tokenSymbol}</span> </div>
                                <div className="mr-5 p-2"><strong className="text-primary">Total Supply:</strong> <span className="text-light">{tokenTotalSupply}</span></div>
                                <hr className="text-light"/>
                                <div className="mr-5 p-2"><strong className="text-primary">Your Address:</strong> <span className="text-light">{yourWalletAddress}</span></div>
                                <div className="mr-5 p-2"><strong className="text-primary">Your Balance:</strong> <span className="text-light">{customerTotalBalance}</span></div>
                            
                            </div>
                            
                             
                        </div>
                    </div></>) : 
                    <div className="card">
                        <div className="card-header bg-danger text-center text-light">
                            Please connect your wallet
                        </div>
                        {/* <div className="card-body">
                            <Link to="/" className="btn btn-primary">Go somewhere</Link>
                        </div> */}
                    </div>}
                
                {isTokenOwner && (
                    <div className="row mt-5">
                        <h4 className="text-center mb-3">Owner section</h4>
                        <div className="offset-4 col-4 bg-primary rounded border border-3 border-dark">
                            <Form className="mx-2 my-4 text-light">
                                <Form.Group className="mb-3">
                                    <Form.Label>Set Company Name</Form.Label>
                                    <Form.Control  
                                        type="text"
                                        onChange={handleInputChange}
                                        name="companyName"
                                        placeholder="New Name"
                                        value={inputValue.companyName}
                                    />
                                </Form.Group>
                                <Button className="btn btn-light" type="button" onClick={setCompanyName}>
                                        Update
                                </Button>
                                <Form.Group className="mt-3 mb-3">
                                    <Form.Label>Burn Tokens</Form.Label>
                                    <Form.Control  
                                        type="text"
                                        onChange={handleInputChange}
                                        name="burnAmount"
                                        placeholder={`0.0000 ${tokenSymbol}`}
                                        value={inputValue.burnAmount}
                                    />
                                </Form.Group>
                                <Button className="btn btn-light" type="button" onClick={burnTokens}>
                                        Burn
                                </Button>
                                
                            
                                <Form.Group className="mb-3 mt-4">
                                    <Form.Label>Mint Tokens</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        onChange={handleInputChange}
                                        name="mintAmount"
                                        placeholder={`0.0000 ${tokenSymbol}`}
                                        value={inputValue.mintAmount} 
                                    />
                                </Form.Group>
                                <Button className="btn btn-light" type="button" onClick={mintTokens}>
                                        Mint
                                </Button>

                            </Form>
                        </div>
                    </div>
                )}
                        

                
            
            
            
            
            </main>
            )

}

export default Home