"use strict";
// Targeting HTML elements here
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const mainContainer = document.querySelector(".main-container");
// Reusable function
async function myCustomFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network response was not ok - status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}
// Displaying the card UI
const showResultUi = (singleUser) => {
    const { avatar_url, login, id, name, url } = singleUser;
    mainContainer.insertAdjacentHTML("beforeend", `<div class="card">
    <img src=${avatar_url} alt= ${login} />
    <hr/>
    <div class = "card-footer">
    <img src=${avatar_url} alt= ${login} />
    <a href="${url}">Github<a/>
    <div/>
    </div>`);
};
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUi(singleUser);
            // console.log("login " + singleUser.login)
        }
    });
}
// Default function call
fetchUserData("https://api.github.com/users");
// Search Functionality
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserData = await myCustomFetcher(url, {});
        const matchingUsers = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        mainContainer.innerHTML = "";
        if (matchingUsers.length === 0) {
            mainContainer?.insertAdjacentHTML("beforeend", `<p class="empty-msg">No matching users found.</p>`);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUi(singleUser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
