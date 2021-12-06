require("babel-register")({
    presets: ["es2015", "react"]
});
const path = require("path");

const router = require("../COMPONENTS/Content/router.js").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
    return (
        new Sitemap(router)
            .build("http://localhost:3000/")
            .save(path.resolve('public', 'sitemap.xml'))
            // .save("./public/sitemap.xml")
    );
}

generateSitemap();