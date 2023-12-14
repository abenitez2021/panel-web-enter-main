export const getImage = (imageUrl) => {
    let tokenCookies = sessionStorage.getItem("jwt-wom");
    let token = ` ${JSON.parse(tokenCookies).token}`;

    console.log("token=> ", token);
    if (imageUrl && imageUrl != null && imageUrl.trim().length > 5 && imageUrl.trim().toLowerCase() != "null") {
        console.log("imageUrl=> ", imageUrl);

        return {
            uri: imageUrl, headers: {
                Authorization: "Bearer " + (token ? token : "crm")

            }
        };
    } else {
        return require("../assets/images/avatar.png");
    }

}