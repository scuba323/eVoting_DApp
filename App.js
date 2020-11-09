import React, { Component } from 'react';
import Web3 from 'web3';
import './style.css';
import EVoting from '../abis/EVoting.json';
import Navbar from './Navbar';
import Identicon from 'identicon.js';
import Main from './Main';

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData();
  }

  //load Metamask
  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      try {
          await window.ethereum.enable()
      } catch (error) { }
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3= window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkID = await web3.eth.net.getId()
    const networkData = EVoting.networks[networkID]
    if(networkData) {
      const evoting = new web3.eth.Contract(EVoting.abi, networkData.address)
      this.setState({ evoting })
      const voteCount = await evoting.methods.voteCount().call()
      const candidateID = await evoting.methods.candidateID().call()
      console.log("Votes (total): " + voteCount)
      console.log("Candidates: " + candidateID)
      this.setState({candidateID})

      for (var i=0; i<=candidateID; i++) {
        const candidate = await evoting.methods.candidates(i).call()
        this.setState( {
          candidates: [...this.state.candidates, candidate]
        })
      }
      this.setState({ candidates: this.state.candidates.sort((a,b) => b.votesNumber - a.votesNumber ) })
      this.setState({ loading: false })
    } else {
      window.alert("E-Voting contract not deployed to detected network.")
    }
  }

    createVote(choice) {
      this.setState({ loading: true })
      this.state.evoting.methods.createVote(choice).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
    }

    candidateYourself(name, side) {
      this.setState({ loading: true })
      this.state.evoting.methods.candidateYourself(name, side).send({ from: this.state.account })
      .once('receipt', (receipt) => {
          this.setState({ loading: false })
      })
    }

    constructor(props) {
      super(props)
      this.state = {
        account: '',
        evoting: null,
        voteCount: 0,
        candidateID: 0,
        candidates: [],
        votesNumber: 0,
        loading: true
      }
      this.createVote = this.createVote.bind(this)
      this.candidateYourself = this.candidateYourself.bind(this)
    }

    render() {
      return (
        <div>
          <Navbar account= { this.state.account }/>
          { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              candidates= {this.state.candidates}
              createVote= {this.createVote}
              candidateYourself= {this.candidateYourself}
            />
          }
        </div>
      )
    }

}
export default App;
