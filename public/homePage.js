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

const currentRates = new RatesBoard();

function getRates () {
    ApiConnector.getStocks(response => {
        if(response.success) {
            currentRates.clearTable();
            currentRates.fillTable(response.data);
        }
    });
} 

getRates();

setInterval(getRates, 60000);

const userMoneyManager = new MoneyManager();
userMoneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
        userMoneyManager.setMessage(false, "Пополнение баланса произошло успешно!"); 
    } else {
        userMoneyManager.setMessage(true, response.data);
    }
});

userMoneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
        userMoneyManager.setMessage(false, "Валюта конвертирована успешно!");
    } else {
        userMoneyManager.setMessage(true, response.data);
    }
});

userMoneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
        userMoneyManager.setMessage(false, "Валюта переведена успешно!");
    } else {
        userMoneyManager.setMessage(true, response.data);
    }
});

const userFavoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response.success) {
        userFavoritesWidget.clearTable();
        userFavoritesWidget.fillTable(response.data);
        userMoneyManager.updateUsersList(response.data);
    }
});

userFavoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
    if(response.success) {
        userFavoritesWidget.clearTable();
        userFavoritesWidget.fillTable(response.data);
        userMoneyManager.updateUsersList(response.data);
        userFavoritesWidget.setMessage(false, "Пользователь добавлен!"); 
    } else {
        userFavoritesWidget.setMessage(true, response.data);
    }
});

userFavoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => {
    if(response.success) {
        userFavoritesWidget.clearTable();
        userFavoritesWidget.fillTable(response.data);
        userMoneyManager.updateUsersList(response.data);
        userFavoritesWidget.setMessage(false, "Пользователь удален!"); 
    } else {
        userFavoritesWidget.setMessage(true, response.data);
    }
});
  
  

