"use strict"

const userLogout = new LogoutButton;

userLogout.action = () => ApiConnector.logout( response => {
    if(response.success) {
        location.reload();
    }
});

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const currientRates = new RatesBoard();

function getRates () {
    ApiConnector.getStocks(response => {
        if(response.success) {
            currientRates.clearTable();
            currientRates.fillTable(response.data);
        }
    });
} 

getRates();

setInterval(getRates, 60000);


