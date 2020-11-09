import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
        <div className="container-fluid mt-5">
              <div className="row">
                <main role="main" className="col-lg-12 d-flex text-center">

                  <div className="content mr-auto ml-auto">
                    <p></p>

                    <form onSubmit={(event) => {
                      event.preventDefault()
                      const choice = this.choiceContent.value
                      var choosen;
                      for (var j=0; j<this.props.candidates.length; j++) {
                        if (choice == (this.props.candidates[j].name)) {
                          choosen = this.props.candidates[j].candidateID;
                          break;
                        } else {
                          choosen = 0;
                        }
                      }
                      this.props.createVote(choosen)
                      console.log("Voted for: "+choosen);
                    }}>
                    <li className="list-group-item">
                      <div className="form-group mr-sm-2">
                        <div className="card-header">
                          <p id="main_label_xtfr3232">VOTE NOW</p>
                        </div>
                        <p id="p_labels">Elector ID:</p>
                        <input
                          id="eidContent"
                          size='50'
                          type="text"
                          ref={(input) => {this.eidContent = input }}
                          className="form-control"
                          placeholder="Write your univoque elector ID"
                          required />
                        <p id="p_labels">Write your preference name:</p>
                        <input
                          id="choiceContent"
                          size='50'
                          type="text"
                          ref={(input2) => {this.choiceContent = input2 }}
                          className="form-control"
                          placeholder="Choose your candidate!"
                          required />
                      </div>
                      <button id="btn_candidate">VOTE</button>
                      <p></p>
                      </li>
                      <p></p>
                    </form>

                  </div>
                  <div className="content mr-auto ml-auto">
                    <p></p>
                    <form onSubmit={(event) => {
                      event.preventDefault()
                      const name = this.nameContent.value
                      const side = (this.sideContent.value).toUpperCase();
                      this.props.candidateYourself(name, side)
                      console.log(name + side);
                    }}>
                    <li className="list-group-item">
                      <div className="form-group mr-sm-2">
                        <div className="card-header">
                          <p id="main_label_xtfr3232">CANDIDATE YOURSELF</p>
                        </div>
                        <p id="p_labels">Name:</p>
                        <input
                          id="nameContent"
                          size='50'
                          type="text"
                          ref={(input) => {this.nameContent = input }}
                          className="form-control"
                          placeholder="Write your name to candidate yourself!"
                          required />
                        <p id="p_labels">Political side:</p>
                        <input
                          id="sideContent"
                          size='50'
                          type="text"
                          ref={(input2) => {this.sideContent = input2 }}
                          className="form-control"
                          placeholder="Write your political side for candidature"
                          required />
                      </div>
                      <button id="btn_candidate">Candidate</button>
                      <p></p>
                      </li>
                      <p></p>
                    </form>

                  </div>

                </main>

                <div className="content mr-auto ml-auto">

                  {this.props.candidates.map((candidate, key) => {
                    console.log(candidate.name+candidate.candidateID)
                    return (
                      <div className="card mb-4" key={key} >
                        <div className="card-header">
                          <small id="small-forme-edable">{candidate.politicalSide}</small>
                        </div>
                        <ul id="postList" className="list-group list-group-flush">
                          <li className="list-group-item">
                            <p id="p2_formain">{candidate.name}</p>
                            <br/>
                            <p id="p_formain">
                              VOTES: {candidate.votesNumber.toString()}
                            </p>
                          </li>
                        </ul>
                      </div>
                    )
                  })}
                </div>

              </div>
        </div>
    );
  }
}

export default Main;
