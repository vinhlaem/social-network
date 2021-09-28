import UrlAPI from "../UrlAPI";

const CheckLogin = (token) =>(
    fetch('https://zbioggg.com/api/checklogin',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'app;ication/json'
        },
        body: JSON.stringify({token})
    })
    .then(res => res.json())

);
export default CheckLogin;