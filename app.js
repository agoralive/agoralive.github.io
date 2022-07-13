	
		const CHAIN = 19 ; //Songbird Network
		
		load();
		
		async function load() {
			await loadWeb3();
			window.contract = await loadContract();
			updateStats()
		}
		
        async function loadWeb3() {
			if (window.ethereum) {
				window.web3 = new Web3(window.ethereum);
				detectMaticNetwork();
			}
			
		}
		
		//Checking if User is on Polygon Network
		
		async function detectMaticNetwork(){
			var networkID = await web3.eth.net.getId().then();
			
			if(networkID != CHAIN){
				document.querySelector('.connect').innerHTML = '<h3 style="color: yellow;">SWITCH TO POLYGON NETWORK</h3>';
			}else {
				getAccount();
			}
		}
		
		
		//Checking if Account or Network Changed
		
		window.addEventListener("load", function() {
			if (window.ethereum) {
				
				//Get current Metamask Instance
				window.web3 = new Web3(window.ethereum);

				// detect Metamask account change
				window.ethereum.on('accountsChanged', function (accounts) {
					console.log('Account Changed',accounts);
					window.location.reload();
					getAccount();

				});

				// detect Network account change
				window.ethereum.on('chainChanged', function(networkId){
					window.location.reload();
				});
			}
		});
		
		const connectBtn = document.querySelector('.connect-btn');
		
		connectBtn.addEventListener('click', () => {
			getAccount();
		});
		
		async function getAccount() {
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];
			connectBtn.classList.remove('not-connected');
			connectBtn.classList.add('connected');
			connectBtn.innerHTML = account.substring(0, 4) + "..." + account.substring(account.length - 4, account.length);
			
			document.querySelector('#my-referral-link').value = "https://maticmixer.tech/?ref=" + account;
			
			getUserStats(account);
		}
		
		async function updateStats(){
		
			//Updating Total Staked
			const totalStaked = await window.contract.methods.totalStaked().call();
			document.querySelector('.totalStaked').innerHTML = convertWei(totalStaked) +" "+ "<span class=\"unit\"> SGB</span>";
			
			//Updating Contract Balance
			const contractBalance = await window.contract.methods.getContractBalance().call();
			document.querySelector('.contract-bal').innerHTML = convertWei(contractBalance) +" " + "<span class=\"unit\"> SGB</span>";
			
			//Updating Investors
			const totalInvestors = await window.contract.methods.totalUsers().call();
			document.querySelector('.total-investors').innerHTML = (totalInvestors);  +" " + "<span class=\"unit\"> Players</span>";
			
			//Updating Plan Percentages
			const planPercent0 = 180;//await window.contract.methods.getPercent('0').call();
			var planReturn0 = calRoi(planPercent0 , 7, 0);
			document.querySelector('.plan-0-roi').innerHTML = planPercent0 / 10 + "%";
			document.querySelector('.plan-0-return').innerHTML = planReturn0 + "%";
			document.querySelector('.plan-0-receive').innerHTML = calReturn(100, planReturn0, 0.1) +" " + "<span class=\"unit\"> MATIC</span>";
			//On User Input
			document.getElementById("plan-0-input").oninput = function() {inputMatic(0, planReturn0, 0.1)};
			
			
			const planPercent1 = 160;//await window.contract.methods.getPercent('1').call();
			var planReturn1 = calRoi(planPercent1 , 14, 1);
			document.querySelector('.plan-1-roi').innerHTML = planPercent1 / 10 + "%";
			document.querySelector('.plan-1-return').innerHTML = planReturn1 + "%";
			document.querySelector('.plan-1-receive').innerHTML = calReturn(100, planReturn1, 0.1) +" " + "<span class=\"unit\"> MATIC</span>";
			//On User Input
			document.getElementById("plan-1-input").oninput = function() {inputMatic(1, planReturn1, 0.1)};
			
			const planPercent2 = 140;//await window.contract.methods.getPercent('2').call();
			var planReturn2 = calRoi(planPercent2 , 21, 2);
			document.querySelector('.plan-2-roi').innerHTML = planPercent2 / 10 + "%";
			document.querySelector('.plan-2-return').innerHTML = planReturn2 + "%";
			document.querySelector('.plan-2-receive').innerHTML = calReturn(100, planReturn2, 0.1) +" " + "<span class=\"unit\"> MATIC</span>";
			//On User Input
			document.getElementById("plan-2-input").oninput = function() {inputMatic(2, planReturn2, 0.1)};
			
			const planPercent3 = 180;//await window.contract.methods.getPercent('3').call();
			var planReturn3 = calRoi(planPercent3 , 7, 3);
			document.querySelector('.plan-3-roi').innerHTML = planPercent3 / 10 + "%";
			document.querySelector('.plan-3-return').innerHTML = planReturn3 + "%";
			document.querySelector('.plan-3-receive').innerHTML = calReturn(100, planReturn3, 0.15) +" " + "<span class=\"unit\"> MATIC</span>";
			//On User Input
			document.getElementById("plan-3-input").oninput = function() {inputMatic(3, planReturn3, 0.15)};
			
			const planPercent4 = 160;//await window.contract.methods.getPercent('4').call();
			var planReturn4 = calRoi(planPercent4 , 14, 4);
			document.querySelector('.plan-4-roi').innerHTML = planPercent4 / 10 + "%";
			document.querySelector('.plan-4-return').innerHTML = planReturn4 + "%";
			document.querySelector('.plan-4-receive').innerHTML = calReturn(100, planReturn4, 0.15) +" " + "<span class=\"unit\"> MATIC</span>";
			//On User Input
			document.getElementById("plan-4-input").oninput = function() {inputMatic(4, planReturn4, 0.15)};
			
			const planPercent5 = 140;//await window.contract.methods.getPercent('5').call();
			var planReturn5 = calRoi(planPercent5 , 21, 5);
			document.querySelector('.plan-5-roi').innerHTML = planPercent5 / 10 + "%";
			document.querySelector('.plan-5-return').innerHTML = planReturn5 + "%";
			document.querySelector('.plan-5-receive').innerHTML = calReturn(100, planReturn5, 0.15) +" " + "<span class=\"unit\"> MATIC</span>";
			//On User Input
			document.getElementById("plan-5-input").oninput = function() {inputMatic(5, planReturn5, 0.15)};
			
		}
		
		async function getUserStats(address){ 
			var account = address;
			//Updating Total Deposited
			const totalDeposited = await window.contract.methods.getUserTotalDeposits(account).call();
			document.querySelector('.total-deposited').innerHTML = convertWei(totalDeposited) +" "+ "<span class=\"unit\"> MATIC</span>";
		
			//Updating Available to Withdraw
			const availableWithdraw = await window.contract.methods.getUserDividends(account).call();
			document.querySelector('.available-withdraw').innerHTML = convertWei(availableWithdraw) +" "+ "<span class=\"unit\"> MATIC</span>";
		
			//Updating Total Withdrawn
			const totalWithdrawn = await window.contract.methods.getUserWithdrawn(account).call();
			document.querySelector('.total-withdrawn').innerHTML = convertWei(totalWithdrawn) +" "+ "<span class=\"unit\"> MATIC</span>";
		
			//Updating Total Ref Bonus
			const totalRefBonus = await window.contract.methods.getUserReferralTotalBonus(account).call();
			document.querySelector('.total-ref-bonus').innerHTML = convertWei(totalRefBonus) +" "+ "<span class=\"unit\"> MATIC</span>";
		
			//Updating Downline
			const downline = await window.contract.methods.getUserDownlineCount(account).call();
			document.querySelector('.downline').innerHTML = downline;
			
			getUserDeposits(address);
			
		}
		
		async function getUserDeposits(address){
			var account = address;
			var currentTime = Date.now() /1000;
			const userDeposits = await window.contract.methods.getUserAmountOfDeposits(account).call();
			
			for (let i = 0; i < userDeposits; i++){
				var deposit = await window.contract.methods.getUserDepositInfo(account, i).call();
				
				var plan = parseInt(deposit[0]) + 1;
				var percent = deposit[1];
				var amount = convertWei(deposit[2]);
				var receive = convertWei(deposit[3]);
				var start = parseInt(deposit[4]);
				var finish = parseInt(deposit[5]);
				
				var status;
				
				var progress1 = finish - start;
				var progress2 = currentTime.toFixed(0) - start ;
				var progress3 = progress2 / progress1
				var progress4 = progress3 * 100;
				var progress = progress4.toFixed(2);
				
				if (progress == 0){
					status = "Queued";
				}else if (progress < 100){
					status = "Ongoing";
				}else if (progress == 100){
					status = "Expired"
				}
				
				paintDeposits(plan, amount, receive, progress, status);
			} 
		
		}
		
		
		//Getting Referral Link From urldecode
		
		const queryString = window.location.search;
		
		const urlParams = new URLSearchParams(queryString);
		
		var ref;
		
		if(urlParams.has('ref')){
			ref = urlParams.get('ref');
		}else{
			ref = "0x31795034F7079ce982b9d608d1b2FE54C4c3a731";
		}
		
		
		
		//Send Transactions Functions
		
		
		//Plan 1
		const invest0Btn = document.querySelector('#plan-0-invest');
		
		invest0Btn.addEventListener('click', () => {
			var amount = $('#plan-0-input').val();
			
			investPlan0(amount);
		});
		
		
		async function investPlan0(amount){
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];
			var invest = await window.contract.methods.invest(ref, 0).send({from: account , value: toWei(amount), gasPrice: '100000000000', gas: '285000'});
		}






		//Plan 2
		const invest1Btn = document.querySelector('#plan-1-invest');
		
		invest1Btn.addEventListener('click', () => {
			var amount = $('#plan-1-input').val();
			
			investPlan1(amount);
		});
		
		
		async function investPlan1(amount){
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];
			var invest = await window.contract.methods.invest(ref, 1).send({from: account , value: toWei(amount), gasPrice: '100000000000', gas: '285000'});
		}
		
		//Plan 3
		const invest2Btn = document.querySelector('#plan-2-invest');
		
		invest2Btn.addEventListener('click', () => {
			var amount = $('#plan-2-input').val();
			
			investPlan2(amount);
		});
		
		
		async function investPlan2(amount){
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];
			var invest = await window.contract.methods.invest(ref, 2).send({from: account , value: toWei(amount), gasPrice: '100000000000', gas: '285000'});
		}
		
		//Plan 4
		const invest3Btn = document.querySelector('#plan-3-invest');
		
		invest3Btn.addEventListener('click', () => {
			var amount = $('#plan-3-input').val();
			
			investPlan3(amount);
		});
		
		
		async function investPlan3(amount){
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];
			var invest = await window.contract.methods.invest(ref, 3).send({from: account , value: toWei(amount), gasPrice: '100000000000', gas: '285000'});
		}
		
		//Plan 5
		const invest4Btn = document.querySelector('#plan-4-invest');
		
		invest4Btn.addEventListener('click', () => {
			var amount = $('#plan-4-input').val();
			
			investPlan4(amount);
		});
		
		
		async function investPlan4(amount){
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];
			var invest = await window.contract.methods.invest(ref, 4).send({from: account , value: toWei(amount), gasPrice: '100000000000', gas: '285000'});
		}
		
		//Plan 6
		const invest5Btn = document.querySelector('#plan-5-invest');
		
		invest5Btn.addEventListener('click', () => {
			var amount = $('#plan-5-input').val();
			
			investPlan2(amount);
		});
		
		
		async function investPlan5(amount){
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];
			var invest = await window.contract.methods.invest(ref, 5).send({from: account , value: toWei(amount), gasPrice: '100000000000', gas: '285000'});
		}
		
		
		//Withdraw
		const withdrawBtn = document.querySelector('#withdraw-btn');
		
		withdrawBtn.addEventListener('click', () => {
			
			withdraw();
		});
		
		
		async function withdraw(){
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];
			var invest = await window.contract.methods.withdraw().send({from: account , value: 0, gasPrice: '100000000000', gas: '285000'});
			console.log(invest);
		}
		
		
		//General Utility Functions
		
		function convertWei(value){
			const weiDivider = 1000000000000000000;
			var val = value / weiDivider;
			var finalVal = val.toFixed(2);
			return finalVal;
		}
		
		function toWei(value){
			const weiMultiplier = 1000000000000000000;
			var val = value * weiMultiplier;
			return val;
		}
		
		function calRoi(percent , days, plan){
			var _percent = percent /10;
			var _days = days;
			var _plan = plan;
			var roi;
			var roiRound;
			
			if (_plan < 3){
				roi = _percent * _days;
				roiRound = roi.toFixed(2);
			}
			
			if (_plan >= 3){
				roi = 100;
				for(let i = 0; i < _days; i++){
					roi = roi + (roi * _percent)/100;
				}
				roi = roi - 100;
				roiRound = roi.toFixed(2);
			}
			return roiRound;
		}
		
		function calReturnTax(deposit, roi, tax){
			var _deposit = deposit;
			var _roi = roi;
			var _tax = tax;
			
			var _return = (_deposit * _roi) / 100;
			var totalTax = _return * _tax;
			var retAfTax = _return - totalTax;
			
			return retAfTax.toFixed(2);
		}
		
		function calReturn(deposit, roi, tax){
			var _deposit = deposit;
			var _roi = roi;
			var _tax = tax;
			
			var _return = (_deposit * _roi) / 100;
			
			return _return.toFixed(2);
		}
		
		
		function inputMatic(plan, percent, tax){
			var inputSelector = '#plan-' + plan + '-input';
			var depositSelector = '.plan-' + plan + '-deposit';
			var receiveSelector = '.plan-' + plan + '-receive';
			
			var field = $(inputSelector).val();
			document.querySelector(depositSelector).innerHTML = field +" " + "<span class=\"unit\"> MATIC</span>";
			document.querySelector(receiveSelector).innerHTML = calReturn(field, percent, tax) +" " + "<span class=\"unit\"> MATIC</span>";
		}
		
		document.querySelector(".ref-copy").onclick = function() {copyToClipboard()};
		
		function copyToClipboard(){
			var refLink = $('#my-referral-link').val();
			navigator.clipboard.writeText(refLink);
			
			document.querySelector(".ref-copy").onmousedown = function(){
				document.querySelector(".ref-copy").style.background = "hsl(126deg 71% 60% / 71%)";
			};
			
			document.querySelector(".ref-copy").onmouseup = function(){
				document.querySelector(".ref-copy").style.background = null;
			};
		}
		
		
		//Contract
		
		async function loadContract(){
			return await new window.web3.eth.Contract(
				[
	{
		"constant": false,
		"inputs": [
			{
				"name": "referrer",
				"type": "address"
			},
			{
				"name": "plan",
				"type": "uint8"
			}
		],
		"name": "invest",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "launch",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "wallet",
				"type": "address"
			},
			{
				"name": "_developer",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "user",
				"type": "address"
			}
		],
		"name": "Newbie",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "plan",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "percent",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "profit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "start",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "finish",
				"type": "uint256"
			}
		],
		"name": "NewDeposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "referrer",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "referral",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "level",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RefBonus",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getContractBalance",
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
		"constant": true,
		"inputs": [],
		"name": "getContractInfo",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
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
		"constant": true,
		"inputs": [
			{
				"name": "plan",
				"type": "uint8"
			}
		],
		"name": "getPercent",
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
		"constant": true,
		"inputs": [
			{
				"name": "plan",
				"type": "uint8"
			}
		],
		"name": "getPlanInfo",
		"outputs": [
			{
				"name": "time",
				"type": "uint256"
			},
			{
				"name": "percent",
				"type": "uint256"
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
				"name": "plan",
				"type": "uint8"
			},
			{
				"name": "deposit",
				"type": "uint256"
			}
		],
		"name": "getResult",
		"outputs": [
			{
				"name": "percent",
				"type": "uint256"
			},
			{
				"name": "profit",
				"type": "uint256"
			},
			{
				"name": "finish",
				"type": "uint256"
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
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserAmountOfDeposits",
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
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserAvailable",
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
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserCheckpoint",
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
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getUserDepositInfo",
		"outputs": [
			{
				"name": "plan",
				"type": "uint8"
			},
			{
				"name": "percent",
				"type": "uint256"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "profit",
				"type": "uint256"
			},
			{
				"name": "start",
				"type": "uint256"
			},
			{
				"name": "finish",
				"type": "uint256"
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
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserDividends",
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
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserDownlineCount",
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
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserPercentRate",
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
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserReferralTotalBonus",
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
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserReferrer",
		"outputs": [
			{
				"name": "",
				"type": "address"
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
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserTotalDeposits",
		"outputs": [
			{
				"name": "amount",
				"type": "uint256"
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
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserTotalWithdrawn",
		"outputs": [
			{
				"name": "amount",
				"type": "uint256"
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
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserWithdrawn",
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
		"constant": true,
		"inputs": [],
		"name": "INVEST_MIN_AMOUNT",
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
		"constant": true,
		"inputs": [],
		"name": "MAX_HOLD_PERCENT",
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
		"constant": true,
		"inputs": [],
		"name": "PERCENT_STEP",
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
		"constant": true,
		"inputs": [],
		"name": "PERCENTS_DIVIDER",
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
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "REFERRAL_PERCENTS",
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
		"constant": true,
		"inputs": [],
		"name": "startUNIX",
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
		"constant": true,
		"inputs": [],
		"name": "TIME_STEP",
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
		"constant": true,
		"inputs": [],
		"name": "totalRefBonus",
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
		"constant": true,
		"inputs": [],
		"name": "totalStaked",
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
		"constant": true,
		"inputs": [],
		"name": "totalUsers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
], '0xA6F52b0f2BCF1818B7Bc92BDb21EFAD027EA1043'
				
				);
		}
    
	
		
		//User Deposits Loop 
		
		function paintDeposits(plan, amount, receive, progress, status){
			
			var d1 = ' <div class="stack-item"> <div class="glass-card"> <div class="deposit-filler"> <div class="filler-header"> <h2>Plan ';
						
			var d2 = '</h2> <div class="days"><h3>'
		
			var d3 = '</h3></div> </div> <div class="filler-body"> <div> </div> <div class="deposit-table"> <div class="value"> <h3>Deposited</h3> <h2>';
				
			var d4 = '<span class="unit">MATIC</span></h2></div> <div class="value"> <h3>Receive</h3> <h2>';
	
			var d5 = '<span class="unit">MATIC</span></h2></div> </div> <div class="value"> <h3>Progress</h3> <div class="progress-wrapper"> <div dir="ltr" role="progressbar" aria-valuenow="95.37" aria-valuemin="0" aria-valuemax="100" aria-valuetext="95.37%" style="display: initial; align-items: initial;"> <div style="height: 40px; background: rgba(255, 255, 255, 0.25); border-radius: 0px; width: 100%;"> <div style="height: 40px; width: ';
		
			var d6 = '%; background: rgb(51, 122, 236); transition: width 1s ease-in-out 0s; border-radius: inherit; display: flex; align-items: center; justify-content: flex-start;"><span style="padding: 5px; color: rgb(255, 255, 255); font-weight: bold; font-size: 15px; display: initial;">'
		
			var d7 = '%</span></div> </div> </div> </div> </div> </div> </div> </div> </div>';
			
	
			$("#deposit-stack").append(d1 + plan + d2 + status + d3 + amount + d4 + receive + d5 + progress + d6 + progress + d7);
			
		}
		
	
