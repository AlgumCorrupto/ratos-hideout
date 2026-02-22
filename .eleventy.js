
module.exports = function(eleventyConfig) {

   eleventyConfig.addCollection("blog", function (collectionApi) {
     return collectionApi
       .getAll()
       .filter(item =>
         item.inputPath.includes("/blogs/")
       )
       .sort((a, b) => b.date - a.date); // newest -> oldest
   });

     // Add a Nunjucks date filter
  eleventyConfig.addNunjucksFilter("date", (dateObj, format = "yyyy-LL-dd") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

   eleventyConfig.addCollection("tools", function (collectionApi) {
     return collectionApi
       .getAll()
       .filter(item =>
         item.inputPath.includes("/tools/")
       );
   });

   eleventyConfig.addCollection("toolsByGame", function (collectionApi) {
     const tools = collectionApi
       .getAll()
       .filter(item =>
         item.inputPath.split("/").includes("tools")
       );

     const gameMap = {};

     for (const tool of tools) {
       const parts = tool.inputPath.split("/");

       const toolsIndex = parts.indexOf("tools");
       const game = parts[toolsIndex + 1]; // folder after tools/

       if (!gameMap[game]) {
         gameMap[game] = [];
       }

       gameMap[game].push(tool);
     }

     return Object.fromEntries(
       Object.entries(gameMap).sort(([a], [b]) => a.localeCompare(b))
     );
   });

   eleventyConfig.addPassthroughCopy("public/");
   
   return {
     dir: {
       input: "src",
       output: "docs",
       includes: "_includes",
       data: "_data",
     },
    passthroughFileCopy: true,
   };
};

