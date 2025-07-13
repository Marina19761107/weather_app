export const aboutController = {
  index(request, response) {
    const viewData = {
      title: "Weather App",
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};
