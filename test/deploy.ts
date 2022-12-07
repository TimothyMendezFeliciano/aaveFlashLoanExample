import {DAI_WHALE, DAI, POOL_ADDRESS_PROVIDER} from "../config";
import hre, {ethers} from "hardhat"
import {expect} from "chai";


describe("Deploy a Flash Loan", () => {
    it("Should be able to create a loan and return", async () => {
        const flashLoan = await ethers.getContractFactory("FlashLoan");

        const flashLoanContract = await flashLoan.deploy(POOL_ADDRESS_PROVIDER);
        await flashLoanContract.deployed()

        const token = await ethers.getContractAt("IERC20", DAI);
        const BALANCE_AMOUNT_DAI = ethers.utils.parseEther("2000");

        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAI_WHALE]
        });

        const signer = await ethers.getSigner(DAI_WHALE);

        await token
            .connect(signer)
            .transfer(flashLoanContract.address, BALANCE_AMOUNT_DAI);

        const transaction = await flashLoanContract.createFlashLoan(DAI, "1000");
        transaction.wait();

        const remainingBalance = await token.balanceOf(flashLoanContract.address);
        expect(remainingBalance.lt(BALANCE_AMOUNT_DAI)).to.be.true
    })
})
