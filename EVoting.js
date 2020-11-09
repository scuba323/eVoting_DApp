const eVoting = artifacts.require('./src/contracts/eVoting.sol')

require('chai').use(require('chai-as-promised')).should()

contract('eVoting', ([deployer, elector]) => {
  let evoting

  before(async() => {
    evoting = await eVoting.deployed()
  })

  describe('deployment', async() => {
    it('deploys succesfully', async() => {
      const address = await evoting.address
      assert.notEqual(address,0x0)
      assert.notEqual(address,'')
      assert.notEqual(address,null)
      assert.notEqual(address,undefined)
    })
    it('has a name', async() => {
      const name= await evoting.dapp_name()
    assert.equal(name, 'eVoting DApp')
    })
})

  describe('candidates', async() => {
    let check, _choiceid

    it('new candidate', async() => {
      check = await evoting.candidateYourself("Beppe Vessicchio")
      _choiceid = await evoting.candidateID()
      //success
      assert.equal(_choiceid, 1)
      const event2 = check.logs[0].args
      //assert.equal(check.event2.)
    })
  })


  describe('votes', async() => {
    let result, _voteCount

    it('creates vote', async() => {
      result = await evoting.createVote(1, {from: elector})
      _voteCount = await evoting.voteCount()
      //success
      assert.equal(_voteCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), _voteCount.toNumber(), 'id is correct')
      assert.equal(event.voteChoice, 1, 'vote is correct')
      assert.equal(event.elector, elector, 'voter is correct')
      //Failure
    //  await evoting.createVote('', {from: voter}).should.be.rejected;
    })

  })

})
