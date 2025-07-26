import { accountsController } from "./accounts-controller.js";

export const weatherTopController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);

    const viewData = {
      title: "Weather Top",
      user: loggedInUser,
    };
    console.log("Weather Top page rendering");
    response.render("weather-top-view", viewData);
  },
};
