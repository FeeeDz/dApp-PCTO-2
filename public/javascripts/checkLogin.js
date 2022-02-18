var loginBtn = document.getElementById('logo-container');

//function that redirect the user to a specific page according to his situation (if he's already logged or not)
function redirect(page){window.location.href = page; }

//functions that check if cookies are setted: in that case if they're setted go to logged.html otherwise
//stay in notlogged.html and do the login
function checkCookies(){if(document.cookie.indexOf('loggedin=true') !== -1) redirect('success.hmtl'); }

//function that handle the chain changed event
function handleChainChanged(){window.location.reload(); }

//function that set cookies when the user do the login
function setCookie(cookieName, value,  expireDate) {document.cookie = `${cookieName}=${value}; expires=${expireDate}`; }

let isMetaMask = Boolean(window.ethereum);
//if metamask is not installed alert the user and don't do anything

if(!isMetaMask) document.getElementById('install-metamask-btn').style.display = 'block';

else{
    document.getElementById('install-metamask-btn').style.display = 'none';
    checkCookies();

    loginBtn.addEventListener('click' , async () => {
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); //get the user's account by the connection
        //to metamask
        let account = accounts[0];

        var data = {
            loggedin: true,
            account: account
        }
    
        //set cookies
        let expiredate = new Date("Februari 10, 2099").toUTCString();
        setCookie("loggedin", data.loggedin, expiredate);
        setCookie("account", data.account, expiredate);
        redirect('success.html');

    });
}